import { FormControlLabel, Radio, RadioGroup, ToggleButton } from '@mui/material';
import Box from '@mui/material/Box';
import { Button } from 'antd';
import React from 'react';
import RoasterCalender from '../RosterCalendar/RoasterCalender';
import MultipleDayForm from '../RosterDashComponent/MultipleDayForm';
import { floors, roomsData } from '../../../manager/containers/TeamRosterScreen/data/dummyData';
import ConferenceForm from './ConferenceForm';
import ScreenInvite from './screenInvite';
import ScreenRequirements from './screenRequirements';
import ScreenRoom from './screenRoom';
import { useDispatch, useSelector } from 'react-redux';
import { ConferenceActions } from '../../../manager/store/actions/ConferenceAction';
import {
    postConferenceRoomBookResponse,
    postConferenceRoomBookFetching,
    postConferenceRoomBookError,
} from '../../../manager/store/reducers/PostConferenceRoomReducer';
import { conferenceRoomDataResponse } from '../../../manager/store/reducers/ConferenceRoomReducer';
import ConfirmationModal from '../confirmationModal';

interface invite {
    first_name: String;
    last_name: String;
    phone: number | null;
    email: String;
}
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
interface Props {
    handleMultipleSelectedDateDays: (date: moment.Moment | null) => void;
    clearSelectedData: () => void;
    disableComponents: boolean;
    isMultiple: boolean;
    selectedMultipleDate: any[];
    currMonthDate: any;
    selectedDateNew: any;
    handleCalenderBack: any;
    activeMonth: any;
    handleCalenderNext: any;
    title: string;
    handleTitleChange: any;
    teamSize?: string;
    handleRadioChange: any;
    floor: any;
    handleFloorChange: any;
    fromTime: any;
    handleFromTimeChange: any;
    toTime: any;
    handleToTimeChange: any;
    rsvp: any;
    handleRsvpChange: any;
    conferenceRosterType: String;
    handleConferenceRosterType: any;

    selectedMultipleDays: any;
    setSelectMultipleDays: any;
    handleMultipleSelectedDays: any;
    addMoreDays: any;
    handleAddMoreDaysChange: any;
    typeOfRepeat: any;
    handleTypeOfRepeatChange: any;
    noOfRepeat: any;
    handleNoOfRepeatChange: any;

    roomData?: room[];
    roomNumber: any;
    handleroomNumberChange: any;

    specialRequirements: any;
    handleaddSpecialRequirementsChange: any;
    handlespecialRequirementsChange: any;
    handleaddSpecialRequirementCrossButton: any;

    technicalRequirements: any;
    handletechnicalRequirementsChange: any;
    handleaddtechnicalRequirementsChange: any;
    handletechRequirementCrossButton: any;

    invites: invite[];
    handleinviteNameChange: any;
    handleinvitesurNameChange: any;
    handleinvitePhoneChange: any;
    handleinviteEmailChange: any;
    handleaddinviteButton: any;
    handleInvitesCrossButton: any;

    handleConferenceRoomSubmit: any;
}

// 1- main dashboardDetail
// 2 - screenRoom
//  3- screenRequirement
// 4- screenInvite

interface ErrorSingle {
    title: string;
    fromTime: string;
    toTime: string;
    rsvp: string;
}
interface ErrorRoom {
    floor: string;
    room: string;
}

