import * as React from "react";
import 'antd/dist/antd.css';
import '../../../sass/dashboard.scss';

import { Card, Tabs } from "antd";

import call from '../assets/images/call.svg';
import hospital from '../assets/images/Hospital.svg';

const { TabPane } = Tabs;

interface Props {
  emergency_helpline_numbers: any,
  emergency_hospitals_names: any,
  height?: string;
}

export default function EmergencyCard(props: Props) {
  const { height } = props;

  return (
    <Card className={`border-radius-10 ${height ? height : "height"} side-cards emergency scroll-y`}>
      <Tabs>
        <TabPane tab="Emergency Helpline" key="1">
          <div className="flex flex-column">
            {props.emergency_helpline_numbers && props.emergency_helpline_numbers.length > 0 && props.emergency_helpline_numbers.map((number: any, index: number) => {
              return (
                <span key={index} className="align-center warm-grey">
                  <img className="padding-right" src={call} alt="" />{number.numbers}</span>
              );
            })
            }
          </div>
        </TabPane>
        <TabPane tab="Hospitals" key="2">
          <div className="flex flex-column">
            {props.emergency_hospitals_names && props.emergency_hospitals_names.length > 0 && props.emergency_hospitals_names.map((name: any, index: number) => {
              return (
                <span key={index} className="flex flex-row top warm-grey">
                  <img className="padding-right" alt="" src={hospital} />{name.name}</span>
              );
            })
            }
          </div>
        </TabPane>
      </Tabs>
    </Card>
  );
}


