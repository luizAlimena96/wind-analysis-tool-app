import { getXataClient } from '@/xata'
import { revalidatePath } from 'next/cache'
import React from 'react'
import { z } from 'zod'
import TurbineForm from '../components/TurbineForm'

const schema = z.object({
    name: z.string().min(1),
    axis_height: z.number(),
    velocities: z.string().min(1),
    powers: z.string().min(1),
    specific_mass_air: z.number(),
    max_output: z.number(),
})

export default async function page() {
    const xataClient = getXataClient()
    const turbines = await xataClient.db.turbine_data.getMany()

    async function createTurbine(formData: FormData) {
        'use server'
        const parsedForm = schema.parse({
            name: formData.get("name"),
            axis_height: Number(formData.get("axis_height")),
            velocities: formData.get("velocities"),
            powers: formData.get("powers"),
            specific_mass_air: Number(formData.get("specific_mass_air")),
            max_output: Number(formData.get("max_output")),
        })
        const xataClient = getXataClient()
        await xataClient.db.turbine_data.create(parsedForm)
        revalidatePath('/turbines')
    }


  return (
    <div>
        <div className="collapse bg-base-200">
            <input type="checkbox" /> 
            <div className="collapse-title text-xl font-medium">
                Show the Turbine Form
            </div>
            <div className="collapse-content"> 
                <TurbineForm createTurbine={createTurbine} />
            </div>
        </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Axis Hight</th>
                        <th>Array of velocities</th>
                        <th>Array of Power</th>
                        <th>Specif mass of air</th>
                        <th>Max output</th>
                    </tr>
                    </thead>
                    <tbody>
                        {turbines.map((turbine) => (
                            <tr key={turbine.id}>
                                <th>{turbine.name}</th>
                                <th>{turbine.axis_height}</th>
                                <th>{turbine.velocities}</th>
                                <th>{turbine.powers}</th>
                                <th>{turbine.specific_mass_air}</th>
                                <th>{turbine.max_output}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    </div>
  )
}
