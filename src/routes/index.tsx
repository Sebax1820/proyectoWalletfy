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
import ChatInterface from '@/components/ChatInterface'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [initialBalance, setInitialBalance] = useState(0)
  const [showChat, setShowChat] = useState(false)

  const { data: events = [], isPending, error } = useQuery({
    queryKey: ['events'],
    queryFn: () => DataRepo.getAllEvents(),
    refetchOnWindowFocus: true,
  })

  if (isPending) {
    return <div className="p-4">Loading events...</div>
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading events: {error.message}
      </div>
    )
  }

  const eventsGrouped: Record<string, Array<EventType>> = {}

  events.forEach((event) => {
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
    <div className="p-6 h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <InitialBalance value={initialBalance} onChange={setInitialBalance} />

        <div className="flex gap-2">
          <AddEvent />
          <button
            onClick={() => setShowChat((prev) => !prev)}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition"
          >
            {showChat ? 'Close Chat' : 'Open Chat'}
          </button>
        </div>
      </div>

      {/* Resumen */}
      <p className="text-xl font-semibold pb-4">
        You have {totalEvents} {totalEvents === 1 ? 'event' : 'events'} in{' '}
        {totalMonths} {totalMonths === 1 ? 'month' : 'months'}
      </p>

      {/* Layout principal */}
      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Tarjetas con scroll */}
        <div className="flex-1 min-w-0 overflow-y-auto pr-2">
          <div className="flex flex-wrap gap-6">
            {sortedKeys.map((key) => {
              const monthEvents = eventsGrouped[key]

              const income = monthEvents
                .filter((e) => e.type === 'income')
                .reduce((acc, e) => acc + e.amount, 0)

              const expense = monthEvents
                .filter((e) => e.type === 'expense')
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

        {/* Chat fijo a la derecha con scroll propio */}
        {showChat && (
          <div className=" flex-shrink-0 h-full overflow-y-auto">
            <ChatInterface />
          </div>
        )}
      </div>
    </div>
  )
}