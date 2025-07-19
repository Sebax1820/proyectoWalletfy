import type { EventType } from '@/types/event'
import { Tooltip } from '@mantine/core'
import { useNavigate } from '@tanstack/react-router'
import dayjs from 'dayjs'

type EventProps = {
  data: EventType
}

const Event = ({ data }: EventProps) => {

  const navigate = useNavigate()

  const { id, name, amount, date, type, description } = data

  const formattedDate = dayjs(date).format('DD/MM/YYYY')

  const handleClick = () => {

    if(id) {
      const confirmed = window.confirm(`Do you want to edit the event ${name}?`)
      if (confirmed) {
        navigate({ to: '/form/$id', params: { id } })
      }
    } else if (!id) {
      alert('No se encontró el evento.')
      return
    }

  }
    
    

  return (
    <Tooltip label={description ?? ''} disabled={!description}>
      <div 
      onClick={handleClick}
      className="flex justify-between items-center py-2 border-b border-gray-200 mb-3 hover:bg-gray-50 p-1 rounded-sm cursor-pointer">
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