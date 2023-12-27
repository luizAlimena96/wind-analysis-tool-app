"use client"
import Chart from 'chart.js/auto';
import React, { useState } from 'react';


function SelectTurbine({ turbines }: { turbines: any[] }) {
  const [selectedTurbine, setSelectedTurbine] = useState<any | null>(null)
  const [windSpeed, setWindSpeed] = useState<string>('')
  const [measureHeight, setMeasureHeight] = useState<string>('')
  const [airDensity, setAirDensity] = useState<string>('')
  const [roughnessHeight, setRoughnessHeight] = useState<string>('')
  const [weibullDistribution, setWeibullDistribution] = useState<string>('')
  const [eapRawValue, setEapRawValue] = useState<number | null>(null)
  const [factorCapRaw, setfactorCapRaw] = useState<number | null>(null)
  const [potMedRaw, setpotMedRaw] = useState<number | null>(null)


  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedTurbineId = event.target.value
    const turbine = turbines.find(t => t.id === selectedTurbineId)

    if (turbine) {
      setSelectedTurbine(turbine)
    }
  }

  const handleCalculate = () => {
    const velocities = Array.from({ length: 61 }, (_, index) => index / 2)
    const velocitiesKw = Array.from({ length: 30 }, (_, index) => index + 1)

    const entryVMedio = parseFloat(windSpeed.replace(',','.'))
    const entryHRu = parseFloat(roughnessHeight.replace(',','.'))
    const entryMed = parseFloat(measureHeight.replace(',','.'))
    const entryRo = parseFloat(airDensity.replace(',','.'))
    const entryWei = parseFloat(weibullDistribution.replace(',','.'))

    const maxOutput = selectedTurbine.max_output
    const hHub = selectedTurbine.axis_height
    const turbineVelocityStr = selectedTurbine.velocities
    const powerXVelocityStr = selectedTurbine.powers
    const powerRoTurbine = selectedTurbine.specific_mass_air
    const powerXVelocity = powerXVelocityStr.split(',').map((val: string) => parseFloat(val.trim()))
    const turbineVelocity = turbineVelocityStr.split(',').map((val: string) => parseFloat(val.trim()))
    const totalYearHours = 8760;

    const vHub = calculateVHub(entryVMedio, hHub, entryHRu, entryMed);
    const factorWei = entryVMedio / 0.9;
    const factorWeiHHub = vHub / 0.9;

    const freqResults = velocities.map((vH) => frequency(vH, calculateVel(vH, factorWei, entryWei), factorWei, entryWei));
    const freqResultsHHub = velocities.map((vHub) => frequencyHHUB(vHub, calculateVelHHub(vHub, factorWeiHHub, entryWei), factorWeiHHub, entryWei));
    const freqResultsHHubKw = velocitiesKw.map((vHub) => frequencyHHUB(vHub, calculateVelHHub(vHub, factorWeiHHub, entryWei), factorWeiHHub, entryWei));

    const powerCurveResults = calculateRoLocal(maxOutput, powerRoTurbine, entryRo, powerXVelocity);
    const futureKwPrevision = futureKW(totalYearHours, freqResultsHHubKw, powerCurveResults);
    const eapRawValue = eapRaw(futureKwPrevision);

    const factorCapRaw = (eapRawValue / totalYearHours / maxOutput) * 100;
    const potMedRaw = eapRawValue / totalYearHours;

      setEapRawValue(eapRawValue)
      setfactorCapRaw(factorCapRaw)
      setpotMedRaw(potMedRaw)
      initCharts(velocities, freqResults, freqResultsHHub, turbineVelocity, powerCurveResults, futureKwPrevision )
  }


  const initCharts = (velocities: number[], freqResults: number[], freqResultsHHub: number[], turbineVelocity: any, powerCurveResults: any[], futureKwPrevision: any ) => {
    Chart.getChart('graph_1')?.destroy();
    Chart.getChart('graph_2')?.destroy();
    Chart.getChart('graph_3')?.destroy();
    // Chart 1
        var ctx1 = document.getElementById('graph_1') as HTMLCanvasElement;
        var chart1 = new Chart(ctx1, {
          type: 'line',
          data: {
            labels: velocities,
            datasets: [
              { label: 'Measure Height', data: freqResults },
              { label: 'Turbine Axis Height', data: freqResultsHHub },
            ],
          },
          options: {
            scales: {
              x: { type: 'linear', position: 'bottom' },
              y: { type: 'linear', position: 'left' },
            },
          },
        });

        // Chart 2
        var ctx2 = document.getElementById('graph_2') as HTMLCanvasElement;
        var chart2 = new Chart(ctx2, {
          type: 'line',
          data: {
            labels: turbineVelocity,
            datasets: [{ label: 'Power Curve', data: powerCurveResults }],
          },
          options: {
            scales: {
              x: { type: 'linear', position: 'bottom' },
              y: { type: 'linear', position: 'left', min: Math.min(...powerCurveResults), max: Math.max(...powerCurveResults) },
            },
          },
        });

        // Chart 3
        var ctx3 = document.getElementById('graph_3') as HTMLCanvasElement;
        var chart3 = new Chart(ctx3, {
          type: 'line',
          data: {
            labels: turbineVelocity,
            datasets: [{ label: 'Annual Predicted Energy', data: futureKwPrevision }],
          },
          options: {
            scales: {
              x: { type: 'linear', position: 'bottom' },
              y: { type: 'linear', position: 'left', min: Math.min(...futureKwPrevision), max: Math.max(...futureKwPrevision) },
            },
          },
        })
  }

  function calculateVel(vH: number, factorWei: number, wei: number) {
    return Math.pow(vH / factorWei, wei);
  }

  function calculateVelHHub(vHub: number, factorWeiHHUB: number, wei: number) {
    return Math.pow(vHub / factorWeiHHUB, wei);
  }

  function calculateVHub(entryVMedio: number, hHub: number, entryHRu: number, entryMed: number) {
    return entryVMedio * (Math.log(hHub / entryHRu) / Math.log(entryMed / entryHRu));
  }

  function frequency(vH: number, calculateVel: number, factorWei: number, wei: number) {
    return (wei / factorWei) * Math.pow(vH / factorWei, wei - 1) * Math.exp(-calculateVel);
  }

  function frequencyHHUB(vHub: number, calculateVelHHUB: number, factorWeiHHUB: number, wei: number) {
    return (wei / factorWeiHHUB) * Math.pow(vHub / factorWeiHHUB, wei - 1) * Math.exp(-calculateVelHHUB);
  }

  function futureKW(totalYearHours: number, freqResultsHHUBKW: any, powerCurveResults: any) {
    const freqResultsHHUBArray = freqResultsHHUBKW;
    const powerCurveResultsArray = powerCurveResults;
    return freqResultsHHUBArray.map((freq: number, index: string | number) => freq * powerCurveResultsArray[index] * totalYearHours);
  }

  function calculateRoLocal(maxOutput: number, powerRoTurbine: number, entryRo: number, powerXVelocity: any[]) {
    return powerXVelocity.map((val) => (val < maxOutput) ? (val * entryRo) / powerRoTurbine : val);
  }

  function eapRaw(futureKWPrevision: any[]) {
    return futureKWPrevision.reduce((sum, i) => sum + i, 0);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleCalculate()
  }


  return (
    <div className="flex w-full">
      <div className='w-70'>
      <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
        <form onSubmit={handleSubmit}>
        <h1 className='text-center'>Inputs</h1>
        <div>
          <select className="select select-bordered w-full max-w-xs" onChange={handleSelect}>
            <option defaultValue="Select a wind turbine">
              Select a wind turbine
            </option>
            {turbines.map((turbine) => (
              <option key={turbine.id} value={turbine.id}>
                {turbine.name}
              </option>
            ))}
          </select>

          <div className="mt-4">
    <input
      type="text"
      placeholder="Wind speed"
      value={windSpeed}
      onChange={(e) => setWindSpeed(e.target.value)}
      className="input input-bordered w-full max-w-xs"
    />
  </div>

  <div className="mt-4">
    <input
      type="text"
      placeholder="Measure height"
      value={measureHeight}
      onChange={(e) => setMeasureHeight(e.target.value)}
      className="input input-bordered w-full max-w-xs"
    />
  </div>

  <div className="mt-4">
    <input
      type="text"
      placeholder="Air density"
      value={airDensity}
      onChange={(e) => setAirDensity(e.target.value)}
      className="input input-bordered w-full max-w-xs"
    />
  </div>

  <div className="mt-4">
    <input
      type="text"
      placeholder="Roughness height"
      value={roughnessHeight}
      onChange={(e) => setRoughnessHeight(e.target.value)}
      className="input input-bordered w-full max-w-xs"
    />
  </div>

  <div className="mt-4">
    <input
      type="text"
      placeholder="Weibull distribution"
      value={weibullDistribution}
      onChange={(e) => setWeibullDistribution(e.target.value)}
      className="input input-bordered w-full max-w-xs"
    />
  </div>

        <div className="flex justify-center">
            <button className="mt-4 btn btn-primary" type='submit'>Calculate</button>
        </div>

        </div>
        </form>
      </div>
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
        <h1>Results</h1>
        <div className="flex w-full">
          <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">EAP: {eapRawValue} kW</div>
          <div className="divider divider-horizontal"></div>
          <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">FC: {factorCapRaw} %</div>
          <div className="divider divider-horizontal"></div>
          <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">PMA: {potMedRaw} kW</div>
        </div>
        <div className="flex flex-col w-full">
          <div className="grid card bg-base-300 rounded-box place-items-center">
            <canvas id="graph_1"></canvas>
            </div>
          <div className="divider"></div>
          <div className="grid card bg-base-300 rounded-box place-items-center mt-5">
            <canvas id="graph_2"></canvas>
          </div>
          <div className="divider"></div>
          <div className="grid card bg-base-300 rounded-box place-items-center">
            <canvas id="graph_3"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectTurbine;
