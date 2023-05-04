import React from 'react';
import { Checkbox } from 'antd';
import './checkbox.scss';

interface Props {
    handleSelectedEmployess: (emp: number[]) => void;
    selectedEmp: number[];
    realSelectedEmp?: number[];
    disableComponents: boolean;
    employeesNames?: string[];
    employeesIds?: string[];
    totalSelected?: number;
}
export default function CheckBoxList(props: Props) {
    const { selectedEmp, handleSelectedEmployess, realSelectedEmp, employeesNames, disableComponents, totalSelected } = props;

    function onChange(checkedValues: any) {
        handleSelectedEmployess(realSelectedEmp ? realSelectedEmp : checkedValues);
    }

    return (
        <div className="checkbox-list-container">
            <p className="calendar-title">Select Team Members</p>
            {disableComponents ? <p>{realSelectedEmp ? realSelectedEmp.length : selectedEmp.length} selected</p> : <p>{totalSelected} selected</p>}
            {disableComponents ? (
                <Checkbox.Group
                    disabled={true}
                    className="checkbox-group-container"
                    options={employeesNames}
                    value={selectedEmp}
                    onChange={onChange}
                />
            ) : (
                <Checkbox.Group
                    disabled={false}
                    className="checkbox-group-container"
                    options={employeesNames}
                    onChange={onChange}
                />
            )}
        </div>
    );
}
