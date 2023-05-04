import { Box, FormControl, RadioGroup, FormControlLabel, FormLabel, InputLabel } from '@mui/material';
import { Typography, Button, Select, Radio } from '@mui/material';
import { MenuItem, TextField } from '@mui/material';
import { months, weekdays } from 'moment';
import React from 'react';
import { days } from '../../../manager/containers/TeamRosterScreen/data/dummyData';

interface Props {
    selectedDate: any;
    selectedMultipleDays: any;
    setSelectMultipleDays: any;
    handleMultipleSelectedDays: any;
    addMoreDays: any;
    handleAddMoreDaysChange: any;
    typeOfRepeat: any;
    handleTypeOfRepeatChange: any;
    NoOfRepeat: any;
    handleNoOfRepeatChange: any;
}
export default function MultipleDayForm(props: Props) {
    const {
        selectedDate,
        selectedMultipleDays,
        setSelectMultipleDays,
        handleMultipleSelectedDays,
        addMoreDays,
        handleAddMoreDaysChange,
        typeOfRepeat,
        handleTypeOfRepeatChange,
        NoOfRepeat,
        handleNoOfRepeatChange,
    } = props;

    React.useEffect(() => {
        setSelectMultipleDays([selectedDate.weekday()]);
    }, []);
    return (
        <Box
            sx={{
                width: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: 'space-between',
                padding: 1,
                maxHeight: '40vh',
            }}
        >
            <Box sx={{ width: 0.8, margin: 1, paddingY: 1 }}>
                <Typography sx={{ color: '#B32328', textAlign: 'start' }}>Add more days</Typography>

                <Box sx={{ display: 'flex', width: 1, marginY: 1, justifyContent: 'space-between' }}>
                    {days.map((value, id) => (
                        <Button
                            className="multiday-day-button"
                            sx={{
                                width: '40px',
                                minWidth: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: selectedMultipleDays.indexOf(id) === -1 ? `#F6F6F6` : `#B32328`,
                                color:
                                    selectedMultipleDays.indexOf(id) === -1
                                        ? `rgba(0, 0, 0, 0.38)`
                                        : `rgba(196, 196, 196, 1)`,
                                textTransform: 'capitalize',
                            }}
                            key={id}
                            onClick={() => handleMultipleSelectedDays(id)}
                            variant="contained"
                            color={selectedMultipleDays.indexOf(id) === -1 ? 'info' : 'error'}
                        >
                            {value}
                        </Button>
                    ))}
                </Box>
            </Box>
            {/* <FormControl error>
                <InputLabel id="demo-simple-select-error-label">Add More</InputLabel>
                <Select
                    labelId="demo-simple-select-error-label"
                    id="demo-simple-select-error"
                    label="Add More"
                    sx={{ width: 0.8, margin: 1, color: '#d32f2f' }}
                    value={addMoreDays}
                    onChange={handleAddMoreDaysChange}
                >
                    <MenuItem value={'add more days'}>add more days</MenuItem>
                    <MenuItem value={'add more weeks'}>add more weeks</MenuItem>
                </Select>
            </FormControl> */}
            <Box sx={{ width: 0.8, margin: 1, paddingY: 1 }}>
                <Typography sx={{ color: 'black', textAlign: 'start', marginBottom: '12px' }}>
                    How often should the event repeat?
                </Typography>
                <RadioGroup
                    row
                    onChange={handleTypeOfRepeatChange}
                    sx={{ justifyContent: 'space-between', color: '#000' }}
                    value={typeOfRepeat}
                    color="error"
                >
                    <FormControlLabel value="never" control={<Radio color="error" />} label="Never" />
                    <FormControlLabel value="weekly" control={<Radio color="error" />} label="Weekly" />
                    <FormControlLabel value="monthly" control={<Radio color="error" />} label="Monthly" />
                </RadioGroup>
            </Box>

            <FormControl>
                <Typography sx={{ width: 0.8, margin: 1, textAlign: 'start' }}>
                    {/* Event stops after how many recurrings? */}
                </Typography>
                <TextField
                    sx={{ width: 0.8, margin: 1 }}
                    id="outlined"
                    label="No. of recurrence"
                    value={NoOfRepeat}
                    type="number"
                    onChange={handleNoOfRepeatChange}
                ></TextField>
            </FormControl>
        </Box>
    );
}
