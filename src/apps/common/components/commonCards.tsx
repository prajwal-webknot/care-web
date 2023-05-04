import * as React from "react";
import 'antd/dist/antd.css';
import '../../../sass/dashboard.scss';

import { Card } from "antd";

interface Props {
  img: string,
  desc: string,
  border: string,
  value?: number | undefined,
  customStyle?: string,
  expireType?: string,
  hours?: number,
  parent?: string,
  path?: string | undefined,
  handleRedirection?: (path: string, state: any) => any,
  fteCardClick?: () => any,
  showCounts?: boolean,
  title?: string;
}

export default function CommonCards(props: Props) {
  const { desc, title, expireType, hours, fteCardClick, value, img, border,
    customStyle, handleRedirection, path, showCounts, parent } = props;
  function handlePathRedirection(path: string | undefined, stateObj: any) {
    if (handleRedirection && path) {
      handleRedirection(path, stateObj);
    }
  }

  return (
    <Card
      onClick={() => fteCardClick ?
        fteCardClick() :
        handlePathRedirection(path, { title, expireType, hours, showCounts, parent })}
      className={`${customStyle} single-cards border-radius-10 cursor ${border}`}
    >
      <div className="flex flex-row space-between align-center">
        <span>
          <img className="padding-right" style={{ width: "52px" }} src={img} alt="" />{desc}
        </span>
        <span className="number">{value ?? ""}</span>
      </div>
    </Card>
  );
}


