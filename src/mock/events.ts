import type { EventType } from '@/types/event'

export const mockEvents: EventType[] = [
  {
    id: '1',
    name: 'Salary',
    amount: 5000,
    date: new Date('2025-01-15'),
    type: 'income',
    description: 'January salary'
  },
  {
    id: '2',
    name: 'Groceries',
    amount: 200,
    date: new Date('2024-01-16'),
    type: 'expense',
    description: 'Supermarket purchase'
  },
  {
    id: '3',
    name: 'Amazon Shopping',
    amount: 300,
    date: new Date('2025-01-18'),
    type: 'expense',
    description: 'Bought electronics'
  },
  {
    id: '2',
    name: 'Groceries',
    amount: 500,
    date: new Date('2025-01-16'),
    type: 'expense',
    description: 'Supermarket purchase'
  },
  {
    id: '3',
    name: 'Amazon Shopping',
    amount: 400,
    date: new Date('2025-01-18'),
    type: 'expense',
    description: 'Bought electronics'
  },
  {
    id: '4',
    name: 'Salary',
    amount: 6000,
    date: new Date('2025-04-15'),
    type: 'income',
    description: 'January salary'
  },
  {
    id: '5',
    name: 'Groceries',
    amount: 100,
    date: new Date('2025-02-16'),
    type: 'expense',
    description: 'Supermarket purchase'
  },
  {
    id: '6',
    name: 'Amazon Shopping',
    amount: 500,
    date: new Date('2025-02-18'),
    type: 'expense',
    description: 'Bought electronics'
  },
]