// import { useState } from 'react';
// import { DateInput } from '@mantine/dates';

// export function DateSelect() {
//   const [value, setValue] = useState<string | null>(null);
//   return (
//     <DateInput
//       value={value}
//       onChange={setValue}
//       label="Date input"
//       placeholder="dd/mm/yyyy"
//     />
//   );
// }

import dayjs from 'dayjs';
import { DateInput } from '@mantine/dates';
import type { DateInputProps } from '@mantine/dates';

const dateParser: DateInputProps['dateParser'] = (input) => {
  if (input === 'WW2') {
    return '1939-09-01';
  }

  return dayjs(input, 'DD/MM/YYYY').format('YYYY-MM-DD');
};

export function DateSelect() {
  return (

    <DateInput
    dateParser={dateParser}
    valueFormat="DD/MM/YYYY"
    label="Date"
    placeholder="dd/mm/yyyy"
    />
  );
}