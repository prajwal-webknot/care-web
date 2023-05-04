import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box, Typography, Button } from '@mui/material';
import { months } from 'moment';
import React from 'react';
import CalendarComponentNew from './calendarComponentNew';

interface Props {
    handleMultipleSelectedDateDays: (date: moment.Moment | null) => void;
    clearSelectedData: () => void;
    disableComponents: boolean;
    isMultiple?: boolean;
    selectedSingleDate: any;
    selectedMultipleDate: any[];
    currMonthDate: any;
    selectedDateNew: any;
    handleCalenderBack: any;
    activeMonth: any;
    handleCalenderNext: any;
}
function RoasterCalender(props: Props) {
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
    } = props;
    return (
        <Box
            sx={{
                display: 'flex',
                width: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: 0.85,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 2,
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: '14px',
                }}
            >
                <Button size="small" onClick={handleCalenderBack}>
                    <KeyboardArrowLeft />
                </Button>
                {months(activeMonth)} {selectedDateNew.year()}
                <Button
                    size="small"
                    onClick={handleCalenderNext}
                    // disabled={activeMonth === maxSteps - 1}
                >
                    <KeyboardArrowRight />
                </Button>
            </Box>

            {/* {
                                isMultiple if true then capeble of selecting multiple days on calender
                            } */}
            <Box sx={{ width: 1 }}>
                <CalendarComponentNew
                    handleSelectedDate={handleMultipleSelectedDateDays}
                    clearSelectedData={clearSelectedData}
                    disableComponents={disableComponents}
                    isMultiple={false}
                    selectedSingleDate={selectedDateNew}
                    selectedMultipleDate={selectedMultipleDate}
                    currMonthDate={currMonthDate}
                />
            </Box>
        </Box>
    );
}

export default RoasterCalender;