export default function ConferenceDash(props: Props) {
    const dispatch = useDispatch();



    const [isProcessing, setProcessing] = React.useState(false);
    const [controlConferenceView, setControlConferenceView] = React.useState(1);
    const {
        clearSelectedData,
        handleMultipleSelectedDateDays,
        disableComponents,
        isMultiple,
        selectedMultipleDate,
        currMonthDate,
        selectedDateNew,
        handleCalenderBack,
        handleCalenderNext,
        activeMonth,
        title,
        handleTitleChange,
        teamSize,
        handleRadioChange,
        floor,
        handleFloorChange,
        fromTime,
        handleFromTimeChange,
        toTime,
        handleToTimeChange,
        rsvp,
        handleRsvpChange,
        conferenceRosterType,
        handleConferenceRosterType,
        selectedMultipleDays,
        setSelectMultipleDays,
        handleMultipleSelectedDays,
        addMoreDays,
        handleAddMoreDaysChange,
        typeOfRepeat,
        handleTypeOfRepeatChange,
        noOfRepeat,
        handleNoOfRepeatChange,
        roomNumber,
        handleroomNumberChange,

        specialRequirements,
        handleaddSpecialRequirementsChange,
        handlespecialRequirementsChange,
        handleaddSpecialRequirementCrossButton,

        technicalRequirements,
        handletechnicalRequirementsChange,
        handleaddtechnicalRequirementsChange,
        handletechRequirementCrossButton,

        invites,
        handleinviteNameChange,
        handleinvitesurNameChange,
        handleinvitePhoneChange,
        handleinviteEmailChange,
        handleaddinviteButton,
        handleInvitesCrossButton,

        handleConferenceRoomSubmit,
    } = props;

    const [errorSingle, setErrorSingle] = React.useState<ErrorSingle>({
        title: '',
        toTime: '',
        fromTime: '',
        rsvp: '',
    });

    const [errorRoom, setErrorRoom] = React.useState<ErrorRoom>({
        floor: '',
        room: '',
    });
    const [isRoomLoading, setRoomLoading] = React.useState(false);
    // const [ROOMDATA, SetROOMDATA] = React.useState<any>();
    let ROOMDATA: any = [];
    let ROOMDATA_1: any = useSelector(conferenceRoomDataResponse);

    const [fillSingleDayDetails, setfillSingleDayDetails] = React.useState(false);
    const [selectRoomNumber, setSelectRoomNumber] = React.useState(false);

    if (ROOMDATA_1?.data) {
        let data = ROOMDATA_1.data;
        let flag = true;
        if (flag && data && data.length > 0) {
            // console.log(data);
            // SetROOMDATA(data);
            // setRoomLoading(false);
            ROOMDATA = data;
            flag = false;
        }
    }

    const checkSingleFormData = (): boolean => {
        let error = errorSingle;
        let flag = true;
        if (title === '') {
            flag = false;
            error.title = 'Enter Title';
        } else {
            error.title = '';
        }

        if (fromTime === '') {
            flag = false;
            error.fromTime = 'Select from time';
        } else {
            error.fromTime = '';
        }

        if (toTime === '') {
            flag = false;
            error.toTime = 'Select To time';
        } else {
            error.toTime = '';
        }

        setErrorSingle(error);
        return flag;
    };
    const checkRoomFormData = (): boolean => {
        let flag = true;
        let error: ErrorRoom = {
            floor: '',
            room: '',
        };
        if (typeof floor === 'undefined') {
            flag = false;
            error.floor = 'Select Floor Number';
        }
        if (typeof roomNumber === 'undefined' || roomNumber === null) {
            flag = false;
            error.room = 'Select Room Number';
        }
        // console.log(error);
        setErrorRoom(error);
        return flag;
    };

    const postConferenceRoomRequest = (floorNumber: number) => {
        setRoomLoading(true);
        let date = selectedDateNew.date() + '/' + (selectedDateNew.month() + 1) + '/' + selectedDateNew.year();
        let team_size = teamSize?.split('-') as any;
        const weekdays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
        let week_days = selectedMultipleDays.map((day: number) => {
            return weekdays[day];
        });
        let reqData = {
            start_date: date,
            start_time: fromTime,
            end_time: toTime,
            floor_number: floorNumber,
            team_size: {
                min: parseInt(team_size[0]),
                max: parseInt(team_size[1]),
            },
            number_of_events: noOfRepeat,
            frequency_type: typeOfRepeat,
            week_days: week_days,
        };
        dispatch(ConferenceActions.postConferenceRoomRequest(reqData));
    };
    const handleNextSubmitConferenceButton = () => {
        let flag = true;
        switch (controlConferenceView) {
            case 1:
                if (conferenceRosterType === 'single') {
                    flag = checkSingleFormData();
                    if (flag) {
                        postConferenceRoomRequest(floor);
                    } else {
                        setfillSingleDayDetails(true);
                    }
                }
                break;
            case 2:
                flag = checkRoomFormData();
                if (!flag) {
                    setSelectRoomNumber(true);
                }
                break;
            default:
                break;
        }

        if (flag && controlConferenceView != 4) {
            setControlConferenceView(controlConferenceView + 1);
        }

        if (flag && controlConferenceView === 4) {
            setProcessing(true);
            handleConferenceRoomSubmit();
        }
    };

    const handleBackButtonConference = () => {
        if (controlConferenceView !== 1) {
            setControlConferenceView(controlConferenceView - 1);
        }
    };

    function fillSingleDayPopUp() {
        setfillSingleDayDetails(false);
    }

    function selectRoomToggle() {
        setSelectRoomNumber(false);
    }


    function handleSingleMultidayToggle(e: any) {
        if (!checkSingleFormData()) {
            setfillSingleDayDetails(true);
        } else {
            handleConferenceRosterType(e);
        }
    }
    return (
        <Box
            sx={{
                display: 'flex',
                width: 0.7,
                flexDirection: 'column',
                background: '#ffffff',
                height: '73vh',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                position: 'relative',
                paddingTop: '100px',
            }}
        >
            {controlConferenceView === 1 ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'stretch',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: 1 }}>
                        <RoasterCalender
                            handleMultipleSelectedDateDays={handleMultipleSelectedDateDays}
                            clearSelectedData={clearSelectedData}
                            disableComponents={disableComponents}
                            isMultiple={isMultiple}
                            selectedSingleDate={selectedDateNew}
                            selectedMultipleDate={selectedMultipleDate}
                            selectedDateNew={selectedDateNew}
                            currMonthDate={currMonthDate}
                            handleCalenderBack={handleCalenderBack}
                            handleCalenderNext={handleCalenderNext}
                            activeMonth={activeMonth}
                        />
                        {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <RadioGroup
                                row
                                sx={{ justifyContent: 'space-between' }}
                                value={conferenceRosterType}
                                onChange={handleSingleMultidayToggle}
                                color="error"
                            >
                                <FormControlLabel
                                    sx={{ margin: 2 }}
                                    value="single"
                                    control={<Radio color="error" />}
                                    label="Single Day"
                                />
                                <FormControlLabel
                                    sx={{ margin: 2 }}
                                    value="multiple"
                                    control={<Radio color="error" />}
                                    label="Multiple Day"
                                />
                            </RadioGroup>
                        </Box> */}
                    </Box>
                    <Box sx={{ width: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <RadioGroup
                                row
                                sx={{ justifyContent: 'space-between' }}
                                value={conferenceRosterType}
                                onChange={handleSingleMultidayToggle}
                                color="error"
                            >
                                <FormControlLabel
                                    sx={{ margin: 2 }}
                                    value="single"
                                    control={<Radio color="error" />}
                                    label="Single Day"
                                />
                                <FormControlLabel
                                    sx={{ margin: 2 }}
                                    value="multiple"
                                    control={<Radio color="error" />}
                                    label="Multiple Day"
                                />
                            </RadioGroup>
                        </Box>
                        {conferenceRosterType === 'single' ? (
                            <ConferenceForm
                                title={title}
                                handleTitleChange={handleTitleChange}
                                teamSize={teamSize}
                                handleRadioChange={handleRadioChange}
                                fromTime={fromTime}
                                handleFromTimeChange={handleFromTimeChange}
                                toTime={toTime}
                                handleToTimeChange={handleToTimeChange}
                                rsvp={rsvp}
                                handleRsvpChange={handleRsvpChange}
                                error={errorSingle}
                            />
                        ) : (
                            <MultipleDayForm
                                selectedDate={selectedDateNew}
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
                        )}
                    </Box>
                </Box>
            ) : (
                <></>
            )}

            {controlConferenceView === 2 ? (
                <ScreenRoom
                    error={errorRoom}
                    roomsData={ROOMDATA}
                    roomNumber={roomNumber}
                    handleroomNumberChange={handleroomNumberChange}
                    floor={floor}
                    handleFloorChange={handleFloorChange}
                    floors={floors}
                    postConferenceRoomRequest={postConferenceRoomRequest}
                />
            ) : (
                <></>
            )}

            {controlConferenceView === 3 ? (
                <ScreenRequirements
                    specialRequirements={specialRequirements}
                    handleaddSpecialRequirementsChange={handleaddSpecialRequirementsChange}
                    handlespecialRequirementsChange={handlespecialRequirementsChange}
                    handleaddSpecialRequirementCrossButton={handleaddSpecialRequirementCrossButton}
                    technicalRequirements={technicalRequirements}
                    handleaddtechnicalRequirementsChange={handleaddtechnicalRequirementsChange}
                    handletechnicalRequirementsChange={handletechnicalRequirementsChange}
                    handletechRequirementCrossButton={handletechRequirementCrossButton}
                />
            ) : (
                <></>
            )}

            {controlConferenceView === 4 ? (
                <ScreenInvite
                    invites={invites}
                    handleinviteNameChange={handleinviteNameChange}
                    handleinvitesurNameChange={handleinvitesurNameChange}
                    handleinvitePhoneChange={handleinvitePhoneChange}
                    handleinviteEmailChange={handleinviteEmailChange}
                    handleaddinviteButton={handleaddinviteButton}
                    handleInvitesCrossButton={handleInvitesCrossButton}
                />
            ) : (
                <></>
            )}

            <Box sx={{ display: 'flex', width: 1, justifyContent: 'center', position: 'absolute', bottom: 30 }}>
                <Button style={{ margin: '2px' }} disabled={isProcessing} type="primary" onClick={handleNextSubmitConferenceButton}>
                    {controlConferenceView != 4 ? 'Next' : 'Submit'}
                </Button>
                <Button style={{ margin: '2px' }} onClick={handleBackButtonConference}>
                    {controlConferenceView != 1 ? 'Back' : 'Cancel'}
                </Button>
            </Box>
            {fillSingleDayDetails && (
                <ConfirmationModal
                    closeComfirmationPopUp={fillSingleDayPopUp}
                    displayMessage={`Fill All Form Details`}
                />
            )}

            {selectRoomNumber && (
                <ConfirmationModal closeComfirmationPopUp={selectRoomToggle} displayMessage={`Select Room `} />
            )}


        </Box>
    );
}


