import type { EventType } from "@/types/event"
import Event from "./Event"
import dayjs from "dayjs"

type Props = {
  dateKey: string
  events: EventType[]
  previousBalance: number
}

const MonthCard = ({ dateKey, events, previousBalance }: Props) => {
  const date = dayjs(`${dateKey}-01`)
  const monthYear = date.format("MMMM YYYY")

  const income = events
    .filter((e) => e.type === "income")
    .reduce((acc, e) => acc + e.amount, 0)

  const expense = events
    .filter((e) => e.type === "expense")
    .reduce((acc, e) => acc + e.amount, 0)

  const monthBalance = income - expense
  const globalBalance = previousBalance + monthBalance

  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white min-w-70 h-125 mx-4 flex flex-col">
      <div>
        <div className="bg-white text-gray p-4">
          <h2 className="text-xl font-medium">{monthYear}</h2>
        </div>

        <div className="h-80 overflow-y-auto bg-white p-4 ">
          {events.map((event) => (
            <Event key={event.id} data={event} />
          ))}

          </div>
        </div>
        <div className="mt-auto bg-white flex flex-col px-4 pb-4">

          <div className="flex flex-row justify-between">
            <p className="font-medium text-gray-700">Income:</p> 
            <p className="text-gray-700">${income.toFixed(2)}</p>
          </div>

          <div className="flex flex-row justify-between">
            <p className="font-medium text-gray-700">Expense:</p>
            <p className="text-gray-700">${expense.toFixed(2)}</p>
          </div>

          <div className="flex flex-row justify-between">
            <p className="font-medium text-gray-700">Monthly:</p>
            <p className="text-gray-700">${monthBalance.toFixed(2)}</p>
          </div>

          <div className="flex flex-row justify-between">
            <p className="font-medium text-gray-700">Global:</p>
            <p className="text-gray-700">${globalBalance.toFixed(2)}</p>
          </div>

      </div>
    </div>
  )
}

export default MonthCard