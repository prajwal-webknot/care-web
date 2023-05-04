import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, InputLabel, FormHelperText } from '@mui/material';
import { Radio, Select } from '@mui/material';
import { TextField, MenuItem, FormGroup } from '@mui/material';
import { Col, Row } from 'antd/lib/grid';
import React from 'react';
import { floors, timeInterval } from '../../../manager/containers/TeamRosterScreen/data/dummyData';

interface ErrorSingle {
    title: string;
    fromTime: string;
    toTime: string;
    rsvp: string;
}
interface Props {
    title: string;
    handleTitleChange: any;
    teamSize?: string;
    handleRadioChange: any;
    floor?: any;
    handleFloorChange?: any;
    fromTime: any;
    handleFromTimeChange: any;
    toTime: any;
    handleToTimeChange: any;
    rsvp: any;
    handleRsvpChange: any;
    error?: ErrorSingle;
}
export default function ConferenceForm(props: Props) {
    const {
        title,
        handleTitleChange,
        teamSize,
        handleRadioChange,
        fromTime,
        handleFromTimeChange,
        toTime,
        handleToTimeChange,
        rsvp,
        handleRsvpChange,
        error,
    } = props;

    if (typeof error === 'undefined') {
    }

    return (
        <FormControl
            sx={{
                width: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: 1,
            }}
        >
            <TextField
                error={title.length === 0}
                required
                sx={{
                    width: 0.8,
                    color: 'black',
                    textAlign: 'start',
                    paddingY: 1,
                    borderColor: title === '' ? 'red' : '',
                }}
                size="medium"
                id="outlined-basic"
                label="Add Title"
                variant="outlined"
                value={title}
                onChange={handleTitleChange}
                helperText={title.length === 0 ? 'please add title' : ''}
            />
            <FormControl component="fieldset" sx={{ width: 0.8, paddingY: 1 }} required>
                <FormLabel sx={{ color: 'black', textAlign: 'start' }} component="legend">
                    Select Your Team Size
                </FormLabel>
                <RadioGroup
                    row
                    sx={{ justifyContent: 'space-between', fontFamily: 'Montserrat' }}
                    aria-label="Select Your Team Size"
                    name="row-radio-buttons-group"
                    value={teamSize}
                    onChange={handleRadioChange}
                >
                    <FormControlLabel value="1-2" control={<Radio color="error" size="small" />} label="1-2" />
                    <FormControlLabel value="3-7" control={<Radio color="error" size="small" />} label="3-7" />
                    <FormControlLabel value="8-14" control={<Radio color="error" size="small" />} label="8-14" />
                    <FormControlLabel value="15-20" control={<Radio color="error" size="small" />} label="15-20" />
                </RadioGroup>
            </FormControl>
            {/* <FormControl sx={{ marginY: 2 }} required>
                <InputLabel id="demo-simple-select-label">Select Floor</InputLabel>

                <Select
                    sx={{ width: 164 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-lable"
                    value={floor}
                    label={'Select Floor'}
                    onChange={handleFloorChange}
                >
                    {floors.map((floor) => {
                        return (
                            <MenuItem key={floor} value={`floor ${floor}`}>
                                floor {floor}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl> */}
            {/* <FormControl sx={{ marginY: 2 }} required>
                <InputLabel id="demo-simple-select-label">RSVP</InputLabel>
                <Select
                    error={rsvp.length === 0}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-lable"
                    label="RSVP"
                    sx={{ width: 164 }}
                    value={rsvp}
                    onChange={handleRsvpChange}
                >
                    <MenuItem value={'RSVP-YES'}>RSVP-YES</MenuItem>
                    <MenuItem value={'RSVP-NO'}>RSVP-NO</MenuItem>
                </Select>
                <FormHelperText>{rsvp.length === 0 ? 'please select RSVP' : ''}</FormHelperText>
            </FormControl> */}
            <Box sx={{ width: 0.8, marginTop: "8px" }}>
                <Row>
                    <Col span={12}>
                        <FormControl sx={{ width: "99%" }} required>
                            <InputLabel id="demo-simple-select-label">From</InputLabel>

                            <Select
                                error={fromTime.length === 0}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select-lable"
                                value={fromTime}
                                label={'From'}
                                size='medium'
                                onChange={handleFromTimeChange}
                            >
                                {timeInterval.map((time) => {
                                    return (
                                        <MenuItem key={time} value={time}>
                                            {time}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <FormHelperText>{fromTime.length === 0 ? 'select from time' : ''}</FormHelperText>
                        </FormControl>
                    </Col>
                    <Col span={12}>

                        <FormControl sx={{ width: "99%" }} required>
                            <InputLabel id="demo-simple-select-label">To</InputLabel>

                            <Select
                                error={toTime.length === 0}
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select-lable"
                                value={toTime}
                                label={'To'}
                                size='medium'

                                onChange={handleToTimeChange}
                            >
                                {timeInterval.slice(timeInterval.indexOf(fromTime) + 1).map((time) => {
                                    return (
                                        <MenuItem key={time} value={time}>
                                            {time}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <FormHelperText>{toTime.length === 0 ? 'select to time' : ''}</FormHelperText>
                        </FormControl>
                    </Col>
                </Row>


            </Box>
        </FormControl>
    );
}
