import SelectTurbine from '../components/SelectTurbine';
import { getXataClient } from '@/xata';


export async function getData() {
  const xataClient = getXataClient();
  const turbines = await xataClient.db.turbine_data.getMany();

  return (
    turbines
  )
}

export default async function Page() {
  const turbines = await getData();

  return (
      <SelectTurbine turbines={turbines} />
  );
}