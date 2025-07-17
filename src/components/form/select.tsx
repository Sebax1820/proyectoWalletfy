import { Select } from '@mantine/core';

export function SelectInput() {
  return (
    <Select
      label="Type"
      data={['income', 'Expense']}
    />
  );
}