import SelectTurbine from '../components/SelectTurbine';
import { getXataClient } from '@/xata';


export async function getData() {
  try {
    const xataClient = getXataClient();
    const turbinesData = await xataClient.db.turbine_data.getMany();
    console.log('turbinesData', turbinesData)

    const turbines = turbinesData.map((turbine) => ({
      id: turbine.id,
      name: turbine.name,
      axis_height: turbine.axis_height,
      velocities: turbine.velocities,
      powers: turbine.powers,
      specific_mass_air: turbine.specific_mass_air,
      max_output: turbine.max_output,
    }));
    console.log('turbines', turbines)

    return turbines;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}

export default async function Page() {
  const turbines = await getData();

  return (
      <SelectTurbine turbines={turbines} />
  );
}