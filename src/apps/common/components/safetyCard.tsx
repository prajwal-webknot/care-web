import * as React from "react";
import 'antd/dist/antd.css';
import '../../../sass/dashboard.scss';


import { Card } from "antd";
import safety from '../assets/images/safety.svg';

interface Props {
    data: string[],
    height?: string;
}

export default function SafetyCard(props: Props) {
    const { height } = props;
    return (
        <Card className={`border-radius-10 safety-border side-cards ${height} scroll-y`}>
            <div className="flex flex-row vertical-center">
                <img className="padding-right" alt="" src={safety} />
                <span className="medium-font">Safety Guidelines</span>
            </div>
            <ul className="safetyCard">
                {
                    props.data.map((item: any) => {
                        return (
                            <li className="dark-grey-font"> {item} </li>
                        );
                    })}
            </ul>
        </Card>
    );
}


