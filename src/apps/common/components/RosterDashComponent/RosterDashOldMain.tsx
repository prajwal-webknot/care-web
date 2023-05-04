import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import { Typography } from '@mui/material';
import EmployData, { EmpData } from '../../../manager/containers/TeamRosterScreen/data/dummyData';
import React, { useState } from 'react';
import moment, { months } from 'moment';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { MANAGER_DASHBOARD } from '../../constants/constants';
import CalendarComponent from '../RosterCalendar/calendarComponentNew';
import AddConferenceForm from '../ConferenceComponent/AddConferenceForm';
import ConferenceForm from '../ConferenceComponent/ConferenceForm';
import MultipleDayForm from './MultipleDayForm';
import TeamForm from './TeamForm';
import CalendarComponentNew from '../RosterCalendar/calendarComponentNew';
import SubHeader from '../SubHeader/SubHeader';
export interface GeneratePassRequestElement {
    date: number;
    user: number;
    status: boolean;
}

export interface GeneratePassRequest extends Array<GeneratePassRequestElement> {}
export default function RosterDash() {
    const [rosterFor, setRosterFor] = React.useState('team');
    const [rosteringFor, setRosteringFor] = React.useState('singleDay');
    const [addConference, setAddConference] = React.useState(false);
    const [addConferenceForm, setAddConferenceForm] = React.useState(false);

    const [employIDs, setEmployIDs] = React.useState([]) as any;
    const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment().startOf('day').add(1, 'day'));

    const [addMoreDays, setAddMoreDays] = React.useState('add more days');
    const [typeOfRepeat, setTypeOfRepeat] = React.useState('never');
    const [selectedMultipleDate, setSelectMultipleDate] = useState<moment.Moment[] | null>([]) as any;
    const [selectedMultipleDays, setSelectMultipleDays] = React.useState<number[]>([]);
    const [noOfRepeat, setNoOfRepeat] = React.useState();

    const [isEditable, setIsEditable] = useState(true);

    const [title, settitle] = React.useState('');
    const [teamSize, setteamSize] = React.useState('');
    const [floor, setfloor] = React.useState('');
    const [fromTime, setfromTime] = React.useState('');
    const [toTime, settoTime] = React.useState('');
    const [rsvp, setrsvp] = React.useState('');
    // const [backParent, setbackParent] = React.useState(MANAGER_DASHBOARD);
    const [activeMonth, setActiveMonth] = React.useState(moment().month());
    const [currMonthDate, setcurrMonthDate] = React.useState(moment().startOf('day').add(1, 'day'));
    const maxSteps = 12;

    const handleCalenderNext = () => {
        if (activeMonth === 11) {
            setActiveMonth(-1);
        }
        setActiveMonth((prevActiveMonth) => prevActiveMonth + 1);
        let date = selectedDate.startOf('day').add(1, 'M');
        setcurrMonthDate(date);
    };

    const handleCalenderBack = () => {
        if (activeMonth === 0) {
            setActiveMonth(12);
        }
        setActiveMonth((prevActiveMonth) => prevActiveMonth - 1);
        let date = selectedDate.startOf('day').subtract(1, 'M');
        setcurrMonthDate(date);
    };

    const handleEmployIDsToggle = (value: number) => () => {
        const currentIndex = employIDs.indexOf(value);
        const newChecked = [...employIDs];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setEmployIDs(newChecked);
    };
    const handleEmployIDsChange = (event: any) => {
        const {
            target: { value },
        } = event;
        setEmployIDs(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleRosterForChange = (event: any) => {
        let value = event.target.value;
        setRosterFor(value);
    };
    const handleRosteringForChange = (event: any) => {
        let value = event.target.value;
        setRosteringFor(value);
    };

    const handleRadioChange = (event: any) => {
        let value = event.target.value;
        setteamSize(value);
    };
    const handleTitleChange = (event: any) => {
        let value = event.target.value;
        settitle(value);
    };

    const handleFloorChange = (event: any) => {
        let value = event.target.value;
        setfloor(value);
    };

    const handleToTimeChange = (event: any) => {
        let value = event.target.value;
        settoTime(value);
    };
    const handleFromTimeChange = (event: any) => {
        let value = event.target.value;
        setfromTime(value);
    };
    const handleRsvpChange = (event: any) => {
        let value = event.target.value;
        setrsvp(value);
    };

    const [disableComponents, setdisableComponents] = useState(true);

    const handleAddConference = () => {
        setAddConference(!addConference);
    };
    const handleSelectedDate = (date: any) => {
        setSelectedDate(date);
        date?.isSameOrBefore(moment(), 'date') ? setIsEditable(false) : setIsEditable(true);
    };

    const handleMultipleSelectedDateDays = (date: any) => {
        setActiveMonth(date.month());
        let dates = [...selectedMultipleDate];
        selectedMultipleDate.indexOf(date);
        if (rosteringFor === 'singleDay') {
            setSelectedDate(date);
        } else {
            let isPresent = false;
            let i = 0;
            for (; i < selectedMultipleDays.length; i++) {
                if (selectedMultipleDate[i]?.isSame(date, 'date')) {
                    isPresent = true;
                    break;
                }
            }

            if (!isPresent) {
                dates.push(date);
            } else {
                dates.splice(i, 1);
            }
            setSelectMultipleDays(dates);
        }

        // date?.isSameOrBefore(moment(), "date")
        //     ? setIsEditable(false)
        //     : setIsEditable(true);
    };

    const handleMultipleSelectedDays = (dayIndex: number) => {
        let days = [...selectedMultipleDays];
        if (days.indexOf(dayIndex) === -1) {
            days.push(dayIndex);
        } else {
            days.splice(days.indexOf(dayIndex), 1);
        }
        setSelectMultipleDays(days);
    };

    const handleNoOfRepeatChange = (event: any) => {
        let value = event.target.value;
        setNoOfRepeat(value);
    };

    const [searchValue, setSearchValue] = React.useState('');

    function clearSelectedData() {
        // setSelectedDate(null);
        setEmployIDs([]);
        setSearchValue('');
    }

    const handleAddMoreDaysChange = (e: any) => {
        let value = e.target.value;
        setAddMoreDays(value);
    };

    const handleTypeOfRepeatChange = (e: any) => {
        let value = e.target.value;
        setTypeOfRepeat(value);
    };

    const handleFormCheck = () => {
        let error = [];
        if (title === '') {
            error.push('title');
        }
        if (teamSize === '') {
            error.push('teamSize');
        }
        if (fromTime === '') {
            error.push('fromTime');
        }
        if (toTime === '') {
            error.push('toTime');
        }
        if (floor === '') {
            error.push('floor');
        }
        if (rsvp === '') {
            error.push('rsvp');
        }

        if (error.length === 0) {
            setAddConferenceForm(true);
        } else {
            alert(error);
        }
    };

    const handleGeneratePassRequest = () => {
        if (employIDs.length === 0) {
            alert('select team member');
        } else {
            if (rosteringFor === 'singleDay') {
                let generatePassRequest: GeneratePassRequest = employIDs.map((emp: any) => {
                    return {
                        date: selectedDate.toISOString(),
                        user: emp,
                        status: false,
                    };
                });

                console.log(generatePassRequest);
            } else {
                const weekdays = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
                let week_days = selectedMultipleDays.map((day) => {
                    return weekdays[day];
                });

                let reqJson = {
                    frequency_type: typeOfRepeat,
                    number_of_events: noOfRepeat,
                    start_date: selectedDate.date(),
                    users_details: employIDs,
                    week_days: week_days,
                };
                console.log(reqJson);
            }
        }
    };

    const handleNextOrGenerateButton = () => {
        if (addConference) {
            handleFormCheck();
        } else {
            handleGeneratePassRequest();
        }
    };

    return (
        <Box
            sx={{
                width: 1,
                minHeight: '100vh',
                flexDirection: 'column',
                color: '#000000',
                bgcolor: '#E8F3F4',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            <Box sx={{ display: 'flex', width: 0.8 }}>
                <SubHeader title="Roaster" parent={MANAGER_DASHBOARD} />
            </Box>

            {addConferenceForm ? (
                <AddConferenceForm></AddConferenceForm>
            ) : (
                <Box
                    sx={{
                        width: 0.95,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '80vh',
                        bgcolor: '#FFFFFF',
                        borderRadius: '20px',
                        paddingY: '5vh',
                    }}
                >
                    <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-around' }}>
                        <Box sx={{ width: 1, margin: 1 }}>
                            <Box sx={{ display: 'flex', color: 'black', justifyContent: 'center' }}>
                                <FormControl sx={{ minWidth: 200, margin: 1 }}>
                                    <InputLabel id="demo-simple-select-secondary-label">Roster For</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-secondary-label"
                                        id="demo-simple-select-secondary"
                                        value={rosterFor}
                                        label={'Roster For'}
                                        onChange={handleRosterForChange}
                                    >
                                        {/* <MenuItem value={'myself'}>Myself</MenuItem> */}
                                        <MenuItem value={'team'}>Team</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ minWidth: 200, margin: 1 }}>
                                    <InputLabel id="demo-simple-select-label">Rostering For</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={rosteringFor}
                                        label="Rostering For"
                                        onChange={handleRosteringForChange}
                                    >
                                        <MenuItem value={'singleDay'}>SingleDay</MenuItem>
                                        <MenuItem value={'multipleDays'}>Multiple Days</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    width: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Box sx={{ width: rosterFor === 'team' || addConference ? 0.5 : 0.3 }}>
                                    <Typography
                                        sx={{
                                            width: 1,
                                            marginLeft: 3,
                                            marginTop: 1,
                                            color: 'black',
                                            textAlign: 'start',
                                        }}
                                    >
                                        Select roaster for {rosterFor === 'team' ? 'team' : 'yourself'}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            width: 1,
                                            margin: 'auto',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Button size="small" onClick={handleCalenderBack}>
                                            <KeyboardArrowLeft />
                                        </Button>
                                        {months(activeMonth)}
                                        <Button
                                            size="small"
                                            onClick={handleCalenderNext}
                                            // disabled={activeMonth === maxSteps - 1}
                                        >
                                            <KeyboardArrowRight />
                                        </Button>
                                    </Box>
                                </Box>

                                {/* {
                                isMultiple if true then capeble of selecting multiple days on calender
                            } */}
                                <CalendarComponentNew
                                    handleSelectedDate={handleMultipleSelectedDateDays}
                                    clearSelectedData={clearSelectedData}
                                    disableComponents={disableComponents}
                                    isMultiple={false}
                                    selectedSingleDate={selectedDate}
                                    selectedMultipleDate={selectedMultipleDate}
                                    currMonthDate={currMonthDate}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography sx={{ color: 'green' }}> You can roaster for that day </Typography>
                                <FormControlLabel
                                    control={<Switch value={addConference} onChange={handleAddConference} />}
                                    label="Add Conference Room"
                                />
                            </Box>
                        </Box>

                        {rosterFor === 'team' && !addConference ? (
                            <TeamForm
                                employIDs={employIDs}
                                handleEmployIDsChange={handleEmployIDsChange}
                                handleEmployIDsToggle={handleEmployIDsToggle}
                            />
                        ) : (
                            <></>
                        )}
                        {rosteringFor === 'multipleDays' && !addConference ? (
                            <MultipleDayForm
                                selectedDate={selectedDate}
                                selectedMultipleDays={selectedMultipleDays}
                                setSelectMultipleDays={setSelectMultipleDays}
                                handleMultipleSelectedDays={handleMultipleSelectedDays}
                                addMoreDays={addMoreDays}
                                handleAddMoreDaysChange={handleAddMoreDaysChange}
                                typeOfRepeat={typeOfRepeat}
                                handleTypeOfRepeatChange={handleTypeOfRepeatChange}
                                NoOfRepeat={noOfRepeat}
                                handleNoOfRepeatChange={handleNoOfRepeatChange}
                            />
                        ) : (
                            <></>
                        )}

                        {addConference ? (
                            <ConferenceForm
                                title={title}
                                handleTitleChange={handleTitleChange}
                                handleRadioChange={handleRadioChange}
                                floor={floor}
                                handleFloorChange={handleFloorChange}
                                fromTime={fromTime}
                                handleFromTimeChange={handleFromTimeChange}
                                toTime={toTime}
                                handleToTimeChange={handleToTimeChange}
                                rsvp={rsvp}
                                handleRsvpChange={handleRsvpChange}
                            />
                        ) : (
                            <></>
                        )}
                    </Box>

                    <Button sx={{ width: 320 }} color="error" variant="contained" onClick={handleNextOrGenerateButton}>
                        {addConference ? 'next' : 'Generate Day Pass'}
                    </Button>
                </Box>
            )}
        </Box>
    );
}
