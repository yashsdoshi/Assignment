// "use client";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/app/redux/store";
// import { completeTask, editTask, removeTask, removeList, renameList } from "@/app/redux/list_slice";
// import EditIcon from "@mui/icons-material/Edit";
// import CheckIcon from "@mui/icons-material/Check";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import AddIcon from "@mui/icons-material/Add";
// import {
//   Box,
//   Checkbox,
//   IconButton,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   TextField,
//   Typography,
//   Paper,
// } from "@mui/material";

// interface Task {
//   timeStamp: string;
//   text: string;
//   checked: boolean;
//   isEditing: boolean;
// }

// const EditableListItem: React.FC<{
//   task: Task;
//   listId: string;
// }> = ({ task, listId }) => {
//   const dispatch = useDispatch();

//   const handleToggle = () => {
//     dispatch(completeTask({ listId, timeStamp: task.timeStamp }));
//   };

//   const handleTextChange = (newText: string) => {
//     dispatch(editTask({ listId, timeStamp: task.timeStamp, text: newText }));
//   };

//   const handleEditStart = () => {
//     dispatch(editTask({ listId, timeStamp: task.timeStamp, text: task.text }));
//   };

//   const handleEditEnd = () => {
//     dispatch(editTask({ listId, timeStamp: task.timeStamp, text: task.text }));
//   };

//   const handleDeleteItem = () => {
//     dispatch(removeTask({ listId, timeStamp: task.timeStamp }));
//   };

//   return (
//     <ListItem
//       dense
//       divider
//       role="listitem"
//       aria-label={`List item ${task.timeStamp}`}
//       sx={{
//         textDecoration: task.checked ? "line-through" : "none",
//       }}
//     >
//       <ListItemIcon>
//         <Checkbox
//           edge="start"
//           checked={task.checked}
//           onChange={handleToggle}
//           inputProps={{ "aria-labelledby": `checkbox-list-label-${task.timeStamp}` }}
//         />
//       </ListItemIcon>
//       {task.isEditing ? (
//         <TextField
//           fullWidth
//           value={task.text}
//           onChange={(e) => handleTextChange(e.target.value)}
//           onBlur={handleEditEnd}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") handleEditEnd();
//           }}
//           autoFocus
//           variant="standard"
//           aria-label="Edit text field"
//         />
//       ) : (
//         <ListItemText
//           id={`checkbox-list-label-${task.timeStamp}`}
//           primary={task.text}
//           sx={{ cursor: "pointer" }}
//           onDoubleClick={handleEditStart}
//         />
//       )}
//       <ListItemIcon>
//         {task.isEditing ? (
//           <IconButton
//             edge="end"
//             aria-label="save"
//             onClick={handleEditEnd}
//             size="small"
//           >
//             <CheckIcon />
//           </IconButton>
//         ) : (
//           <IconButton
//             edge="end"
//             aria-label="edit"
//             onClick={handleEditStart}
//             size="small"
//           >
//             <EditIcon />
//           </IconButton>
//         )}
//       </ListItemIcon>
//       <ListItemIcon>
//         <IconButton
//           edge="end"
//           aria-label="delete"
//           size="small"
//           onClick={handleDeleteItem}
//         >
//           <DeleteIcon />
//         </IconButton>
//       </ListItemIcon>
//     </ListItem>
//   );
// };

// const ToDoList: React.FC<{ listId: string }> = ({ listId }) => {
//   const list = useSelector((state: RootState) =>
//     state.task.lists.find((list) => list.id === listId)
//   );

//   if (!list) return null;

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         maxWidth: 800,
//         minWidth: 700,
//         margin: "24px auto",
//         padding: 3,
//         borderRadius: 2,
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3,
//         }}
//       >
//         <Typography variant="h4" component="h1" gutterBottom>
//           {list.title}
//         </Typography>
//         <EditMenu listId={listId} />
//       </Box>
//       <List sx={{ width: "100%", bgcolor: "background.paper" }}>
//         {list.tasks.map((task) => (
//           <EditableListItem key={task.timeStamp} task={task} listId={listId} />
//         ))}
//       </List>
//     </Paper>
//   );
// };

// const EditMenu: React.FC<{ listId: string }> = ({ listId }) => {
//   const dispatch = useDispatch();
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleDeleteList = () => {
//     dispatch(removeList(listId));
//     handleClose();
//   };

//   return (
//     <div>
//       <IconButton
//         aria-label="more"
//         id="long-button"
//         aria-controls={open ? "long-menu" : undefined}
//         aria-expanded={open ? "true" : undefined}
//         aria-haspopup="true"
//         onClick={handleClick}
//       >
//         <MoreVertIcon />
//       </IconButton>
//       <Menu
//         id="long-menu"
//         MenuListProps={{
//           "aria-labelledby": "long-button",
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         slotProps={{
//           paper: {
//             style: {
//               maxHeight: 48 * 4.5,
//               width: "20ch",
//             },
//           },
//         }}
//       >
//         <MenuItem onClick={handleClose}>Edit title</MenuItem>
//         <MenuItem onClick={handleDeleteList}>Delete list</MenuItem>
//       </Menu>
//     </div>
//   );
// };

// export default ToDoList;