import Link from 'next/link'
import React from 'react'

export default function Cards() {
  return (
    <div className="flex w-full">
        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
            <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://images.unsplash.com/photo-1503427315916-2ba435dee667?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="WindTurbine" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Wind Analysis Tool</h2>
                        <p>Calculations</p>
                        <div className="card-actions justify-end">
                            <Link href="/calculations">
                                <button className="btn btn-primary">Calculate</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        
        <div className="divider divider-horizontal"></div>
        
        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
            <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://images.unsplash.com/photo-1622103146053-f37729bc9f62?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Turbine" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Turbine DataBase</h2>
                        <p>Wind Turbine Database used to make the calculations of the wind</p>
                        <div className="card-actions justify-end">
                            <Link href="/turbines">
                                <button className="btn btn-primary">Check</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
