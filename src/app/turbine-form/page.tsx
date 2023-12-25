'use client';
import Link from 'next/link';
import React, { useRef } from 'react';

export default function TurbineForm({ createTurbine }: { createTurbine: (FormData: FormData) => void }) {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      className='w-full flex gap-x-2 items-center'
      action={(formData) => {
        createTurbine(formData);
        ref.current?.reset();
      }}
      ref={ref}
    >
      <div className='grow'>
      <label>Turbine Form</label>
        <div className="mt-4">
          <input
            name='name'
            id='name'
            type='text'
            placeholder='Name'
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="mt-4">
          <input
            name='axis_height'
            id='axis_height'
            type='text'
            placeholder='Axis height'
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="mt-4">
          <input
            name='velocities'
            id='velocities'
            type='text'
            placeholder='Velocities'
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="mt-4">
          <input
            name='powers'
            id='powers'
            type='text'
            placeholder='Powers'
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="mt-4">
          <input
            name='specific_mass_air'
            id='specific_mass_air'
            type='text'
            placeholder='Specific mass of Air'
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="mt-4">
          <input
            name='max_output'
            id='max_output'
            type='text'
            placeholder='Max output'
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <button className="mt-4 btn btn-primary">Submit</button>
        <Link href="/turbines">
            <button className="ml-4 btn btn-primary">Go back</button>
      </Link>
      </div>
    </form>
  );
}
