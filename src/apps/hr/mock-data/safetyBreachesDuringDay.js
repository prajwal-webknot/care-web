import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons/lib';

import { COLOR_MAPPING, BLUETOOTH_STATUS, R2W_INDEX } from '../../common/constants/constants'
import React from "react";
import { Tag } from "antd";

export const safetyBreachesDetail = [
  {
    key: '1',
    name: 'Mike',
    nature_of_visit: 'work',
    risk_status: 'high',
    bluetooth_status: true
  },
  {
    key: '2',
    name: 'John',
    nature_of_visit: 'work',
    risk_status: 'low',
    bluetooth_status: false
  },
  {
    key: '3',
    name: 'Mike',
    nature_of_visit: 'work',
    risk_status: 'high',
    bluetooth_status: true
  },
  {
    key: '4',
    name: 'John',
    nature_of_visit: 'work',
    risk_status: 'low',
    bluetooth_status: false
  },
  {
    key: '5',
    name: 'Mike',
    nature_of_visit: 'work',
    risk_status: 'high',
    bluetooth_status: true
  },
  {
    key: '6',
    name: 'Mike',
    nature_of_visit: 'work',
    risk_status: 'high',
    bluetooth_status: true
  },
];

export const columnsData = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Nature of visit',
    dataIndex: 'nature_of_visit',
    key: 'nature_of_visit',
  },
  {
    title: R2W_INDEX,
    dataIndex: 'risk_status',
    key: 'risk_status',
    render: (riskStatus) => (
      <span className={`${COLOR_MAPPING[riskStatus]}-font`}>
        {riskStatus}
      </span>
    ),
  },
  {
    title: BLUETOOTH_STATUS,
    dataIndex: 'bluetooth_status',
    key: 'bluetooth_status',
    render: (bluetoothStatus) => (
      <span>
        <Tag className="tag-bluetooth" color={bluetoothStatus && '#6abf69'}>
          {bluetoothStatus ? 'ON' : 'OFF'}
        </Tag>
      </span>
    ),
  }
];
