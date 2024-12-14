import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

export default function AddTask() {
    return (
        <Box textAlign='center' py={2}>
            <Button variant='contained' sx={{ fontSize: 16, fontWeight: 700 }}>
                Add new task <AddIcon sx={{ marginLeft: 1 }}/>
            </Button>
        </Box>
    );
}
