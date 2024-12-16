import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useAppSelector } from '@/app/redux/hooks';

export default function taskCount() {
    const count = useAppSelector((state) => state.task.completedTasks);
    return (
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
            <Typography>Completed tasks - {count}</Typography>
        </Box>
    )
}
