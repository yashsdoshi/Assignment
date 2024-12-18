import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
    timeStamp: string;
    text: string;
    checked: boolean;
    isEditing: boolean;
}

interface ToDoList {
    id: number;
    title: string;
    tasks: Task[];
}

interface TaskState {
    lists: ToDoList[];
}

const initialState: TaskState = {
    lists: [],
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addList(state, action: PayloadAction<string>) {
            const newList: ToDoList = {
              id: Math.floor(Math.random() * 90000) + 10000,
              title: action.payload, 
              tasks: [],
            };
            state.lists.push(newList);
          },
                    
        removeList(state, action: PayloadAction<number>) {
            state.lists = state.lists.filter((list) => list.id !== action.payload);
        },
        renameList(state, action: PayloadAction<{ id: number; title: string }>) {
            const list = state.lists.find((list) => list.id === action.payload.id);
            if (list) {
                list.title = action.payload.title;
            }
        },
        addTask(state, action: PayloadAction<{ listId: number; text: string }>) {
            const list = state.lists.find((list) => list.id === action.payload.listId);
            if (list) {
                const newTask: Task = {
                    timeStamp: new Date().toISOString(),
                    text: action.payload.text,
                    checked: false,
                    isEditing: true,
                };
                list.tasks.push(newTask);
            }
        },
        removeTask(state, action: PayloadAction<{ listId: number; timeStamp: string }>) {
            const list = state.lists.find((list) => list.id === action.payload.listId);
            if (list) {
                list.tasks = list.tasks.filter((task) => task.timeStamp !== action.payload.timeStamp);
            }
        },
        editTask(state, action: PayloadAction<{ listId: number; timeStamp: string; text: string }>) {
            const list = state.lists.find((list) => list.id === action.payload.listId);
            if (list) {
                const task = list.tasks.find((task) => task.timeStamp === action.payload.timeStamp);
                if (task) {
                    task.text = action.payload.text;
                }
            }
        },
        completeTask(state, action: PayloadAction<{ listId: number; timeStamp: string }>) {
            const list = state.lists.find((list) => list.id === action.payload.listId);
            if (list) {
                const task = list.tasks.find((task) => task.timeStamp === action.payload.timeStamp);
                if (task) {
                    task.checked = !task.checked;
                }
            }
        },
    },
});

export const { addList, removeList, renameList, addTask, removeTask, editTask, completeTask } = taskSlice.actions;
export default taskSlice.reducer;
