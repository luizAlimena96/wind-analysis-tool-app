import { getXataClient } from '@/xata'
import Link from 'next/link'
import React from 'react'

export default async function page() {
    const xataClient = getXataClient()
    const turbines = await xataClient.db.turbine_data.getMany()
  return (
    <div>
        <Link href="/turbine-form">
            <button className="btn btn-primary">Create a new Turbine</button>
        </Link>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Axis Hight</th>
                        <th>Array of velocities</th>
                        <th>Array of Power</th>
                        <th>Specif mass of air</th>
                        <th>Specif mass of air</th>
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
