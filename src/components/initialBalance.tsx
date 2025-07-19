import { NumberInput } from '@mantine/core';
import { useState } from 'react';

type Props = {
    value: number
    onChange: (value: number) => void
}

export default function InitialBalance({value, onChange}: Props) {

    const [initialValue, setInitialValue] = useState(value)

    const handleCalculate = () => {
    onChange(initialValue)
  }


  return (
    <>
        <div className='flex mb-4 items-end justify-between'>
            <div className='flex items-end'>
                <div className='w-50'>
                    <NumberInput
                    label="Dinero Inicial"
                    value={initialValue}
                    onChange={(val) => setInitialValue(typeof val === 'number' ? val : Number(val) || 0)}
                    min={0}
                    />
                </div>
                <div 
                className='py-1.25 px-3 ml-4 bg-violet-500 text-white rounded-md shadow-lg hover:bg-violet-600 cursor-pointer'
                onClick={handleCalculate}>
                    <button className='cursor-pointer'>Calculate</button>
                </div>
            </div>
            
        </div>
    </>
  );
}

