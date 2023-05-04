import Box from '@mui/material/Box';
import { Button } from 'antd';
import React from 'react';
import ScreenInvite from '../ConferenceComponent/screenInvite';
import ConfirmationModal from '../confirmationModal';
import RoasterCalender from '../RosterCalendar/RoasterCalender';
import MultipleDayForm from './MultipleDayForm';


interface invite {
    first_name: String;
    last_name: String;
    phone: number | null;
    email: String;
}
interface Props {
    selectedDateNew: any;
    selectedMultipleDays: any;
    setSelectMultipleDays: any;
    handleMultipleSelectedDays: any;
    addMoreDays: any;
    handleAddMoreDaysChange: any;
    typeOfRepeat: any;
    handleTypeOfRepeatChange: any;
    noOfRepeat: any;
    handleNoOfRepeatChange: any;
    handleMultipleSelectedDateDays: (date: moment.Moment | null) => void;
    clearSelectedData: () => void;
    disableComponents: boolean;
    isMultiple: boolean;
    selectedSingleDate: any;
    selectedMultipleDate: any[];
    currMonthDate: any;
    handleCalenderBack: any;
    activeMonth: any;
    handleCalenderNext: any;
    handleMultipleDayRoster: any;
    invites: invite[];
    handleinviteNameChange: any;
    handleinvitesurNameChange: any;
    handleinvitePhoneChange: any;
    handleinviteEmailChange: any;
    handleaddinviteButton: any;
    handleInvitesCrossButton: any;
    handleRosterGuestSubmit: () => any;

}
export default function RosterGuestScreen(props: Props) {
    const {
        clearSelectedData,
        handleMultipleSelectedDateDays,
        disableComponents,
        isMultiple,
        selectedMultipleDate,
        currMonthDate,
        handleCalenderBack,
        handleCalenderNext,
        activeMonth,
        selectedDateNew,
        selectedMultipleDays,
        setSelectMultipleDays,
        handleMultipleSelectedDays,
        addMoreDays,
        handleAddMoreDaysChange,
        typeOfRepeat,
        handleTypeOfRepeatChange,
        noOfRepeat,
        handleNoOfRepeatChange,
        handleMultipleDayRoster,
        invites,
        handleinviteNameChange,
        handleinvitesurNameChange,
        handleinvitePhoneChange,
        handleinviteEmailChange,
        handleaddinviteButton,
        handleInvitesCrossButton,
        handleRosterGuestSubmit,
    } = props;


    const [controlConferenceView, setControlConferenceView] = React.useState(1);
    const [openGuestToggle, setOpenGuestToggle] = React.useState(false);
    const handleBackButtonConference = () => {
        if (controlConferenceView !== 1) {
            setControlConferenceView(controlConferenceView - 1);
        }
    };

    function checkEmptyInvites(): boolean {

        for (let i = 0; i < invites.length; i++) {
            if (invites[i].first_name.length < 1 || invites[i].email.length < 1 || invites[i].last_name.length < 1) {
                return false;
            }
        }
        return true;

    }

    const handleNextSubmitConferenceButton = () => {
        let flag = true;
        switch (controlConferenceView) {
            case 1:
                setControlConferenceView((val) => val + 1);
                break;
            default:
                break;
        }
        if (!checkEmptyInvites() && controlConferenceView === 2) {
            setOpenGuestToggle(true);
        }
        if (checkEmptyInvites() && controlConferenceView === 2) {
            handleRosterGuestSubmit();
        }
    };
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
            {
                controlConferenceView === 1 && (<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'flex-start' }}>
                    <RoasterCalender
                        handleMultipleSelectedDateDays={handleMultipleSelectedDateDays}
                        clearSelectedData={clearSelectedData}
                        disableComponents={disableComponents}
                        isMultiple={isMultiple}
                        selectedSingleDate={selectedDateNew}
                        selectedDateNew={selectedDateNew}
                        selectedMultipleDate={selectedMultipleDate}
                        currMonthDate={currMonthDate}
                        handleCalenderBack={handleCalenderBack}
                        handleCalenderNext={handleCalenderNext}
                        activeMonth={activeMonth}
                    />
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
                </Box>)
            }

            {
                controlConferenceView === 2 && (
                    <ScreenInvite
                        invites={invites}
                        handleinviteNameChange={handleinviteNameChange}
                        handleinvitesurNameChange={handleinvitesurNameChange}
                        handleinvitePhoneChange={handleinvitePhoneChange}
                        handleinviteEmailChange={handleinviteEmailChange}
                        handleaddinviteButton={handleaddinviteButton}
                        handleInvitesCrossButton={handleInvitesCrossButton}
                    />
                )
            }
            <Box sx={{ display: 'flex', width: 1, justifyContent: 'center', position: 'absolute', bottom: 30 }}>
                <Button style={{ margin: '2px' }} type="primary" onClick={handleNextSubmitConferenceButton}>
                    {controlConferenceView != 2 ? 'Next' : 'Submit'}
                </Button>
                <Button style={{ margin: '2px' }} onClick={handleBackButtonConference}>
                    {controlConferenceView != 1 ? 'Back' : 'Cancel'}
                </Button>
            </Box>
            {openGuestToggle && (
                <ConfirmationModal closeComfirmationPopUp={() => setOpenGuestToggle(false)} displayMessage={"fill valid details of Guest"} />
            )}
        </Box>
    );
}

export { };
