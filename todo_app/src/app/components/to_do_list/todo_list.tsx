import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
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

interface ToDoList {
  id: string;
  title: string;
  tasks: Task[];
}

interface Task{
  timeStamp: string;
  text: string;
  checked: boolean;
  isEditing: boolean;
}

const EditableListItem: React.FC<{
  task: Task;
  handleToggle(id: string): void;
  handleEditStart(id: string): void;
  handleEditEnd(id: string): void;
  handleTextChange(id: string, newText: string): void;
  handleDeleteItem(id: string): void;
}> = ({
  task,
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
    aria-label={`List item ${task.timeStamp}`}
    sx={{
      textDecoration: task.checked ? "line-through" : "none",
    }}
  >
    <ListItemIcon>
      <Checkbox
        edge="start"
        checked={task.checked}
        onChange={() => handleToggle(task.timeStamp)}
        inputProps={{ "aria-labelledby": `checkbox-list-label-${task.timeStamp}` }}
      />
    </ListItemIcon>
    {task.isEditing ? (
      <TextField
        fullWidth
        value={task.text}
        onChange={(e) => handleTextChange(task.timeStamp, e.target.value)}
        onBlur={() => handleEditEnd(task.timeStamp)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleEditEnd(task.timeStamp);
        }}
        autoFocus
        variant="standard"
        aria-label="Edit text field"
      />
    ) : (
      <ListItemText
        id={`checkbox-list-label-${task.timeStamp}`}
        primary={task.text}
        sx={{ cursor: "pointer" }}
        onDoubleClick={() => handleEditStart(task.timeStamp)}
      />
    )}
    <ListItemIcon>
      {task.isEditing ? (
        <IconButton
          edge="end"
          aria-label="save"
          onClick={() => handleEditEnd(task.timeStamp)}
          size="small"
        >
          <CheckIcon />
        </IconButton>
      ) : (
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => handleEditStart(task.timeStamp)}
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
        onClick={() => handleDeleteItem(task.timeStamp)}
      >
        <DeleteIcon />
      </IconButton>
    </ListItemIcon>
  </ListItem>
);

const EditMenu: React.FC = () => {

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
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          Edit title
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Delete list
        </MenuItem>
      </Menu>
    </div>
  );
};

export default function GenerateToDoList() {
  const [toDoList, setToDoList] = useState<ToDoList>({
    id: new Date().toISOString(),
    title: "Welcome to ToDoist 📝",
    tasks: [
      {
        timeStamp: new Date().toISOString(),
        text: "Click on the Create new List button 👆 to create your first list ❗",
        checked: false,
        isEditing: false,
      },
    ],
  });

  const handleToggle = (timeStamp: string) =>
    setToDoList((prev) => ({
      ...prev,
      items: prev.tasks.map((item) =>
        item.timeStamp === timeStamp ? { ...item, checked: !item.checked } : item
      ),
    }));

  const handleTextChange = (timeStamp: string, newText: string) =>
    setToDoList((prev) => ({
      ...prev,
      items: prev.tasks.map((item) =>
        item.timeStamp === timeStamp ? { ...item, text: newText } : item
      ),
    }));

  const handleEditStart = (timeStamp: string) =>
    setToDoList((prev) => ({
      ...prev,
      items: prev.tasks.map((item) =>
        item.timeStamp === timeStamp ? { ...item, isEditing: true } : item
      ),
    }));

  const handleEditEnd = (timeStamp: string) =>
    setToDoList((prev) => ({
      ...prev,
      items: prev.tasks.map((item) =>
        item.timeStamp === timeStamp ? { ...item, isEditing: false } : item
      ),
    }));

  const handleAddItem = () => {
    setToDoList((prev) => ({
      ...prev,
      items: [
        ...prev.tasks,
        {
          timeStamp: new Date().toISOString(),
          text: "",
          checked: false,
          isEditing: true,
        },
      ],
    }));
  };

  const handleDeleteItem = (timeStamp: string) =>
    setToDoList((prev) => ({
      ...prev,
      items: prev.tasks.filter((item) => item.timeStamp !== timeStamp),
    }));

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 800,
        minWidth: 700,
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
        <Typography variant="h4" component="h1" gutterBottom>
          {toDoList.title}
        </Typography>
        <EditMenu />
      </Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {toDoList.tasks.map((item) => (
          <EditableListItem
            key={item.timeStamp}
            task={item}
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
    </Paper>
  );
}
