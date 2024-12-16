import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
    id: string;
    title: string;
    completed: boolean;
};

interface taskState {
    tasks: Task[];
    completedTasks: number;
};

const initialState: taskState = {
    tasks: [],
    completedTasks: 0,
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<string>) {
            const newTask: Task = {
                id: new Date().toISOString(),
                title: action.payload,
                completed: false,
            };
            state.tasks.push(newTask);
        },
        removeTask(state, action: PayloadAction<string>) {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            state.completedTasks += 1;
        }
    }
});

export const { addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
