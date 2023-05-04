import React from "react";
export const approvalDetail = [
  {
    key: '1',
    name: 'John',
    type: 'e-Pass',
    risk_status: 'High',
    nature_of_approval: 'Employee',
    approval_status: 'Rejected',
    site: 'HSR',
  },
  {
    key: '2',
    name: 'Pri',
    type: 'e-Pass',
    risk_status: 'Medium',
    nature_of_approval: 'Temp Member',
    approval_status: 'Approved',
    site: 'BTM',
  },
  {
    key: '3',
    name: 'Jatin',
    type: 'e-Pass',
    risk_status: 'Low',
    nature_of_approval: 'Employee',
    approval_status: '',
    site: 'HSR',
  },
];


export const columnsData = [
  {
    title: 'Epass Id',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name > b.name
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone_number',
    key: 'phone_number',
    sorter: (a, b) => a.phone_number > b.phone_number
  },
  {
    title: 'Time to Pass Expiry',
    dataIndex: 'pass_expiring_date',
    key: 'pass_expiring_date',
    sorter: (a, b) => a.pass_expiring_date > b.pass_expiring_date,
  },
];
