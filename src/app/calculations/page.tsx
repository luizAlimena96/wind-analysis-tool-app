import React from 'react';
import { getXataClient } from '@/xata';

export default async function page() {
  const xataClient = getXataClient();
  const turbines = await xataClient.db.turbine_data.getMany();

  return (
    <div className="flex w-full">
      <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
        <h1>Inputs</h1>
        <div>
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>Select a wind turbine</option>
            {turbines.map((turbine) => (
              <option key={turbine.id}>{turbine.name}</option>
            ))}
          </select>

          <div className="mt-4">
            <input type="text" placeholder="Wind speed" className="input input-bordered w-full max-w-xs" />
          </div>

          <div className="mt-4">
            <input type="text" placeholder="Measure height" className="input input-bordered w-full max-w-xs" />
          </div>

          <div className="mt-4">
            <input type="text" placeholder="Air density" className="input input-bordered w-full max-w-xs" />
          </div>

          <div className="mt-4">
            <input type="text" placeholder="Roughness height" className="input input-bordered w-full max-w-xs" />
          </div>

          <div className="mt-4">
            <input type="text" placeholder="Weibull distribution" className="input input-bordered w-full max-w-xs" />
          </div>

          <button className="mt-4 btn btn-primary">Calculate</button>
        </div>
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
        <h1>Results</h1>


      </div>
    </div>
    
  );
}
