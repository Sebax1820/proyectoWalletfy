import React, { useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation, useQuery } from '@tanstack/react-query'

import DataRepo from '@/api/datasource'
import type { CreateEventType } from '@/types/event'

import { Input } from '@/components/form/input'
import { DateInput } from '@/components/form/date'
import { Select } from '@/components/form/select'
import { DeleteButton } from '@/components/form/delete'




export const Route = createFileRoute('/form/$id')({
  component: RouteComponent,
})



function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [mode] = React.useState<'create' | 'edit'>(
    id === 'new' ? 'create' : 'edit'
  )

  const { data } = useQuery({
    enabled: mode === 'edit',
    queryKey: ['event', id],
    queryFn: () => DataRepo.getEventById(id),
  })

  const {mutate, isPending} = useMutation<boolean, Error, CreateEventType>({
    mutationKey: ['event'],
    mutationFn: (values) => {
      if (mode === 'create') {
        return DataRepo.saveEvent(values)
      } else {
        return DataRepo.updateEvent({
          ...values,
          id: id,
        })
      }
    },
    onSettled: (_, error) => {
      if(error) {
        alert(`Error saving event: ${error.message}`)
      } else {
        if(mode === 'create') {
          alert('Event created successfully!')
        }
        if(mode === 'edit') {
          alert('Event edited successfully!')
        }
        navigate({to: '/'})
      }
        
    }
  })

  const [form, setForm] = React.useState<CreateEventType>({
    name: '',
    description: '',
    date: new Date(),
    amount: 0,
    type: 'income'
  })

  useEffect(
    () => {
      if(data) {
        setForm({
          name: data.name,
          description: data.description,
          date: data.date,
          amount: data.amount,
          type: data.type,
        })
      }
    }, 
    [data]
  )

  

  return (
    <form className='w-xl p-10 mx-auto flex flex-col gap-4'
    onSubmit={(e) => {
      e.preventDefault()
      submitForm()
    }}
    >

      <h1>Create Event</h1>
      
      <Input
      type='text'
      placeholder='Name of the event'
      label='Name'
      value={form.name}
      minLength={2}
      maxLength={20}
      onChange={(e) => handleChange('name', e.target.value)}
      required
      />

      <Input
      type='text'
      placeholder='Description of the event'
      label='Description'
      value={form.description}
      maxLength={100}
      onChange={(e) => handleChange('description', e.target.value)}
      />

      <DateInput
      placeholder='yyyy/mm/dd'
      label='Date'
      value={form.date}
      onChange={(e) => handleChange('date', e)}
      />

      <Input
      type='number'
      placeholder=''
      label='Amount'
      value={form.amount}
      required
      min={1}
      onChange={(e) => handleChange('amount', parseInt(e.target.value))}
      />

      <Select
      label='Type'
      options={[
        {value: 'income', label:'income'},
        {value: 'expense', label:'expense'}
      ]}
      value={form.type}
      onChange={(e) => handleChange('type', e.target.value)}
      />

      <div className='font-semibold'>
        <button
        className="mt-4 w-full bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
        type="submit"
        >
          
          {isPending ? "Saving.." : (mode === 'create' ? 'Create' : 'Update') + ' Event'}
        </button>
      </div>
      

      {mode === 'edit' && data && (
        <div className="mt-2">
          <DeleteButton id={id} name={data.name} />
        </div>
      )}
    </form>
  )


  function submitForm() {
    console.log('Form submitted:', form)
    mutate(form)
  }


  function handleChange(
    key: string,
    value: string | number | boolean | Date | Array<string>,
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }


  
}
