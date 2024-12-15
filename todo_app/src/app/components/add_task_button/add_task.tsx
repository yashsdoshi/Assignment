"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from '@/app/redux/hooks';
import { addTask } from '@/app/redux/taskSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 30,
    borderRadius: 4,
    p: 4,
};

export default function BasicModal() {
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
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
            <Button
                variant="contained"
                sx={{ fontSize: 16, fontWeight: 700 }}
                onClick={handleOpen}
            >
                Add new task <AddIcon sx={{ marginLeft: 1 }} />
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box display="flex" alignItems="center">
                        <TextField
                            id="fullWidth"
                            label="Type a task"
                            variant="outlined"
                            fullWidth
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                        />
                        <IconButton
                            sx={{
                                bgcolor: 'blue', 
                                color: 'white', 
                                padding: 1,     
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                                '&:hover': {
                                    bgcolor: 'lightblue', 
                                },
                                marginLeft: 1
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