import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
    id: string;
    text: string;
    checked: boolean;
    isEditing: boolean;
}

const EditableListItem: React.FC<{
    item: Item;
    handleToggle(id: string): void;
    handleEditStart(id: string): void;
    handleEditEnd(id: string): void;
    handleTextChange(id: string, newText: string): void;
    handleDeleteItem(id: string): void;
}> = ({
    item,
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
        aria-label={`List item ${item.id}`}
        sx={{
            textDecoration: item.checked ? "line-through" : "none"
        }}
    >
        <ListItemIcon>
            <Checkbox
                edge="start"
                checked={item.checked}
                onChange={() => handleToggle(item.id)}
                inputProps={{ "aria-labelledby": `checkbox-list-label-${item.id}` }}
            />
        </ListItemIcon>
        {item.isEditing ? (
            <TextField
                fullWidth
                value={item.text}
                onChange={(e) => handleTextChange(item.id, e.target.value)}
                onBlur={() => handleEditEnd(item.id)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleEditEnd(item.id);
                }}
                autoFocus
                variant="standard"
                aria-label="Edit text field"
            />
        ) : (
            <ListItemText
                id={`checkbox-list-label-${item.id}`}
                primary={item.text}
                sx={{ cursor: "pointer" }}
                onDoubleClick={() => handleEditStart(item.id)}
            />
        )}
        <ListItemIcon>
            {item.isEditing ? (
                <IconButton
                    edge="end"
                    aria-label="save"
                    onClick={() => handleEditEnd(item.id)}
                    size="small"
                >
                    <CheckIcon />
                </IconButton>
            ) : (
                <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEditStart(item.id)}
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
                onClick={() => handleDeleteItem(item.id)}
            >
                <DeleteIcon />
            </IconButton>
        </ListItemIcon>
    </ListItem>
);

const LongMenu: React.FC = () => {

    const options = [
        'Edit title',
        'Delete list',
    ];

    const ITEM_HEIGHT = 48;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default function EditableList() {
    const [items, setItems] = useState<Item[]>([
        { id: new Date().toISOString(), text: "Click on the Create new List button 👆 to create your first list ❗", checked: false, isEditing: false },
        { id: new Date().toISOString(), text: "This list would be deleted once you created new list ❗", checked: false, isEditing: false },
    ]);

    const handleToggle = (id: string) =>
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );

    const handleTextChange = (id: string, newText: string) =>
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, text: newText } : item))
        );

    const handleEditStart = (id: string) =>
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, isEditing: true } : item))
        );

    const handleEditEnd = (id: string) =>
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, isEditing: false } : item))
        );

    const handleAddItem = () => {
        setItems((prev) => [...prev, { id: new Date().toISOString(), text: "", checked: false, isEditing: true }]);
    };

    const handleDeleteItem = (id: string) =>
        setItems((prev) => prev.filter((item) => item.id !== id));

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
                    Welcome to ToDoist 📝
                </Typography>
                <LongMenu />
            </Box>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {items.map((item) => (
                    <EditableListItem
                        key={item.id}
                        item={item}
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
        </Paper>
    );
};
