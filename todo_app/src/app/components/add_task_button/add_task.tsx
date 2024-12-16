"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from '@/app/redux/hooks';
import { addTask } from '@/app/redux/task_slice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '2px solid #000',
    boxShadow: '1px 1px 10pxrgb(255, 255, 255)',
    borderRadius: 4,
    p: 4,
    backgroundColor: 'black',
    color: 'white',
};

export default function basicModal() {
    const [open, setOpen] = React.useState(false);
    const [taskTitle, setTaskTitle] = React.useState('');
    const dispatch = useAppDispatch();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAddTask = () => {
        if (taskTitle.trim()) {
            dispatch(addTask(taskTitle));
            setTaskTitle('');
            handleClose();
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" mt={2} sx={{ color: 'white' }}>
            <Button
                variant="outlined"
                sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    borderWidth: 3,
                    borderRadius: 5,
                    width: 500,
                    letterSpacing: '.3rem',
                    color: 'white',
                    borderColor: 'white',
                }}
                onClick={handleOpen}
            >
                Create new list <AddIcon sx={{ marginLeft: 1 }} />
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                        <TextField
                            id="title"
                            label="Add a title"
                            variant="outlined"
                            fullWidth
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{
                                style: {
                                    color: 'white',
                                    borderColor: 'white',
                                },
                            }}
                        />
                        <TextField
                            id="task"
                            label="Add a task"
                            variant="outlined"
                            fullWidth
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{
                                style: {
                                    color: 'white',
                                    borderColor: 'white',
                                },
                            }}
                        />
                        <IconButton
                            sx={{
                                bgcolor: '#3874d0',
                                color: 'white',
                                padding: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                                '&:hover': {
                                    bgcolor: '#2f5a9e',
                                },
                            }}
                            onClick={handleAddTask}
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
