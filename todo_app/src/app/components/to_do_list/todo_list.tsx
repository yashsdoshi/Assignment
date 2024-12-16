import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useAppSelector, useAppDispatch } from '@/app/redux/hooks';
import { removeTask } from '@/app/redux/task_slice';

export default function checkboxList() {
    const tasks = useAppSelector((state) => state.task.tasks);
    const dispatch = useAppDispatch();

    const handleToggle = (id: string) => () => {
        dispatch(removeTask(id));
    };

    return (
        <List sx={{ width: '100%', marginLeft: '40%', maxWidth: 360 }}>
            {tasks.map((task) => {
                const labelId = `checkbox-list-label-${task.id}`;

                return (
                    <ListItem key={task.id} disablePadding>
                        <ListItemButton role={undefined} onClick={handleToggle(task.id)} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={task.title} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}