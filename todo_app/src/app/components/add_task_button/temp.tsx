"use client";
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "@/app/redux/hooks";
import { addList } from "@/app/redux/list_slice";
import { keyframes } from "@mui/system";
import { Box, TextField, Paper } from "@mui/material";

const shake = keyframes`
0% { transform: translateX(0); }
25% { transform: translateX(-5px); }
50% { transform: translateX(5px); }
75% { transform: translateX(-5px); }
100% { transform: translateX(0); }
`;

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

const EditableList = ({ listId }: { listId: string }) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.task.lists.find((list) => list.id === listId)?.tasks || []);

  const handleToggle = (timeStamp: string) => {
    dispatch(toggleTask({ listId, timeStamp }));
  };

  const handleTextChange = (timeStamp: string, newText: string) => {
    dispatch(updateTask({ listId, timeStamp, newText }));
  };

  const handleEditStart = (timeStamp: string) => {
    dispatch(updateTask({ listId, timeStamp, newText: "" })); // No-op or mark the task as being edited
  };

  const handleEditEnd = (timeStamp: string) => {
    dispatch(updateTask({ listId, timeStamp, newText: "" })); // Save task text here
  };

  const handleAddItem = () => {
    dispatch(
      addTask({
        listId,
        task: {
          timeStamp: new Date().toISOString(),
          text: "",
          checked: false,
          isEditing: true,
        },
      })
    );
  };

  const handleDeleteItem = (timeStamp: string) => {
    dispatch(deleteTask({ listId, timeStamp }));
  };

  return (
    <List>
      {tasks.map((task) => (
        <EditableListItem
          key={task.timeStamp}
          task={task}
          handleToggle={handleToggle}
          handleTextChange={handleTextChange}
          handleEditStart={handleEditStart}
          handleEditEnd={handleEditEnd}
          handleDeleteItem={handleDeleteItem}
        />
      ))}
      <Box>
        <IconButton onClick={handleAddItem}>
          <AddIcon />
        </IconButton>
      </Box>
    </List>
  );
};

export default function AddTaskButton() {
  const [open, setOpen] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const dispatch = useAppDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddList = () => {
    if (listTitle.trim()) {
      dispatch(addList(listTitle));
      setListTitle("");
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
          <TextField
            fullWidth
            label="Type List Title here📝"
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
          />
          <EditableList />
          <Button onClick={handleAddList} sx={{ mt: 2 }}>
            Add List
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
