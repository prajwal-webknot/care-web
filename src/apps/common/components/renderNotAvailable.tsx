import React from "react";
import "../../../sass/dashboard.scss";
import foregroundIcon from '../assets/images/login-foreground.svg';

interface Props {
  text: string;
}

export default function RenderNotAvailable(props: Props) {
  const { text } = props;
  return (
    <div className="not-available-container">
      <div className="flex center">
        <img className="not-available-image" src={foregroundIcon} alt="Logo" />
      </div>
      <div className="not-available-text flex center">
        <h3>{text}</h3>
      </div>
    </div>

  );
}
