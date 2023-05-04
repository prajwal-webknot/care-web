// Current premise head count

import React from "react";
import { RISK_STATUS_MAPPER, LOW, MEDIUM, HIGH, REGISTERED_EMPLOYEES } from "../../common/constants/constants";

export const dashboardDetail = {
  current_premise_head_count: 10,
  safety_breaches_for_today: 10,
  low_risk: 10,
  moderate_risk: 10,
  high_risk: 10,
  bluetooth_status_on: 10,
  bluetooth_status_off: 10,
  expected_visiters: 10,
  employee: 10,
  temporary: 10,
  passes_expired_last_12_hr: 20,
  passes_expired_last_2_hr: 30,
  passes_expired_in_current_location: 20,
  emergency_helpline_numbers: ['1800 - 2134 - 325', '1800 - 2134 - 325', '1800 - 2134 - 325'],
  emergency_hospitals_names: ['Apollo', 'Fortis'],
  social_distancing_breaches: 20,
  list_of_people_who_brached: []
};
export const columnsData = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: () => { return <div className="bold">{REGISTERED_EMPLOYEES}</div>; },
    dataIndex: 'registered_employees',
    key: 'registered_employees',
  },
  {
    title: () => { return <div className="green-font bold">{RISK_STATUS_MAPPER[LOW]}</div>; },
    dataIndex: 'low',
    key: 'low',
  },
  {
    title: () => { return <div className="orange-font bold">{RISK_STATUS_MAPPER[MEDIUM]}</div>; },
    dataIndex: 'medium',
    key: 'medium',
  },
  {
    title: () => { return <div className="red-font bold">{RISK_STATUS_MAPPER[HIGH]}</div>; },
    dataIndex: 'high',
    key: 'high',
  },
];

export const riskData = [
  {
    key: '10',
    name: 'Actual',
    high: '23',
    medium: '3',
    low: '43'
  },
  {
    key: '10',
    name: 'Guideline',
    high: '23',
    medium: '44',
    low: '7'
  },
];
