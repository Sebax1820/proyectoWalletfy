import { AmountInput } from '@/components/form/amount'
import { DateSelect } from '@/components/form/date'
import { DescriptionInput, NameInput } from '@/components/form/input'
import { SelectInput } from '@/components/form/select'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/form/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams();

  if (id === 'new') {
    return (
    <div className='w-xl mx-auto'>

      <p>Prueba</p>
      <NameInput></NameInput>
      <DescriptionInput></DescriptionInput>
      <DateSelect></DateSelect>
      <AmountInput></AmountInput>
      <SelectInput></SelectInput>
    </div>
  )
  }
  
}
