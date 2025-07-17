import { TextInput } from '@mantine/core';



export function NameInput() {
  return (
    <TextInput label='Name' placeholder='Name of the event' min={3} max={20}/>
  );
}


export function DescriptionInput() {
  return (
    <TextInput label="Description" placeholder='Description of the event'/>
  );
}