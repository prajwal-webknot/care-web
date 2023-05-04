import React from "react";
import "../../../sass/main.scss";
import error404 from '../../common/assets/images/error404.png';

interface Props {
}

export default function Render404(props: Props) {
  return (
    <img className="error-screen" src={error404} alt="Logo" />
  );
}
