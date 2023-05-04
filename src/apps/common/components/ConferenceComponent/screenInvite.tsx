import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface invite {
    first_name: String;
    last_name: String;
    phone: number | null;
    email: String;
}
interface Props {
    invites: invite[];
    handleinviteNameChange: any;
    handleinvitesurNameChange: any;
    handleinvitePhoneChange: any;
    handleinviteEmailChange: any;
    handleaddinviteButton: any;
    handleInvitesCrossButton: any;
}
function ScreenInvite(props: Props) {
    const {
        invites,
        handleinviteNameChange,
        handleinvitesurNameChange,
        handleinvitePhoneChange,
        handleinviteEmailChange,
        handleaddinviteButton,
        handleInvitesCrossButton,
    } = props;
    return (
        <Box
            sx={{ display: 'flex', width: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
            <Typography
                sx={{
                    width: 0.9,
                    textAlign: 'start',
                    color: '#000000',
                    fontSize: '18px',
                    lineHeight: '20px',
                }}
            >
                Invite Guests
                {/* Invite guests to join your meeting if there are */}
            </Typography>
            <Box sx={{ display: 'flex', width: 0.9, flexDirection: 'column' }}>
                {invites.map((value, id) => {
                    return (
                        <Box
                            key={id}
                            sx={{
                                width: 1,
                                padding: '4px',
                                marginY: 1,
                                display: 'flex',
                                background: '#F6F6F6',
                                borderRadius: '8px',
                                position: 'relative',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                sx={{ width: 0.19, maxWidth: 0.19, margin: 1, background: '#ffffff' }}
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                onChange={(e) => {
                                    handleinviteNameChange(e, id);
                                }}
                                value={value.first_name}
                            />
                            <TextField
                                sx={{ width: 0.19, maxWidth: 0.19, margin: 1, background: '#ffffff' }}
                                id="outlined-basic"
                                label="Surname"
                                variant="outlined"
                                onChange={(e) => {
                                    handleinvitesurNameChange(e, id);
                                }}
                                value={value.last_name}
                            />
                            <TextField
                                sx={{ width: 0.19, maxWidth: 0.19, margin: 1, background: '#ffffff' }}
                                id="outlined-basic"
                                label="Mobile Number"
                                variant="outlined"
                                onChange={(e) => {
                                    handleinvitePhoneChange(e, id);
                                }}
                                value={value.phone}
                            />
                            <TextField
                                sx={{ width: 0.4, maxWidth: 0.4, margin: 1, background: '#ffffff' }}
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                onChange={(e) => {
                                    handleinviteEmailChange(e, id);
                                }}
                                value={value.email}
                            />
                            <CloseIcon
                                sx={{ width: 0.03, cursor: 'pointer' }}
                                key={id}
                                onClick={() => handleInvitesCrossButton(id)}
                            />
                        </Box>
                    );
                })}
            </Box>
            <Button
                sx={{
                    height: 40,
                    width: 289,
                    margin: 1,
                    color: 'rgba(179, 35, 40, 1)',
                    borderColor: 'rgba(179, 35, 40, 1)',
                    borderRadius: '10px',
                }}
                onClick={handleaddinviteButton}
                variant="outlined"
                color="error"
            >
                Invite more
            </Button>
        </Box>
    );
}

export default ScreenInvite;
