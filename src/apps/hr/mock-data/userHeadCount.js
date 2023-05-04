import { COLOR_MAPPING, R2W_INDEX } from '../../common/constants/constants';
import React from "react";
import '../../../sass/main.scss';

export const userCountDetail = [
  {
    key: '1',
    name: 'Mike',
    nature_of_visit: 'work',
    risk_status: 'high',
    time_to_pass_entry: '10days',
    e_pass: 'UKSAD'
  },
  {
    key: '2',
    name: 'John',
    nature_of_visit: 'work',
    risk_status: 'low',
    time_to_pass_entry: '5days',
    e_pass: 'UKSAD'
  },
  {
    key: '6',
    name: 'Mike',
    nature_of_visit: 'work',
    risk_status: 'high',
    time_to_pass_entry: '10days',
    e_pass: 'UKSAD'
  },
  {
    key: '7',
    name: 'John',
    nature_of_visit: 'work',
    risk_status: 'low',
    time_to_pass_entry: '5days',
    e_pass: 'UKSAD'
  },
  {
    key: '1',
    name: 'Mike',
    nature_of_visit: 'work',
    risk_status: 'high',
    time_to_pass_entry: '10days',
    e_pass: 'UKSAD'
  },
  {
    key: '8',
    name: 'John',
    nature_of_visit: 'work',
    risk_status: 'low',
    time_to_pass_entry: '5days',
    e_pass: 'UKSAD'
  },
  {
    key: '9',
    name: 'Mike',
    nature_of_visit: 'work',
    risk_status: 'high',
    time_to_pass_entry: '10days',
    e_pass: 'UKSAD'
  },
  {
    key: '10',
    name: 'John',
    nature_of_visit: 'work',
    risk_status: 'low',
    time_to_pass_entry: '5days',
    e_pass: 'UKSAD'
  },
];

export const columnsData = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name > b.name
  },
  {
    title: 'Nature of visit',
    dataIndex: 'nature_of_visit',
    key: 'nature_of_visit',
    sorter: (a, b) => a.nature_of_visit > b.nature_of_visit
  },
  {
    title: R2W_INDEX,
    dataIndex: 'risk_status',
    key: 'risk_status',
    sorter: (a, b) => a.risk_status > b.risk_status,
    render: (riskStatus) => (
      <span className={`${COLOR_MAPPING[riskStatus]}-font`}>
        {riskStatus}
      </span>
    ),
  },
  {
    title: 'e-Pass',
    dataIndex: 'e_pass',
    key: 'e_pass',
    sorter: (a, b) => a.e_pass > b.e_pass
  },
  {
    title: 'Time to Pass Expiry',
    dataIndex: 'time_to_pass_entry',
    key: 'time_to_pass_entry',
    sorter: (a, b) => a.time_to_pass_entry > b.time_to_pass_entry
  }
];
