import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { addTask, completeTask, editTask, removeTask, removeList, renameList } from "@/app/redux/list_slice";
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
  Modal,
  Button,
} from "@mui/material";

interface Task {
  timeStamp: string;
  text: string;
  checked: boolean;
  isEditing: boolean;
}

const EditableListItem: React.FC<{
  task: Task;
  toDoListId: number;
}> = ({ task, toDoListId }) => {
  const dispatch = useDispatch();
  const [editText, setEditText] = useState(task.text);

  const handleToggle = () => {
    dispatch(completeTask({ listId: toDoListId, timeStamp: task.timeStamp }));
  };

  const handleEditStart = () => {
    if (!task.isEditing) {
      dispatch(editTask({ listId: toDoListId, timeStamp: task.timeStamp }));
    }
  };

  const handleEditEnd = () => {
    if (editText.trim() !== task.text) {
      dispatch(editTask({ listId: toDoListId, timeStamp: task.timeStamp, text: editText }));
    } else {
      dispatch(editTask({ listId: toDoListId, timeStamp: task.timeStamp }));
    }
  };


  const handleDeleteItem = () => {
    dispatch(removeTask({ listId: toDoListId, timeStamp: task.timeStamp }));
  };

  return (
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
          onChange={handleToggle}
          inputProps={{
            "aria-labelledby": `checkbox-list-label-${task.timeStamp.toString()}`,
          }}
        />
      </ListItemIcon>
      {task.isEditing ? (
        <TextField
          fullWidth
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEditEnd}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleEditEnd();
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
          onDoubleClick={handleEditStart}
        />
      )}
      <ListItemIcon>
        {task.isEditing ? (
          <IconButton
            edge="end"
            aria-label="save"
            onClick={handleEditEnd}
            size="small"
          >
            <CheckIcon />
          </IconButton>
        ) : (
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={handleEditStart}
            size="small"
          >
            <EditIcon />
          </IconButton>
        )}
      </ListItemIcon>
      <ListItemIcon>
        <IconButton edge="end" aria-label="delete" size="small" onClick={handleDeleteItem}>
          <DeleteIcon />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
};

const EditMenu: React.FC<{ toDoListId: number }> = ({ toDoListId }) => {
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setOpen(true);
    handleClose();
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSaveTitle = () => {
    dispatch(renameList({ id: toDoListId, title: newTitle }));
    handleCloseModal();
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
        open={Boolean(anchorEl)}
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
        <MenuItem onClick={handleOpenModal}>Edit title</MenuItem>
        <MenuItem onClick={() => dispatch(removeList(toDoListId))}>Delete list</MenuItem>
      </Menu>

      <Modal open={open} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            fullWidth
            label="Edit List Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Button onClick={handleSaveTitle} sx={{ mt: 2, display: "block", mx: "auto" }}>
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default function GenerateToDoList() {
  const dispatch = useDispatch();
  const toDoLists = useSelector((state: RootState) => state.task.lists);

  const handleAddItem = (listId: number) => {
    dispatch(addTask({ listId, text: "" }));
  };

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
      {toDoLists.map((toDoList) => (
        <Box key={toDoList.id} sx={{ marginBottom: 3 }}>
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
            <EditMenu toDoListId={toDoList.id} />
          </Box>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {toDoList.tasks.map((task) => (
              <EditableListItem
              key={`${toDoList.id}-${task.timeStamp}`}
              task={task}
              toDoListId={toDoList.id}
          />          
            ))}
          </List>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <IconButton aria-label="add" onClick={() => handleAddItem(toDoList.id)}>
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Paper>
  );
}
