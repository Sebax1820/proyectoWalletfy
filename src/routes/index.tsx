import { createFileRoute } from '@tanstack/react-router'
import '../App.css'
import { useQuery } from '@tanstack/react-query'
import DataRepo from '@/api/datasource'
import type { EventType } from '@/types/event'
import MonthCard from '@/components/MonthCard'
import InitialBalance from '@/components/initialBalance'
import AddEvent from '@/components/addEvent'
import dayjs from 'dayjs'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [initialBalance, setInitialBalance] = useState(0)

  const { data: events = [], isPending, error } = useQuery({
    queryKey: ['events'],
    queryFn: () => DataRepo.getAllEvents(),
    refetchOnWindowFocus: true,
  })

  if (isPending) {
    return <div className="p-4">Loading events...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading events: {error.message}</div>
  }

  // Agrupar eventos por mes
  const eventsGrouped: Record<string, Array<EventType>> = {}

  events.forEach(event => {
    const key = dayjs(event.date).format('YYYY-MM')
    if (!eventsGrouped[key]) {
      eventsGrouped[key] = []
    }
    eventsGrouped[key].push(event)
  })

  const sortedKeys = Object.keys(eventsGrouped).sort()
  let previousGlobalBalance = initialBalance

  const totalEvents = events.length
  const totalMonths = sortedKeys.length

  return (
    <div className="p-15 ">
      <div className="flex justify-between items-center">
        <InitialBalance 
        value={initialBalance} 
        onChange={setInitialBalance} 
        />

        <AddEvent />
      </div>

      <p className='text-xl font-semibold pb-4'>
        You have {totalEvents} {totalEvents === 1 ? 'event' : 'events'} in {totalMonths} {totalMonths === 1 ? 'month' : 'months'}
      </p>

      <div className="space-y-6 flex flex-wrap">
        {sortedKeys.map(key => {
          const monthEvents = eventsGrouped[key]

          const income = monthEvents
            .filter(e => e.type === 'income')
            .reduce((acc, e) => acc + e.amount, 0)

          const expense = monthEvents
            .filter(e => e.type === 'expense')
            .reduce((acc, e) => acc + e.amount, 0)

          const monthBalance = income - expense

          const card = (
            <MonthCard
              key={key}
              dateKey={key}
              events={monthEvents}
              previousBalance={previousGlobalBalance}
            />
          )

          previousGlobalBalance += monthBalance

          return card
        })}
      </div>
    </div>
  )
}


// import { createFileRoute } from '@tanstack/react-router'
// import { useQuery } from '@tanstack/react-query'
// import DataRepo from '@/api/datasource'
// import type { CreateEventType } from '@/types/event'
// import MonthCard from '@/components/MonthCard'
// import InitialBalance from '@/components/initialBalance'
// import AddEvent from '@/components/addEvent'
// import dayjs from 'dayjs'

// export const Route = createFileRoute('/')({
//   component: RouteComponent,
// })

// function RouteComponent() {
//   const initialBalance = 0

//   const { data: events = [], isPending, error } = useQuery({
//     queryKey: ['events'],
//     queryFn: () => DataRepo.getAllEvents(),
//     refetchOnWindowFocus: true,
//   })

//   if (isPending) {
//     return <div className="p-4">Loading events...</div>
//   }

//   if (error) {
//     return <div className="p-4 text-red-500">Error loading events: {error.message}</div>
//   }

//   // Agrupar eventos por mes
//   const eventsGrouped: Record<string, CreateEventType[]> = {}

//   events.forEach(event => {
//     const key = dayjs(event.date).format('YYYY-MM')
//     if (!eventsGrouped[key]) {
//       eventsGrouped[key] = []
//     }
//     eventsGrouped[key].push(event)
//   })

//   const sortedKeys = Object.keys(eventsGrouped).sort()
//   let previousGlobalBalance = initialBalance

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center">
//         <InitialBalance />
//         <AddEvent />
//       </div>

//       <div className="space-y-6 flex flex-wrap">
//         {sortedKeys.map(key => {
//           const monthEvents = eventsGrouped[key]

//           const income = monthEvents
//             .filter(e => e.type === 'income')
//             .reduce((acc, e) => acc + e.amount, 0)

//           const expense = monthEvents
//             .filter(e => e.type === 'expense')
//             .reduce((acc, e) => acc + e.amount, 0)

//           const monthBalance = income - expense

//           const card = (
//             <MonthCard
//               key={key}
//               dateKey={key}
//               events={monthEvents}
//               previousBalance={previousGlobalBalance}
//             />
//           )

//           previousGlobalBalance += monthBalance

//           return card
//         })}
//       </div>
//     </div>
//   )
// }