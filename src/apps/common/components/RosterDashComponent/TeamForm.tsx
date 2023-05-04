import { Box, InputLabel, FormControl, ListItemButton, ListItemAvatar, ListItemText } from '@mui/material';
import { Select, MenuItem, List, ListItem, Checkbox, Avatar } from '@mui/material';
import React from 'react';
import EmployData from '../../../manager/containers/TeamRosterScreen/data/dummyData';

interface Props {
    employIDs: any;
    handleEmployIDsChange: any;
    handleEmployIDsToggle: any;
}

export default function TeamForm(props: Props) {
    const { employIDs, handleEmployIDsChange, handleEmployIDsToggle } = props;
    return (
        <Box sx={{ width: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <InputLabel sx={{ color: 'black', marginY: 1 }}>Add Member</InputLabel>

            <FormControl sx={{ width: 380 }} error>
                <InputLabel id="demo-simple-select-error-label">Search</InputLabel>
                <Select
                    multiple
                    labelId="demo-simple-select-error-label"
                    id="demo-simple-select-error"
                    label="Search"
                    value={employIDs}
                    onChange={handleEmployIDsChange}
                >
                    {EmployData.map((emp) => (
                        <MenuItem value={emp.emp_id} key={emp.emp_id}>
                            {emp.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <List dense sx={{ width: 380, height: '50vh', overflow: 'auto' }}>
                {EmployData.map((emp) => {
                    return (
                        <ListItem
                            key={emp.emp_id}
                            secondaryAction={
                                <Checkbox
                                    edge="end"
                                    onChange={handleEmployIDsToggle(emp.emp_id)}
                                    checked={employIDs.indexOf(emp.emp_id) !== -1}
                                />
                            }
                            disablePadding
                        >
                            <ListItemButton onClick={handleEmployIDsToggle(emp.emp_id)}>
                                <ListItemAvatar>
                                    <Avatar />
                                </ListItemAvatar>
                                <ListItemText primary={emp.name} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
}
