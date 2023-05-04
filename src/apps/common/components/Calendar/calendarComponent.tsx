import React, { useState } from 'react';
import { Calendar, Button } from 'antd';
import './calendar.scss';
import moment from 'moment';

interface Props {
    handleSelectedDate: any;
    clearSelectedData: () => void;
    disableComponents: boolean;
}
export default function CalendarComponent(props: Props) {
    const { clearSelectedData, handleSelectedDate, disableComponents } = props;
    const [selecedDate, setSelectDate] = useState<moment.Moment | null>(moment());
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
        if (selecedDate?.isSame(date, 'date')) {
            style = 'selected-date';
        } else if (date?.isBefore(moment().add(validFromDayNumber, 'days'), 'date') || date?.isAfter(moment().add(validTillDayNumber, 'days'), 'date')) {
            style = 'disabled-date';
        }
        return <div className={`cells ${style}`}>{date.date()}</div>;
    }

    function clearSelection() {
        setSelectDate(null);
        clearSelectedData();
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
        <div className="calendar-container">
            {/* <Button className="clear-button" onClick={clearSelection}>
        Clear
      </Button> */}
            <Calendar disabledDate={disabledDate} onSelect={handleDateSelect} dateFullCellRender={onRender} />
        </div>
    );
}
