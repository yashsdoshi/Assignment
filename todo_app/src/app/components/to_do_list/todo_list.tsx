"use client";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxList() {
    const [checked, setChecked] = React.useState<number[]>([]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const labels = ['Go to gym', 'Buy groceries', 'Do laundry', 'Cook dinner', 'Clean house'];

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper', marginLeft: '40%', maxWidth: 360 }}>
            {labels.map((label, index) => {
                const labelId = `checkbox-list-label-${index}`;

                return (
                    <ListItem key={index} disablePadding>
                        <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.includes(index)}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={label} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}
