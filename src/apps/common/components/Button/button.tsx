
import React from "react";
import 'antd/dist/antd.css';
import '../../../../sass/dashboard.scss';

interface CommonProps {
  title: string,
  handleClick: () => void;
  allotSeat?:boolean
}

export default function CButton(props: CommonProps) {
  const { title, handleClick,allotSeat } = props;
  return (
    <button className={!allotSeat?"common-button revoke-button cursor":"common-buttonAllot revoke-button cursor"} onClick={handleClick}>
      {title}
    </button>
  );
}