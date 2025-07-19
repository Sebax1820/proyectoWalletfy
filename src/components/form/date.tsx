
import dayjs from 'dayjs'

type Props = {
  value: Date
  onChange: (val: Date) => void
  label?: string
  placeholder?: string
  
}

export function DateInput({ value, onChange, label = "Date", placeholder = "Select a date" }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="date"
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        placeholder={placeholder}
        value={dayjs(value).format('YYYY-MM-DD')}
        onChange={(e) => {
          const selectedDate = new Date(e.target.value)
          if (!isNaN(selectedDate.getTime())) {
            onChange(selectedDate)
          }
        }}
      />
    </div>
  )
}