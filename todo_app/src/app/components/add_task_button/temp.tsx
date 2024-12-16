import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

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
}> = ({
    item,
    index,
    handleToggle,
    handleTextChange,
    handleEditStart,
    handleEditEnd
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
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemIcon>
        </ListItem>
    );

function EditableList() {
    const [items, setItems] = useState([
        { text: "", checked: false, isEditing: false },
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
                <Typography variant="h4" component="h1" gutterBottom>
                    Type a Title
                </Typography>
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
                    />
                ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <IconButton aria-label="add">
                    <AddIcon />
                </IconButton>
            </Box>
        </Paper>
    );
};
