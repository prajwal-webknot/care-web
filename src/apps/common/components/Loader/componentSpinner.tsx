import React from 'react';
import { Spin } from 'antd';

interface Props {}

export default function ComponentSpiner(props: Props) {
    return <Spin size="large" tip="Loading..." />;
}
