import type DataDS from '@/api/domain/ds/DataDS'
import type {
  EventType,
  CreateEventType,
  UpdateEventType,
} from '@/types/event'

const EVENTS_KEY = 'events'

const sleep = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

class LocalStorageDS implements DataDS {
  async getEventById(id: string): Promise<EventType> {
    try {
      await sleep()

      const raw = localStorage.getItem(EVENTS_KEY) ?? '[]'

      const events = JSON.parse(raw) as EventType[]

      const event = events.find((e) => e.id === id)

      if (!event) {
        throw new Error('Event not found')
      }

      // Transform date string to Date object if needed
      return {
        ...event,
        date: new Date(event.date),
      }
    } catch (error) {
      console.error(error)
      throw new Error('Error loading event')
    }
  }

  async saveEvent(event: CreateEventType): Promise<boolean> {
    try {
      await sleep()

      const raw = localStorage.getItem(EVENTS_KEY) ?? '[]'
      const events = JSON.parse(raw) as EventType[]

      const newEvent: EventType = {
        ...event,
        id: crypto.randomUUID(),
      }

      events.push(newEvent)

      localStorage.setItem(EVENTS_KEY, JSON.stringify(events))
      return true
    } catch (error) {
      console.error(error)
      throw new Error('Error saving event')
    }
  }

  async updateEvent(event: UpdateEventType): Promise<boolean> {
    try {
      await sleep()

      const raw = localStorage.getItem(EVENTS_KEY) ?? '[]'
      const events = JSON.parse(raw) as EventType[]

      const index = events.findIndex(e => e.id === event.id)

      if (index === -1) {
        throw new Error('Event not found')
      }

      events[index] = {
        ...events[index],
        ...event,
      }

      localStorage.setItem(EVENTS_KEY, JSON.stringify(events))
      return true
    } catch (error) {
      console.error(error)
      throw new Error('Error updating event')
    }
  }

  async deleteEvent(id: string): Promise<boolean> {
    try {
      await sleep()

      const raw = localStorage.getItem(EVENTS_KEY) ?? '[]'
      const events = JSON.parse(raw) as EventType[]

      const index = events.findIndex(e => e.id === id)

      if (index === -1) {
        throw new Error('Event not found')
      }

      events.splice(index, 1)
      localStorage.setItem(EVENTS_KEY, JSON.stringify(events))
      return true
    } catch (error) {
      console.error(error)
      throw new Error('Error deleting event')
    }
  }
}

export default LocalStorageDS