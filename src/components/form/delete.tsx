import DataRepo from '@/api/datasource';
import { Button } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

type Props = {
    id: string;
    name: string;
};

export function DeleteButton({ id, name }: Props) {

    const navigate = useNavigate()

    const queryClient = useQueryClient()
    const { mutate: deleteEvent, isPending } = useMutation({

    mutationFn: () => DataRepo.deleteEvent(id),
    onSuccess: () => {
        alert('Event deleted succesfully!')
        queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error: Error) => {
        console.error(`Failed to delete event: ${error.message}`);
    },
    });


    return <Button
    fullWidth
    onClick={() => {
        const confirmed = window.confirm(`Are you sure you want to delete ${name}?`)
        if (confirmed) {
            deleteEvent()
            navigate({ to: '/', params: { id } })
        }
    }}
    loading={isPending} 
    variant="filled" 
    color="red">
        Delete
        </Button>;
}