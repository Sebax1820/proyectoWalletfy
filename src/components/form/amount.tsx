import { NumberInput } from '@mantine/core';

export function AmountInput() {
  return (
    <NumberInput
      label="Amount"
      placeholder="Amount of money"
      min={1}
    />
  );
}