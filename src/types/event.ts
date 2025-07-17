import { z } from 'zod'

export const EventSchema = z.object({
    id: z.uuid(),
    name: z.string().max(20),
    description: z.string().max(100).optional(),
    amount: z.number().min(0),
    date: z.date(),
    type: z.enum(['income', 'expense']),
})

export type EventType = z.infer<typeof EventSchema>

export const CreateEventSchema = EventSchema.omit({
    id: true,
})

export type CreateEventType = z.infer<typeof CreateEventSchema>

export const UpdateEventSchema = EventSchema.partial().extend({
    id: z.uuid(),
})

export type UpdateEventType = z.infer<typeof UpdateEventSchema>