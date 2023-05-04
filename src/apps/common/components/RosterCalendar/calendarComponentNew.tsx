import React, { useState } from 'react';
import { Calendar, Button } from 'antd';
import moment from 'moment';
import './calender.scss';

interface Props {
    handleSelectedDate: (date: moment.Moment | null) => void;
    clearSelectedData: () => void;
    disableComponents: boolean;
    isMultiple: boolean;
    selectedSingleDate: any;
    selectedMultipleDate: any[];
    currMonthDate: any;
}
export default function CalendarComponentNew(props: Props) {
    const {
        clearSelectedData,
        handleSelectedDate,
        disableComponents,
        isMultiple,
        selectedSingleDate,
        selectedMultipleDate,
        currMonthDate,
    } = props;
    const [selecedDate, setSelectDate] = useState<moment.Moment | null>(moment().add(0, 'day'));
    const validFromDayNumber = 0;
    const validTillDayNumber = 75;

    // function onFullRender(date: moment.Moment) {
    //   // let style = '';
    //   // if (selecedDate?.isSame(date, "date")) {
    //   //   style = 'selected-date';
    //   // }
    //   // else if (selecedDate && selecedDate.isSameOrBefore(moment(), "date")) {
    //   //   style = 'disabled-date';
    //   // }
    //   // return <div className={`cells ${style}`}>{date.date()}</div>;
    //   let style = '';
    //   if (selecedDate?.isSame(date, "date")) {
    //     style = 'selected-date';
    //   }
    //   else if (date?.isBefore(moment().subtract(7,"days"), "date") || date?.isAfter(moment().add(14,"days"), "date")) {
    //     style = 'disabled-date';
    //   }
    //   return <div className={`cells ${style}`}>{date.date()}</div>;
    // }

    // function singleRender(date: moment.Moment) {
    //   let style = '';
    //   if (selecedDate?.isSame(date, "date")) {
    //     style = 'selected-date';
    //   }
    //   else if (date?.isBefore(moment().subtract(7,"days"), "date") || date?.isAfter(moment().add(14,"days"), "date")) {
    //     style = 'disabled-date';
    //   }
    //   return <div className={`cells ${style}`}>{date.date()}</div>;
    // }
    function onRender(date: moment.Moment) {
        let style = '';
        let status = ''
        if (isMultiple) {
            for (let i = 0; i < selectedMultipleDate.length; i++) {
                if (selectedMultipleDate[i]?.isSame(date, 'date')) {
                    style = 'selected-date';
                    break;
                }
            }
        }

        if (!isMultiple && selectedSingleDate?.isSame(date, 'date')) {
            style = 'selected-date';
            // status = 'status-true';
        } else if (date?.isBefore(moment().add(validFromDayNumber, 'days'), 'date') || date?.isAfter(moment().add(validTillDayNumber, 'days'), 'date')) {
            style = 'disabled-date';
        }
        return <div className={`customcells ${style}`}>{date.date()}
            <span className={`status-dot ${status} `}></span>
        </div>;
    }

    function handleDateSelect(momentDate: moment.Moment) {
        if (
            momentDate.isSameOrAfter(moment().add(validFromDayNumber, 'days'), 'date') &&
            momentDate.isSameOrBefore(moment().add(validTillDayNumber, 'days'), 'date')
        ) {
            setSelectDate(momentDate);
            handleSelectedDate(momentDate);
        }
    }

    function disabledDate(current: moment.Moment) {
        return (
            !disableComponents ||
            (current.isSameOrBefore(moment().add(validFromDayNumber, 'days'), 'date') &&
                current.isSameOrAfter(moment().add(validTillDayNumber, 'days'), 'date'))
        );
    }

    return (
        <div className="customcalendar-container">
            {/* <Button className="clear-button" onClick={clearSelection}>
        Clear
      </Button> */}

            <Calendar
                value={currMonthDate}
                disabledDate={disabledDate}
                onSelect={handleDateSelect}
                dateFullCellRender={onRender}
            />
        </div>
    );
}
