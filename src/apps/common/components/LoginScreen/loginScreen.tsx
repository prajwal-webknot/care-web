import * as React from "react";
import LoginForm from '../form/loginForm';
import 'antd/dist/antd.css';
import foregroundIcon from '../../../common/assets/images/login-foreground.svg';
import USpace from '../../../common/assets/icons/U-Space.svg';
import './styles.scss';

interface Props {
  history: string[];
}

export default function LoginScreen(props: Props) {
  return (
    <div className="login-main-container">
      <div className="left-section">
        <header style={{ marginLeft: "20px", marginTop: "20px" }}>
          <img className="logo" src={USpace} alt="logo" />
          {/* <b>U-Space</b> */}
        </header>
        <LoginForm history={props.history} />
      </div>
      <img className="right-section-img" alt="preview" src={foregroundIcon} />
    </div>
  );
}

