import type { EventType } from '@/types/event'
import { Tooltip } from '@mantine/core'
import dayjs from 'dayjs'

type EventProps = {
  data: EventType
}

const Event = ({ data }: EventProps) => {
  const { name, amount, date, type, description } = data

  const formattedDate = dayjs(date).format('DD/MM/YYYY')

  return (
    <Tooltip label={description ?? ''} disabled={!description}>
      <div className="flex justify-between items-center py-2 border-b border-gray-200 mb-3 hover:bg-gray-50 p-1 rounded-sm ">
        <div>
          <p className="text-gray-700">{name}</p>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
        <p className={`text-sm ${type === 'income' ? 'text-green-500' : 'text-red-400'}`}>
          ${amount}
        </p>
      </div>
    </Tooltip>
  )
}

export default Event