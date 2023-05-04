import {
    Avatar,
    Box,
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import React from 'react';
import CancelCircleIcon from '@mui/icons-material/Cancel';
import { EmpData } from '../../../manager/containers/TeamRosterScreen/data/dummyData';

interface invite {
    name: String;
    surName: String;
    phone: Number | null;
    email: String;
}
interface Props {
    EmployData: EmpData[];
    employNameList: any;
    invites: invite[];
    handleinviteNameChange: any;
    handleinvitesurNameChange: any;
    handleinvitePhoneChange: any;
    handleinviteEmailChange: any;
    handleaddinviteButton: any;
    handleEmployNameListChange: any;
    handleEmployNameListToggle: any;
    handleInvitesCrossButton: any;
}
export default function ConferenceInvite(props: Props) {
    const {
        EmployData,
        employNameList,
        invites,
        handleinviteNameChange,
        handleinvitesurNameChange,
        handleinvitePhoneChange,
        handleinviteEmailChange,
        handleaddinviteButton,
        handleEmployNameListChange,
        handleEmployNameListToggle,
        handleInvitesCrossButton,
    } = props;
    return (
        <Box
            sx={{
                width: 0.8,
                display: 'flex',
                maxWidth: 0.8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'stretch',
                height: '70vh',
                bgcolor: '#FFFFFF',
                borderRadius: '20px',
                paddingY: '5vh',
            }}
        >
            <Box sx={{ width: 0.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <InputLabel
                    sx={{ width: 0.7, textAlign: 'start', fontSize: '18px', color: 'black', marginX: 2, marginY: 1 }}
                >
                    Invite teammates
                </InputLabel>

                <FormControl sx={{ width: 0.7, margin: 2 }} error>
                    <InputLabel id="demo-simple-select-error-label">Search</InputLabel>
                    <Select
                        multiple
                        labelId="demo-simple-select-error-label"
                        id="demo-simple-select-error"
                        label="Search"
                        value={employNameList}
                        onChange={handleEmployNameListChange}
                    >
                        {EmployData.map((emp) => (
                            <MenuItem value={emp.emp_id} key={emp.emp_id}>
                                {emp.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <List dense sx={{ width: 0.7, margin: 2, height: '50vh', overflow: 'auto' }}>
                    {EmployData.map((emp) => {
                        return (
                            <ListItem
                                key={emp.emp_id}
                                secondaryAction={
                                    <Checkbox
                                        edge="end"
                                        onChange={handleEmployNameListToggle(emp.emp_id)}
                                        checked={employNameList.indexOf(emp.emp_id) !== -1}
                                    />
                                }
                                disablePadding
                            >
                                <ListItemButton onClick={handleEmployNameListToggle(emp.emp_id)}>
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
            <Box
                sx={{
                    width: 0.5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    // border: '0.5px',
                    borderRadius: '10px',
                    height: '70vh',
                }}
            >
                <InputLabel
                    sx={{
                        width: 0.9,
                        textAlign: 'start',
                        fontSize: '18px',
                        color: 'black',
                        marginX: 2,
                        marginY: 1,
                    }}
                >
                    Invite guests to join your meeting if there are
                </InputLabel>
                <InputLabel sx={{ width: 0.9, textAlign: 'start', fontSize: '12px', color: 'red', marginX: 2 }}>
                    Tap on Submit if there are no guests*
                </InputLabel>

                <Box sx={{ maxHeight: '50vh', marginX: 2, width: 0.9, overflow: 'auto' }}>
                    {invites.map((value, id) => {
                        return (
                            <Box
                                key={id}
                                sx={{
                                    width: 0.9,
                                    padding: '4px',
                                    marginY: 1,
                                    background: '#F6F6F6',
                                    borderRadius: '8px',
                                    position: 'relative',
                                }}
                            >
                                <Box sx={{ display: 'flex', width: 0.95, margin: 1, justifyContent: 'space-between' }}>
                                    <TextField
                                        sx={{ width: 0.49, background: '#ffffff' }}
                                        id="outlined-basic"
                                        label="Name"
                                        variant="outlined"
                                        onChange={(e) => {
                                            handleinviteNameChange(e, id);
                                        }}
                                        value={value.name}
                                    />
                                    <TextField
                                        sx={{ width: 0.49, background: '#ffffff' }}
                                        id="outlined-basic"
                                        label="Surname"
                                        variant="outlined"
                                        onChange={(e) => {
                                            handleinvitesurNameChange(e, id);
                                        }}
                                        value={value.surName}
                                    />
                                </Box>
                                <TextField
                                    sx={{ width: 0.95, margin: 1, background: '#ffffff' }}
                                    id="outlined-basic"
                                    label="Mobile Number"
                                    variant="outlined"
                                    onChange={(e) => {
                                        handleinvitePhoneChange(e, id);
                                    }}
                                    value={value.phone}
                                />
                                <TextField
                                    sx={{ width: 0.95, margin: 1, background: '#ffffff' }}
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    onChange={(e) => {
                                        handleinviteEmailChange(e, id);
                                    }}
                                    value={value.email}
                                />
                                <CancelCircleIcon
                                    sx={{ top: -9, right: -10, position: 'absolute' }}
                                    key={id}
                                    onClick={() => handleInvitesCrossButton(id)}
                                    color="error"
                                />
                            </Box>
                        );
                    })}
                </Box>
                <Button
                    sx={{ height: 40, width: 388, margin: 1 }}
                    onClick={handleaddinviteButton}
                    variant="outlined"
                    color="error"
                >
                    Invite more
                </Button>
            </Box>
        </Box>
    );
}
