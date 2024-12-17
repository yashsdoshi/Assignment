"use client";
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "@/app/redux/hooks";
import { addTask } from "@/app/redux/list_slice";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { keyframes } from "@mui/system";
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
  Paper,
} from "@mui/material";

interface Item {
  id: string;
  text: string;
  checked: boolean;
  isEditing: boolean;
}

const EditableListItem: React.FC<{
  item: Item;
  handleToggle: (id: string) => void;
  handleTextChange: (id: string, newText: string) => void;
  handleEditStart: (id: string) => void;
  handleEditEnd: (id: string) => void;
  handleDeleteItem: (id: string) => void;
}> = ({
  item,
  handleToggle,
  handleTextChange,
  handleEditStart,
  handleEditEnd,
  handleDeleteItem,
}) => (
  <ListItem
    dense
    divider
    role="listitem"
    aria-label={`List item ${item.id}`}
    sx={{
      textDecoration: item.checked ? "line-through" : "none",
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

const shake = keyframes`
0% { transform: translateX(0); }
25% { transform: translateX(-5px); }
50% { transform: translateX(5px); }
75% { transform: translateX(-5px); }
100% { transform: translateX(0); }
`;

function EditableList() {
  const [items, setItems] = useState([
    {
      id: new Date().toISOString(),
      text: "Type your task here👋 (Double click or click the edit icon)",
      checked: false,
      isEditing: false,
    },
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
      prev.map((item) =>
        item.id === id ? { ...item, isEditing: false } : item
      )
    );

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: new Date().toISOString(),
        text: "",
        checked: false,
        isEditing: true,
      },
    ]);
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
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <TextField fullWidth label="Type List Title here📝" id="fullWidth" />
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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <IconButton aria-label="add" onClick={handleAddItem}>
          <AddIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="outlined"
          sx={{
            borderColor: "black",
            color: "black",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
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
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: "1px 1px 10pxrgb(255, 255, 255)",
  borderRadius: 6,
  p: 4,
  color: "white",
  width: 800,
};

export default function basicModal() {
  const [open, setOpen] = React.useState(false);
  const [taskTitle, setTaskTitle] = React.useState("");
  const dispatch = useAppDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      dispatch(addTask(taskTitle));
      setTaskTitle("");
      handleClose();
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={2}
      sx={{ color: "white" }}
    >
      <Button
        variant="outlined"
        sx={{
          fontSize: 16,
          fontWeight: 700,
          borderWidth: 3,
          borderRadius: 5,
          width: 500,
          letterSpacing: ".3rem",
          color: "white",
          borderColor: "white",
          "&:hover": {
            backgroundColor: "white",
            color: "black",
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
