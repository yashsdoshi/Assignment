import { createSlice } from '@reduxjs/toolkit';

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
        addTask(state, action: { payload: Task }) {
            state.tasks.push(action.payload);
        },
        removeTask(state, action: { payload: string }) {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
    }
});

export default taskSlice.reducer;