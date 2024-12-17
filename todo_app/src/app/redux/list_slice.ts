import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface taskState {
    lists: ToDoList[];
};

const initialState: taskState = {
    lists: [],
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
        },
        editTask(state, action: PayloadAction<string>) {
            
        },
        completeTask(){
            
        },
        renameList(){

        },
        deleteList(){

        },
    }
});

export const { addTask, removeTask, editTask, completeTask, renameList, deleteList } = taskSlice.actions;
export default taskSlice.reducer;
