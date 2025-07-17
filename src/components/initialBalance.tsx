import { NumberInput } from '@mantine/core';
import { Link } from '@tanstack/react-router';


export function InitialBalance() {
  return (
    <>
        <div className='flex mb-4 items-end justify-between'>
            <div className='flex items-end'>
                <div className='w-50'>
                    <NumberInput
                    label="Dinero Inicial"
                    defaultValue={0}
                    min={0}
                    />
                </div>
                <div className='py-1.25 px-3 ml-4 bg-violet-500 text-white rounded-md shadow-lg hover:bg-violet-600'>
                    <button>Calculate</button>
                </div>
            </div>
            <div className='py-1.25 px-3 ml-4 bg-violet-500 text-white rounded-md shadow-lg hover:bg-violet-600'>
                <Link to='/'>Add Event</Link>
            </div>
            
        </div>
    </>
  );
}

