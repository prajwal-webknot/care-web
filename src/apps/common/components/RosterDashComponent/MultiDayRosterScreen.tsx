import Box from '@mui/material/Box';
import { Button } from 'antd';
import React from 'react';
import CalendarComponentNew from '../RosterCalendar/calendarComponentNew';
import RoasterCalender from '../RosterCalendar/RoasterCalender';
import MultipleDayForm from './MultipleDayForm';

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
}
export default function MultiDayRosterScreen(props: Props) {
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
    } = props;
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
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'flex-start' }}>
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
            </Box>
            <Box sx={{ display: 'flex', width: 1, justifyContent: 'center', position: 'absolute', bottom: 30 }}>
                <Button style={{ margin: '2px' }} type="primary" onClick={handleMultipleDayRoster}>
                    Save
                </Button>
                <Button style={{ margin: '2px' }}>Cancel</Button>
            </Box>
        </Box>
    );
}

export { };
