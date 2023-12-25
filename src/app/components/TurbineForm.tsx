'use client';
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
            type='float'
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
            type='float'
            placeholder='Specific mass of Air'
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="mt-4">
          <input
            name='max_output'
            id='max_output'
            type='float'
            placeholder='Max output'
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <button className="mb-10 mt-4 btn btn-primary">Create a new turbine</button>
      </div>
    </form>
  );
}
