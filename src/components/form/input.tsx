
import * as React from 'react'



type InputProps = React.ComponentProps<'input'> & {
  label?: string
  placeholder?: string
}

function Input({ className, type, label, ...props }: InputProps) {
  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        data-slot="input"
        className={
          'border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500'
        }
        {...props}
      />
    </div>
  )
}

export { Input }