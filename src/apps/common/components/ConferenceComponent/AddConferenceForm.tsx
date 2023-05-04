import { Box, Button, Input, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import React from 'react';
import EmployData, { roomsData } from '../../../manager/containers/TeamRosterScreen/data/dummyData';
import ConferenceInvite from './ConferenceInvite';
import CancelCircleIcon from '@mui/icons-material/Cancel';
import { isNull } from 'lodash';

interface invite {
    name: String;
    surName: String;
    phone: Number | null;
    email: String;
}

function AddConferenceForm() {
    const [handleNext, sethandleNext] = React.useState(false);
    const [roomNumber, setroomNumber] = React.useState<Number>();
    const [specialRequirements, setspecialRequirements] = React.useState(['', '', '']) as any;
    const [technicalRequirements, settechnicalRequirements] = React.useState(['', '', '']) as any;
    const [employNameList, setPersonName] = React.useState([]) as any;
    const [invites, setInvites] = React.useState<invite[]>([{ name: '', surName: '', phone: null, email: '' }]);

    const handleinviteNameChange = (event: any, id: number) => {
        let value = event.target.value;
        let newInvites = [...invites];

        newInvites[id].name = value;

        setInvites(newInvites);
    };
    const handleinvitesurNameChange = (event: any, id: number) => {
        let value = event.target.value;
        let newInvites = [...invites];

        newInvites[id].surName = value;

        setInvites(newInvites);
    };
    const handleinvitePhoneChange = (event: any, id: number) => {
        let value = event.target.value;
        let newInvites = [...invites];

        newInvites[id].phone = value;

        setInvites(newInvites);
    };
    const handleinviteEmailChange = (event: any, id: number) => {
        let value = event.target.value;
        let newInvites = [...invites];

        newInvites[id].email = value;

        setInvites(newInvites);
    };

    const handleaddinviteButton = () => {
        let emptyInvite: invite = {
            name: '',
            surName: '',
            phone: null,
            email: '',
        };
        let newInvites = [...invites];
        newInvites.push(emptyInvite);
        setInvites(newInvites);
    };

    const handleEmployNameListChange = (event: any) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleEmployNameListToggle = (value: number) => () => {
        const currentIndex = employNameList.indexOf(value);
        const newChecked = [...employNameList];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setPersonName(newChecked);
    };

    const handlespecialRequirementsChange = (event: any, id: number) => {
        let requirement = event.target.value;
        let value = [...specialRequirements];
        value[id] = requirement;
        setspecialRequirements(value);
    };
    const handletechnicalRequirementsChange = (event: any, id: number) => {
        let requirement = event.target.value;
        let value = [...technicalRequirements];
        value[id] = requirement;
        settechnicalRequirements(value);
    };

    const handleroomNumberChange = (value: number) => {
        setroomNumber(value);
    };

    const handleNextSubmitButton = () => {
        if (handleNext == false) {
            //   console.log(isFinite(roomNumber));
            console.log(typeof roomNumber);

            if (typeof roomNumber == 'undefined') {
                alert('Select Room');
            } else {
                sethandleNext(true);
            }
        } else {
            alert('submit task');
        }
    };

    const handleInvitesCrossButton = (id: number) => {
        let newInvites = [...invites];
        newInvites.splice(id, 1);
        setInvites(newInvites);
    };

    const handleaddSpecialRequirementsChange = () => {
        let requirements = [...specialRequirements];
        requirements.push('');
        setspecialRequirements(requirements);
    };
    const handleaddtechnicalRequirementsChange = () => {
        let requirements = [...technicalRequirements];
        requirements.push('');
        settechnicalRequirements(requirements);
    };

    const handletechRequirementCrossButton = (id: number) => {
        let requirements = [...technicalRequirements];
        requirements.splice(id, 1);
        settechnicalRequirements(requirements);
    };
    const handleaddSpecialRequirementCrossButton = (id: number) => {
        let requirements = [...specialRequirements];
        requirements.splice(id, 1);
        setspecialRequirements(requirements);
    };
    return (
        <Box
            sx={{
                width: 0.8,
                display: 'flex',
                // maxWidth: 0.8,
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                height: '80vh',
                bgcolor: '#FFFFFF',
                borderRadius: '20px',
                paddingY: '2vh',
                paddingX: '63px',
            }}
        >
            {!handleNext ? (
                <>
                    <Typography
                        sx={{
                            width: 0.5,
                            textAlign: 'start',
                            color: '#000000',
                            fontSize: '16px',
                            paddingLeft: '21px',
                            marginBottom: '16px',
                        }}
                    >
                        Below shown are the rooms available based on your selected date.
                    </Typography>
                    <Box
                        sx={{
                            width: 0.8,
                            display: 'flex',
                            maxWidth: 0.8,
                            minHeight: 208,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            overflowX: 'auto',
                            marginLeft: '21px',
                        }}
                    >
                        {roomsData.map((room) => (
                            <Box
                                key={room.room_no}
                                sx={{
                                    border: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    background: roomNumber === room.room_no ? 'rgba(179, 35, 40, 0.04)' : '#ffffff',
                                    width: 140,
                                    height: 208,
                                    borderRadius: '20px',
                                    marginX: 1,
                                    alignItems: 'center',
                                    borderColor: room.available ? '#B32328' : '#949494',
                                    boxShadow: '1px 1px 3px #888888',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        margin: '24px auto',
                                        width: 65,
                                        height: 65,
                                        borderRadius: '50%',
                                        border: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        background:
                                            'linear-gradient(153.54deg, rgba(39, 174, 96, 0.03) -1.61%, rgba(179, 35, 40, 0.1) 109.97%)',
                                    }}
                                >
                                    {room.room_no}
                                </Box>
                                <Box sx={{ width: 1 }}>
                                    <Typography
                                        sx={{ width: 1, textAlign: 'start', fontSize: '8px', paddingLeft: '21px' }}
                                    >
                                        {room.projector ? 'projector' : <></>}
                                    </Typography>
                                    <Typography
                                        sx={{ width: 1, textAlign: 'start', fontSize: '8px', paddingLeft: '21px' }}
                                    >
                                        {room.addition_info}
                                    </Typography>
                                </Box>

                                {room.available ? (
                                    <Button
                                        variant="contained"
                                        sx={{ fontSize: '12px', height: 24, marginY: '24px', padding: '3px 15px' }}
                                        color="success"
                                        onClick={() => handleroomNumberChange(room.room_no)}
                                    >
                                        {roomNumber === room.room_no ? 'Selected' : 'Reserve'}
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        sx={{ fontSize: '12px', height: 24, marginY: '24px', padding: '3px 15px' }}
                                        disabled
                                    >
                                        Booked
                                    </Button>
                                )}
                            </Box>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            width: 0.9,
                            marginY: 2,
                            marginX: 1,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Box
                            sx={{
                                width: 500,
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                flexDirection: 'column',
                                margin: 1,
                            }}
                        >
                            <Typography
                                sx={{
                                    width: 0.8,
                                    margin: 1,
                                    textAlign: 'start',
                                    color: '#000000',
                                    fontSize: '18px',
                                    lineHeight: '20px',
                                }}
                            >
                                Mention if any special requirements and needs to the room
                            </Typography>
                            <Box
                                sx={{
                                    width: 0.8,
                                    minHeight: 200,
                                    maxHeight: 220,
                                    borderRadius: '10px',
                                    backgroundColor: '#F6F6F6',
                                    overflow: 'auto',
                                }}
                            >
                                {specialRequirements.map((value: any, id: any) => {
                                    return (
                                        <Box
                                            key={id}
                                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        >
                                            <TextField
                                                key={id}
                                                sx={{
                                                    width: specialRequirements[id] === '' ? 0.95 : 0.9,
                                                    marginY: 1,
                                                    backgroundColor: '#ffffff',
                                                }}
                                                label="Add here"
                                                value={value ? value : ''}
                                                onChange={(e) => handlespecialRequirementsChange(e, id)}
                                            />

                                            {specialRequirements[id] === '' ? (
                                                <></>
                                            ) : (
                                                <CancelCircleIcon
                                                    key={id}
                                                    onClick={() => handleaddSpecialRequirementCrossButton(id)}
                                                    color="error"
                                                />
                                            )}
                                        </Box>
                                    );
                                })}
                            </Box>

                            <Button
                                sx={{ width: 0.5, margin: 1 }}
                                variant="outlined"
                                color="error"
                                onClick={handleaddSpecialRequirementsChange}
                            >
                                Add More
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                width: 500,
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                flexDirection: 'column',
                                margin: 1,
                            }}
                        >
                            <Typography
                                sx={{
                                    width: 0.8,
                                    margin: 1,
                                    textAlign: 'start',
                                    color: '#000000',
                                    fontSize: '18px',
                                    lineHeight: '20px',
                                }}
                            >
                                Mention if any IT resources are required for the room
                            </Typography>
                            <Box
                                sx={{
                                    width: 0.8,
                                    minHeight: 200,
                                    maxHeight: 220,
                                    borderRadius: '10px',
                                    backgroundColor: '#F6F6F6',
                                    overflow: 'auto',
                                }}
                            >
                                {technicalRequirements.map((value: any, id: any) => {
                                    return (
                                        <Box
                                            key={id}
                                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        >
                                            <TextField
                                                key={id}
                                                sx={{
                                                    width: technicalRequirements[id] === '' ? 0.95 : 0.9,
                                                    marginY: 1,
                                                    backgroundColor: '#ffffff',
                                                }}
                                                label="Add here"
                                                value={value ? value : ''}
                                                onChange={(e) => handletechnicalRequirementsChange(e, id)}
                                            />

                                            {technicalRequirements[id] === '' ? (
                                                <></>
                                            ) : (
                                                <CancelCircleIcon
                                                    key={id}
                                                    onClick={() => handletechRequirementCrossButton(id)}
                                                    color="error"
                                                />
                                            )}
                                        </Box>
                                    );
                                })}
                            </Box>
                            <Button
                                sx={{ width: 0.5, margin: 1 }}
                                variant="outlined"
                                color="error"
                                onClick={handleaddtechnicalRequirementsChange}
                            >
                                Add More
                            </Button>
                        </Box>
                    </Box>
                </>
            ) : (
                <ConferenceInvite
                    EmployData={EmployData}
                    employNameList={employNameList}
                    invites={invites}
                    handleEmployNameListChange={handleEmployNameListChange}
                    handleEmployNameListToggle={handleEmployNameListToggle}
                    handleaddinviteButton={handleaddinviteButton}
                    handleinviteEmailChange={handleinviteEmailChange}
                    handleinvitePhoneChange={handleinvitePhoneChange}
                    handleinviteNameChange={handleinviteNameChange}
                    handleinvitesurNameChange={handleinvitesurNameChange}
                    handleInvitesCrossButton={handleInvitesCrossButton}
                />
            )}
            <Box sx={{ width: 0.9, margin: 1, display: 'flex', justifyContent: 'center' }}>
                <Button
                    sx={{ maxHeight: 60, width: 388 }}
                    variant="contained"
                    color="error"
                    onClick={handleNextSubmitButton}
                >
                    {handleNext ? 'Submit' : 'Next'}
                </Button>
            </Box>
        </Box>
    );
}

export default AddConferenceForm;
