import { Box, FormControl, InputLabel, MenuItem, Select, Typography, Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { isFetchingConferenceRoom } from '../../../manager/store/reducers/ConferenceRoomReducer';
import ComponentSpiner from '../Loader/componentSpinner';
import wifi from '../../assets/icons/wifi.svg';
import mic from '../../assets/icons/mic.svg';
import airconditioning from '../../assets/icons/airconditioning.svg';
import bluetooth from '../../assets/icons/bluetooth.svg';
import projector from '../../assets/icons/projector.svg';
import speaker from '../../assets/icons/speaker.svg';
import stage from '../../assets/icons/stage.svg';

interface amenities {
    name: string;
}
interface room {
    amenities: amenities[];
    created_on: number;
    error: string | null;
    floor_number: number;
    head: number;
    id: number;
    is_active: boolean;
    name: string;
    number: number;
    number_of_seats: number;
    site: number;
    site_name: string;
    type: string;
    updated_on: number;
}
// interface room {
//     room_no: number;
//     projector: boolean;
//     addition_info: string;
//     available: boolean;
// }
interface Props {
    roomsData: room[];
    roomNumber: any;
    handleroomNumberChange: any;
    floors: number[];
    floor: any;
    handleFloorChange: any;
    error?: ErrorRoom;
    postConferenceRoomRequest: any;
}
interface ErrorRoom {
    floor: string;
    room: string;
}

function ScreenRoom(props: Props) {
    const {
        error,
        roomsData,
        roomNumber,
        handleroomNumberChange,
        postConferenceRoomRequest,
        floor,
        handleFloorChange,
        floors,
    } = props;

    const handleClickOnRoomCard = (index: number, roomId: number) => {
        setRoomIndex(index);
        if (roomsData && roomsData.length > 0) {
            amentiesArrayContruct(index, roomsData);
        }
        if (roomNumber !== roomId) {
            handleroomNumberChange(roomId);
        } else {
            handleroomNumberChange(null);
        }
    };

    const handleFloorSelectChange = (e: any) => {
        handleFloorChange(e);
        setRoomIndex(null);
        postConferenceRoomRequest(e.target.value);
    };

    const [roomIndex, setRoomIndex] = React.useState<number | null>(null);
    const [amentiesArray, setamentiesArray] = React.useState<string[]>([]);

    let localLoading = true;
    let isLoading = useSelector(isFetchingConferenceRoom);

    if (localLoading) {
        localLoading = isLoading;
    }

    const amentiesArrayContruct = (index: number, roomsData: room[]) => {
        let amenties: string[] = [];
        if (roomsData && roomsData.length > 0) {
            roomsData[index].amenities.map((data) => {
                amenties.push(data.name);
            });
        }
        setamentiesArray(amenties);
    };
    return (
        <Box
            sx={{
                width: 0.96,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginLeft: '18px',
            }}
        >
            <FormControl sx={{ marginLeft: '24px' }}>
                <InputLabel id="demo-simple-select-label">Select Floor</InputLabel>

                <Select
                    sx={{ width: 200, height: 40 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-lable"
                    value={floor}
                    label={'Select Floor'}
                    onChange={handleFloorSelectChange}
                >
                    {floors.map((floor) => {
                        return (
                            <MenuItem key={floor} value={floor}>
                                Floor {floor}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <Typography
                sx={{
                    width: 0.8,
                    marginLeft: '20px',
                    marginTop: '30px',
                    // marginBottom: '30px',
                    textAlign: 'start',
                    color: roomNumber === null || typeof roomNumber === 'undefined' ? 'red' : '#000000',
                    fontSize: '18px',
                    lineHeight: '20px',
                }}
            >
                Select Room To Conduct Meeting
            </Typography>
            <Box
                sx={{
                    width: 0.99,
                    display: 'flex',
                    // minHeight: 208,
                    justifyContent: 'flex-start',
                    alignItems: 'stretch',
                    overflowX: 'auto',
                    marginLeft: '21px',
                }}
            >
                {localLoading && (
                    <Box sx={{ width: 1, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                        <ComponentSpiner></ComponentSpiner>
                    </Box>
                )}
                {!localLoading && roomsData && roomsData.length === 0 && <>NO ROOM FOUND FOR CONFERENCE</>}
                {!localLoading &&
                    roomsData &&
                    roomsData.length > 0 &&
                    roomsData.map((room, index) => (
                        <Box
                            key={room.id}
                            sx={{
                                border: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                background: roomNumber === room.id ? 'rgba(179, 35, 40, 0.04)' : '#ffffff',
                                minWidth: '160px !important',
                                borderRadius: '20px',
                                marginX: 1,
                                marginY: 2,
                                alignItems: 'center',
                                borderColor: room.error === '' || room.error === null ? '#B32328' : '#949494',
                                boxShadow: '1px 1px 3px #888888',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    marginX: '18px',
                                    marginTop: "18px",
                                    marginBottom: "10px",
                                    width: 65,
                                    minHeight: 65,
                                    borderRadius: '50%',
                                    fontSize: '25px',
                                    fontWeight: 'bold',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    background:
                                        'linear-gradient(153.54deg, rgba(39, 174, 96, 0.08) -1.61%, rgba(179, 35, 40, 0.5) 109.97%)',
                                }}
                            >
                                {room.number}
                            </Box>
                            <p style={{ fontSize: '13px', width: '80%', textAlign: 'center' }} >{room.name}</p>

                            {room.error === '' || room.error === null ? (
                                <Button
                                    variant="contained"
                                    sx={{
                                        fontSize: '12px',
                                        height: 24,
                                        color: '#ffffff',
                                        fontWeight: 'bold',
                                        marginY: '10px',
                                        padding: '3px 15px',
                                        borderRadius: '10px',
                                    }}
                                    color="success"
                                    onClick={() => handleClickOnRoomCard(index, room.id)}
                                >
                                    {roomNumber === room.id ? 'Selected' : 'Reserve'}
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    sx={{
                                        fontSize: '12px',
                                        color: '#ffffff !important',
                                        fontWeight: 'bold',
                                        height: 24,
                                        marginY: '10px',
                                        padding: '3px 15px',
                                        borderRadius: '10px',
                                        background: 'rgba(148, 148, 148, 1) !important',
                                    }}
                                    disabled
                                >
                                    Booked
                                </Button>
                            )}
                        </Box>
                    ))}
            </Box>

            {roomsData && roomsData.length > 0 && roomIndex !== null && (
                <>
                    <Typography
                        sx={{
                            width: 0.8,
                            marginLeft: '20px',
                            marginTop: '30px',
                            textAlign: 'start',
                            color: '#000000',
                            fontSize: '18px',
                            lineHeight: '20px',
                        }}
                    >
                        {console.log(amentiesArray)}
                        Amenities
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            width: 1,
                            marginLeft: '20px',
                            justifyContent: 'flex-start',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Box
                            sx={{
                                minWidth: '160px',
                                display: amentiesArray.indexOf('Projector') === -1 ? 'none' : 'flex',
                                minHeight: '30px',
                                alignItems: 'center',
                                margin: '10px',
                            }}
                        >
                            <img src={projector} alt="projector" />
                            <Typography sx={{ marginLeft: '10px' }}>Projector</Typography>
                        </Box>
                        <Box
                            sx={{
                                minWidth: '160px',
                                display: amentiesArray.indexOf('Screen') === -1 ? 'none' : 'flex',
                                minHeight: '30px',
                                alignItems: 'center',
                                margin: '10px',
                            }}
                        >
                            <img src={projector} alt="projector" />
                            <Typography sx={{ marginLeft: '10px' }}>Screen</Typography>
                        </Box>
                        <Box
                            sx={{
                                minWidth: '160px',
                                display: amentiesArray.indexOf('Dias') === -1 ? 'none' : 'flex',
                                minHeight: '30px',
                                alignItems: 'center',
                                margin: '10px',
                            }}
                        >
                            <img src={stage} alt="Dias" />
                            <Typography sx={{ marginLeft: '10px' }}>Dias</Typography>
                        </Box>
                        <Box
                            sx={{
                                minWidth: '160px',
                                display: amentiesArray.indexOf('Wifi') === -1 ? 'none' : 'flex',
                                minHeight: '30px',
                                alignItems: 'center',
                                margin: '10px',
                            }}
                        >
                            <img src={wifi} alt="wifi" />
                            <Typography sx={{ marginLeft: '10px' }}>Wifi</Typography>
                        </Box>
                        <Box
                            sx={{
                                minWidth: '160px',
                                display: amentiesArray.indexOf('Mic') === -1 ? 'none' : 'flex',
                                minHeight: '30px',
                                alignItems: 'center',
                                margin: '10px',
                            }}
                        >
                            <img src={mic} alt="mic" />
                            <Typography sx={{ marginLeft: '10px' }}>Microphone</Typography>
                        </Box>
                        <Box
                            sx={{
                                minWidth: '160px',
                                display: amentiesArray.indexOf('A/C') === -1 ? 'none' : 'flex',
                                minHeight: '30px',
                                alignItems: 'center',
                                margin: '10px',
                            }}
                        >
                            <img src={airconditioning} alt="AirConditioner" />
                            <Typography sx={{ marginLeft: '10px' }}>Air conditioning</Typography>
                        </Box>
                        <Box
                            sx={{
                                minWidth: '160px',
                                display: amentiesArray.indexOf('Speaker') === -1 ? 'none' : 'flex',
                                minHeight: '30px',
                                alignItems: 'center',
                                margin: '10px',
                            }}
                        >
                            <img src={speaker} alt="speaker" />
                            <Typography sx={{ marginLeft: '10px' }}>Speaker</Typography>
                        </Box>
                        <Box
                            sx={{
                                minWidth: '160px',
                                display: amentiesArray.indexOf('Bluetooth') === -1 ? 'none' : 'flex',
                                minHeight: '30px',
                                alignItems: 'center',
                                margin: '10px',
                            }}
                        >
                            <img src={bluetooth} alt="bluetooth" />
                            <Typography sx={{ marginLeft: '10px' }}>Bluetooth</Typography>
                        </Box>
                        <Box
                            sx={{
                                minWidth: '160px',
                                display: amentiesArray.length === 0 ? 'flex' : 'none',
                                minHeight: '30px',
                                alignItems: 'center',
                                margin: '10px',
                            }}
                        >

                            <Typography sx={{ marginLeft: '10px' }}>No Amenities Available</Typography>
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default ScreenRoom;
