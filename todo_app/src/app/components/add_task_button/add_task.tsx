"use client";
import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '@/app/redux/hooks';
import { addTask } from '@/app/redux/task_slice';
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from '@mui/icons-material/Delete';
import { keyframes } from '@mui/system';
import {
    Box,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography,
    Paper
} from "@mui/material";

interface Item {
    text: string;
    checked: boolean;
    isEditing: boolean;
}

const EditableListItem: React.FC<{
    item: Item;
    index: number;
    handleToggle: (index: number) => void;
    handleTextChange: (index: number, newText: string) => void;
    handleEditStart: (index: number) => void;
    handleEditEnd: (index: number) => void;
    handleDeleteItem: (index: number) => void;
}> = ({
    item,
    index,
    handleToggle,
    handleTextChange,
    handleEditStart,
    handleEditEnd,
    handleDeleteItem
}) => (
        <ListItem
            dense
            divider
            role="listitem"
            aria-label={`List item ${index + 1}`}
            sx={{
                textDecoration: item.checked ? "line-through" : "none"
            }}
        >
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={item.checked}
                    onChange={() => handleToggle(index)}
                    inputProps={{ "aria-labelledby": `checkbox-list-label-${index}` }}
                />
            </ListItemIcon>
            {item.isEditing ? (
                <TextField
                    fullWidth
                    value={item.text}
                    onChange={(e) => handleTextChange(index, e.target.value)}
                    onBlur={() => handleEditEnd(index)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleEditEnd(index);
                    }}
                    autoFocus
                    variant="standard"
                    aria-label="Edit text field"
                />
            ) : (
                <ListItemText
                    id={`checkbox-list-label-${index}`}
                    primary={item.text}
                    sx={{ cursor: "pointer" }}
                    onDoubleClick={() => handleEditStart(index)}
                />
            )}
            <ListItemIcon>
                {item.isEditing ? (
                    <>
                        <IconButton
                            edge="end"
                            aria-label="save"
                            onClick={() => handleEditEnd(index)}
                            size="small"
                        >
                            <CheckIcon />
                        </IconButton>
                    </>
                ) : (
                    <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditStart(index)}
                        size="small"
                    >
                        <EditIcon />
                    </IconButton>
                )}
            </ListItemIcon>
            <ListItemIcon>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    size="small"
                    onClick={() => handleDeleteItem(index)}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemIcon>
        </ListItem>
    );

const shake = keyframes`
0% { transform: translateX(0); }
25% { transform: translateX(-5px); }
50% { transform: translateX(5px); }
75% { transform: translateX(-5px); }
100% { transform: translateX(0); }
`;

function EditableList() {
    const [items, setItems] = useState([
        { text: "Type your task here👋 (Double click or click the edit icon)", checked: false, isEditing: false },
    ]);

    const handleToggle = (index: number) =>
        setItems((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, checked: !item.checked } : item
            )
        );

    const handleTextChange = (index: number, newText: string) =>
        setItems((prev) =>
            prev.map((item, i) => (i === index ? { ...item, text: newText } : item))
        );

    const handleEditStart = (index: number) =>
        setItems((prev) =>
            prev.map((item, i) => (i === index ? { ...item, isEditing: true } : item))
        );

    const handleEditEnd = (index: number) =>
        setItems((prev) =>
            prev.map((item, i) => (i === index ? { ...item, isEditing: false } : item))
        );

    const handleAddItem = () => {
        setItems((prev) => [...prev, { text: "", checked: false, isEditing: true }]);
    };

    const handleDeleteItem = (index: number) =>
        setItems((prev) => prev.filter((_, i) => i !== index));

    return (
        <Paper
            elevation={3}
            sx={{
                maxWidth: 600,
                margin: "24px auto",
                padding: 3,
                borderRadius: 2
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <TextField fullWidth label="Type List Title here📝" id="fullWidth" />
            </Box>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {items.map((item, index) => (
                    <EditableListItem
                        key={index}
                        item={item}
                        index={index}
                        handleToggle={handleToggle}
                        handleTextChange={handleTextChange}
                        handleEditStart={handleEditStart}
                        handleEditEnd={handleEditEnd}
                        handleDeleteItem={handleDeleteItem}
                    />
                ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <IconButton aria-label="add" onClick={handleAddItem}>
                    <AddIcon />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                    variant="outlined"
                    sx={{
                        borderColor: 'black',
                        color: 'black',
                        '&:hover': {
                            backgroundColor: 'black',
                            color: 'white',
                            animation: `${shake} 0.5s ease-in-out`,
                        },
                    }}
                    aria-label="add"
                >
                    Create List
                </Button>
            </Box>
        </Paper>
    );
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '1px 1px 10pxrgb(255, 255, 255)',
    borderRadius: 6,
    p: 4,
    color: 'white',
    width: 800
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
                    '&:hover': {
                        backgroundColor: 'white',
                        color: 'black',
                        animation: `${shake} 0.5s ease-in-out`,
                    },
                }}
                onClick={handleOpen}
            >
                Create new list <AddIcon sx={{ marginLeft: 1 }} />
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <EditableList />
                </Box>
            </Modal>
        </Box>
    );
}
