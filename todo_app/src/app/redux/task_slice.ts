import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
    id: string;
    title: string;
    completed: boolean;
}

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [] as Task[],
    },
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
        }
    }
});

export const { addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
