import * as React from 'react'


type SelectProps = React.ComponentProps<'select'> & {
  label?: string
  options: Array<{
    value: string
    label: string
  }>
}

function Select({ className, options, label, ...props }: SelectProps) {
  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <select
        data-slot="select"
        className={
          'border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500'
        }
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export { Select }