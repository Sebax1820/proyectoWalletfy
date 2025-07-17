import { createFileRoute } from '@tanstack/react-router'
import { mockEvents } from '@/mock/events'
import MonthCard from '@/components/MonthCard'
import dayjs from 'dayjs'
import { InitialBalance}  from '@/components/initialBalance'

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  const initialBalance = 0

  // Agrupar eventos por mes
  const eventsGrouped: Record<string, typeof mockEvents> = {}

  mockEvents.forEach(event => {
    const key = dayjs(event.date).format('YYYY-MM')
    if (!eventsGrouped[key]) {
      eventsGrouped[key] = []
    }
    eventsGrouped[key].push(event)
  })

  const sortedKeys = Object.keys(eventsGrouped).sort()
  let previousGlobalBalance = initialBalance

  return (
    <div className=' p-6 '>
      <InitialBalance></InitialBalance>
     
      <div className='space-y-6 flex flex-wrap'>
        {sortedKeys.map(key => {
          const monthCard = (
            <MonthCard
              key={key}
              dateKey={key}
              events={eventsGrouped[key]}
              previousBalance={previousGlobalBalance}
            />
          )

          // Actualizar balance para el siguiente mes
          const income = eventsGrouped[key]
            .filter(e => e.type === 'income')
            .reduce((acc, e) => acc + e.amount, 0)
          const expense = eventsGrouped[key]
            .filter(e => e.type === 'expense')
            .reduce((acc, e) => acc + e.amount, 0)
          const balanceMes = income - expense
          previousGlobalBalance += balanceMes

          return monthCard
        })}
      </div>
    </div>
  )
}
