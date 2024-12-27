"use client";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "@/app/redux/hooks";
import { addList } from "@/app/redux/list_slice";
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
    Typography,
    TextField,
    Paper,
} from "@mui/material";

interface ToDoList {
    id: string;
    title: string;
    tasks: Task[];
}

interface Task {
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

const shake = keyframes`
0% { transform: translateX(0); }
25% { transform: translateX(-5px); }
50% { transform: translateX(5px); }
75% { transform: translateX(-5px); }
100% { transform: translateX(0); }
`;

interface ConfettiProps {
    onStartExplosion: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ onStartExplosion }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isExploding, setIsExploding] = useState(false);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                const confettiPieces: {
                    x: number;
                    y: number;
                    size: number;
                    color: string;
                    speedX: number;
                    speedY: number;
                    gravity: number;
                    life: number;
                }[] = [];

                const explodeConfetti = (centerX: number, centerY: number) => {
                    for (let i = 0; i < 200; i++) {
                        const angle = Math.random() * 2 * Math.PI;
                        const speed = Math.random() * 5 + 3; 
                        confettiPieces.push({
                            x: centerX,
                            y: centerY,
                            size: Math.random() * 5 + 5,
                            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                            speedX: Math.cos(angle) * speed,
                            speedY: Math.sin(angle) * speed,
                            gravity: 0.1,
                            life: Math.random() * 60 + 60,
                        });
                    }
                };

                if (onStartExplosion && !isExploding) {
                    setIsExploding(true);
                    explodeConfetti(canvas.width / 2, canvas.height / 2);
                }

                const updateConfetti = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    confettiPieces.forEach((confetti, index) => {

                        confetti.x += confetti.speedX;
                        confetti.y += confetti.speedY;

                        confetti.speedY += confetti.gravity;

                        confetti.life--;

                        if (confetti.life <= 0) {
                            confettiPieces.splice(index, 1);
                        }

                        ctx.beginPath();
                        ctx.arc(confetti.x, confetti.y, confetti.size, 0, Math.PI * 2);
                        ctx.fillStyle = confetti.color;
                        ctx.fill();
                    });

                    if (confettiPieces.length > 0) {
                        requestAnimationFrame(updateConfetti);
                    }
                };

                if (isExploding) {
                    updateConfetti();
                }
            }
        }
    }, [onStartExplosion, isExploding]);

    return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />;
};

function EditableList({ onClose }: { onClose: () => void }) {
    const dispatch = useAppDispatch();
    const [quote, setQuote] = useState<string>('');
    const [showConfetti, setShowConfetti] = useState<boolean>(false);

    const [toDoList, setToDoList] = useState<ToDoList>({
        id: (Math.floor(Math.random() * 90000) + 10000).toString(),
        title: "",
        tasks: [
            {
                timeStamp: new Date().toISOString(),
                text: "Click on the Create new List button 👆 to create your first list ❗",
                checked: false,
                isEditing: true,
            },
        ],
    });

    const quotes: string[] = [
        "One task at a time, one step closer to success!",
        "Success is the sum of small efforts, repeated day in-day out.",
        "Believe in yourself and all that you are.",
        "Your limitation—it's only your imagination.",
        "Dream it. Wish it. Do it.",
        "The harder you work for something, the greater you'll feel when you achieve it.",
        "Don't stop when you're tired. Stop when you're done.",
        "It always seems impossible until it's done.",
        "The only way to do great work is to love what you do.",
        "Push yourself, because no one else is going to do it for you.",
    ];

    const handleAddList = () => {
        if (toDoList.title.trim() === "") {
            alert("Please provide a title for the list before adding it!");
            return;
        }

        dispatch(
            addList({
                listId: parseInt(toDoList.id),
                title: toDoList.title,
                tasks: toDoList.tasks,
            })
        );
        setToDoList((prev) => ({ ...prev, title: "", tasks: [] }));
        setShowConfetti(true);
        
        setTimeout(() => {
            setShowConfetti(false);
        }, 3000);

        onClose();
    };

    useEffect(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
    }, []);

    return (
        <>
            {showConfetti && <Confetti onStartExplosion={showConfetti} />}
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
                <Typography
                    variant="h5"
                    align="center"
                    gutterBottom
                    mb={2}
                    fontWeight={500}
                >
                    {quote}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                    }}
                >
                    <TextField
                        fullWidth
                        label="Type List Title here📝"
                        id="fullWidth"
                        value={toDoList.title}
                        onChange={(e) =>
                            setToDoList((prev) => ({ ...prev, title: e.target.value }))
                        }
                    />
                </Box>
                <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                    {toDoList.tasks.map((item) => (
                        <EditableListItem
                            key={item.timeStamp}
                            task={item}
                            handleToggle={(timeStamp) =>
                                setToDoList((prev) => ({
                                    ...prev,
                                    tasks: prev.tasks.map((task) =>
                                        task.timeStamp === timeStamp
                                            ? { ...task, checked: !task.checked }
                                            : task
                                    ),
                                }))
                            }
                            handleTextChange={(timeStamp, newText) =>
                                setToDoList((prev) => ({
                                    ...prev,
                                    tasks: prev.tasks.map((task) =>
                                        task.timeStamp === timeStamp
                                            ? { ...task, text: newText }
                                            : task
                                    ),
                                }))
                            }
                            handleEditStart={(timeStamp) =>
                                setToDoList((prev) => ({
                                    ...prev,
                                    tasks: prev.tasks.map((task) =>
                                        task.timeStamp === timeStamp
                                            ? { ...task, isEditing: true }
                                            : task
                                    ),
                                }))
                            }
                            handleEditEnd={(timeStamp) =>
                                setToDoList((prev) => ({
                                    ...prev,
                                    tasks: prev.tasks.map((task) =>
                                        task.timeStamp === timeStamp
                                            ? { ...task, isEditing: false }
                                            : task
                                    ),
                                }))
                            }
                            handleDeleteItem={(timeStamp) =>
                                setToDoList((prev) => ({
                                    ...prev,
                                    tasks: prev.tasks.filter(
                                        (task) => task.timeStamp !== timeStamp
                                    ),
                                }))
                            }
                        />
                    ))}
                </List>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <IconButton
                        aria-label="add"
                        onClick={() =>
                            setToDoList((prev) => ({
                                ...prev,
                                tasks: [
                                    ...prev.tasks,
                                    {
                                        timeStamp: new Date().toISOString(),
                                        text: "",
                                        checked: false,
                                        isEditing: true,
                                    },
                                ],
                            }))
                        }
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Button
                        sx={{
                            color: "white",
                            backgroundColor: "black",
                            "&:hover": {
                                animation: `${shake} 0.5s ease-in-out`,
                            },
                        }}
                        onClick={handleAddList}
                    >
                        Add List
                    </Button>
                </Box>
            </Paper>
        </>
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
                <Box sx={modalStyle}>
                    <EditableList onClose={handleClose} />
                </Box>
            </Modal>
        </Box>
    );
}
