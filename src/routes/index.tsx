import { createFileRoute } from '@tanstack/react-router'
import '../App.css'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <main className="p-4">
      <div className="flex flex-row gap-2">
        
      </div>
    </main>
  )
}
