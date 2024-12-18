import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addList, addTask, completeTask, editTask, removeTask } from "@/app/redux/list_slice";
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
  Paper,
} from "@mui/material";

interface Task {
  timeStamp: string;
  text: string;
  checked: boolean;
  isEditing: boolean;
}

const shake = keyframes`
0% { transform: translateX(0); }
25% { transform: translateX(-5px); }
50% { transform: translateX(5px); }
75% { transform: translateX(-5px); }
100% { transform: translateX(0); }
`;

const EditableListItem: React.FC<{
  task: Task;
  toDoListId: number;
}> = ({ task, toDoListId }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(completeTask({ listId: toDoListId, timeStamp: task.timeStamp }));
  };

  const handleEditStart = () => {
    dispatch(editTask({ listId: toDoListId, timeStamp: task.timeStamp, text: task.text }));
  };

  const handleEditEnd = (newText: string) => {
    dispatch(editTask({ listId: toDoListId, timeStamp: task.timeStamp, text: newText }));
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
          inputProps={{ "aria-labelledby": `checkbox-list-label-${task.timeStamp}` }}
        />
      </ListItemIcon>
      {task.isEditing ? (
        <TextField
          fullWidth
          value={task.text}
          onChange={(e) => handleEditStart()}
          onBlur={() => handleEditEnd(task.text)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleEditEnd(task.text);
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
            onClick={() => handleEditEnd(task.text)}
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
        <IconButton
          edge="end"
          aria-label="delete"
          size="small"
          onClick={handleDeleteItem}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
};

const EditableList = () => {
  const dispatch = useDispatch();
  const toDoLists = useSelector((state: RootState) => state.task.lists);
  const [newTitle, setNewTitle] = useState("");

  const handleAddItem = () => {
    if (newTitle.trim()) {
      dispatch(addList(newTitle));
      setNewTitle("");
    }
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <TextField fullWidth label="Type List Title here📝" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      </Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {toDoLists.map((toDoList) => (
          <div key={toDoList.id}>
            <h3>{toDoList.title}</h3>
            {toDoList.tasks.map((task) => (
              <EditableListItem
                key={task.timeStamp}
                task={task}
                toDoListId={toDoList.id}
              />
            ))}
          </div>
        ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <IconButton aria-label="add" onClick={handleAddItem}>
          <AddIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Box sx={modalStyle}>
            <EditableList />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
