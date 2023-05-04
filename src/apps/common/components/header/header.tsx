import 'antd/dist/antd.css';
import './styles.scss';
import '../../../../sass/dashboard.scss';

import { Badge, Button, Dropdown, Menu, Select } from "antd";
import { BellOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons/lib';
import { EVACUATION_ALERT_FAILURE, EVACUATION_ALERT_SUCCESS, EMPLOYEE_ROLE, HR_ROLE } from "../../constants/constants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AuthActions } from '../../store/auth/AuthActions';
import { Capitalize } from "../../helpers/utils";
import ConfirmationModal from "../confirmationModal";
import { DashboardStatusActions } from "../../store/dashboardStatus/dashboardStatusActions";
import { LocationActions } from "../../store/locations/LocationActions";
import Logo from '../../../common/assets/icons/U-Space.svg';
import ChangePass from '../../../common/assets/icons/change-pass.png';
import User2 from '../../../common/assets/icons/user2.svg';
import { NavLink, useParams } from 'react-router-dom';
import NotificationDrawer from '../Notification/notificationDrawer';
import { PATH_MAPPER, KEY_MAPPER } from '../../constants/constants';
import SosModal from '../Notification/sosModal';
import { locationsList } from "../../store/locations/LocationReducer";
import { sendAlertSelector } from "../../store/evaculationAlert/EvacuationAlertReducer";
import { userDetails } from "../../store/userDetails/UserDetailsReducer";

const { Option } = Select;

interface Props {
  value?: any | undefined;
  sos?: any | undefined;
  noTabs: boolean,
  noCities?: boolean,
  handleLogout: () => void;
  persona?: string;
}

interface rolesProp {
  name: string;
}

export default function Header(props: any) {
  const { persona, sosAlert, noNotifications, handleLogout, noCities } = props;
  const { view }:any = useParams();
  const dispatch = useDispatch();
  const alertResponse = useSelector(sendAlertSelector);
  const userData = useSelector(userDetails);
  const locations = useSelector(locationsList);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [sosOpen, toggleSosModal] = useState(false);
  const [openConfirmation, toggleConfirmationModal] = useState(false);
  const sites = locations?.data?.site_details;
  const units = locations?.data?.unit_details;

  useEffect(() => {
    dispatch(LocationActions.locationRequest({}));
  }, []);


  // useEffect(() => {
  //   setNotificationDrawerOpen(props.value);
  //   toggleSosModal(props.sos);
  // }, [props.value]);

  useEffect(() => {
    dispatch(AuthActions.checkUserValidity.started(undefined));
  }, []);

  function openNotificationWithIcon() {
    setNotificationDrawerOpen(!notificationDrawerOpen);
  }

  function openSosPopUp() {
    toggleSosModal(true);
  }
  function closeSosPopUp() {
    toggleSosModal(false);
    toggleConfirmationModal(true);
  }

  function onlyClosePopUp() {
    toggleSosModal(false);
  }
  function closeComfirmationPopUp() {
    toggleConfirmationModal(false);
  }

  let roles: any = [];
  const groups: any = userData?.data?.user.groups ?? [];
  groups?.forEach((role: any) => {
    if (role?.name?.toLocaleLowerCase() !== EMPLOYEE_ROLE) {
      roles.push({
        name: role.name,
        path: (PATH_MAPPER as any)[role.name?.toLocaleLowerCase()],
        key: (KEY_MAPPER as any)[role.name?.toLocaleLowerCase()]
      });
    }
  });


  function handleSiteChange(value: string) {
    dispatch(DashboardStatusActions.changeSite(JSON.parse(value)));
  };
  function handleUnitChange(value: string) {
    dispatch(DashboardStatusActions.changeUnit(JSON.parse(value)));
  };

  function handleNavLinkClick(e: any, key: string) {
    if (window.location.pathname.split('/')[1] === key) e.preventDefault();
  }
  const menu = (props: any) => (
    <Menu
      defaultSelectedKeys={[window.location.pathname]}
      selectedKeys={[window.location.pathname.split('/')[1]]}
    >
      {roles.map((role: any) =>
        <Menu.Item key={role.key}>
          <NavLink
            onClick={(e) => handleNavLinkClick(e, role.key)}
            to={{ pathname: role.path, state: { persona: role.name?.toLocaleLowerCase() } }}>
            <img className="user-icon" src={User2} alt="user" />
            {`Log in as ${role.name}`}
          </NavLink>
        </Menu.Item>)}
      {roles.length > 0 && <Menu.Item key={'change-password'}>
        <NavLink
          onClick={(e) => handleNavLinkClick(e, 'change-password')}
          to={{ pathname: `/change-password/${persona}` }}
        >
          <img className="user-icon" src={ChangePass} alt="user" />
          {'Change Password'}
        </NavLink>
      </Menu.Item>}
      <Menu.Item key={'logout'} onClick={handleLogout}>
        <span className="user-icon logout-icon">
          <LogoutOutlined />
        </span>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header-container">
      <div className="header flex flex-row vertical-center space-between">
        <img className="header-logo" alt="logo" src={Logo} />
        {/* <b style={{ margin: "10px" }}>U-Space</b> */}
        {/* {!props.noTabs && HeaderTabs} */}
        <div className={`flex align-center space-between`}>

          {!["manager", "admin"].includes(view) && !noCities &&
            <div className="flex header-dropdown-container">
              <Select className="header-dropdown" placeholder="All Sites" onChange={handleSiteChange}>
                <Option defaultActiveFirstOption={true} className="dropdown-options" key={"all"} value={JSON.stringify({ id: "" })}>
                  {"All Sites"}
                </Option>
                {sites?.map((option: any) => {
                  return (
                    <Option className="dropdown-options" key={option.id} value={JSON.stringify(option)}>
                      {option?.name}
                    </Option>
                  );
                })
                }
              </Select>
              <Select className="header-dropdown header-margin" placeholder="All Units" onChange={handleUnitChange}>
                <Option defaultActiveFirstOption={true} className="dropdown-options" key={"all"} value={JSON.stringify({ id: "" })}>
                  {"All Units"}
                </Option>
                {units?.map((option: any) => {
                  return (
                    <Option className="dropdown-options" key={option.id} value={JSON.stringify(option)}>
                      {option?.name}
                    </Option>
                  );
                })
                }
              </Select>
            </div>
          }

          {sosAlert && !["hr"].includes(view) && <Button className="sos" shape="round" onClick={openSosPopUp}>SOS</Button>}
          {!noNotifications && <Badge
            showZero={false}
            dot={false}
          >
            <BellOutlined
              className="nav-items header-margin notif-bell-icon"
              onClick={openNotificationWithIcon}
            />
          </Badge>
          }
          <Dropdown overlay={menu(props)} placement="bottomLeft">
            <Button>
              <UserOutlined />
              {(persona || view) &&
                `Logged in as ${persona === HR_ROLE ? persona.toUpperCase() : Capitalize(persona) ||
                  (view === "hr" ? view.toUpperCase() : Capitalize(view))}`}
            </Button>
          </Dropdown>
        </div>

        {sosOpen && (
          <SosModal
            onlyClosePopUp={onlyClosePopUp}
            closePopUp={closeSosPopUp}
          />
        )}
        {openConfirmation && (
          <ConfirmationModal
            closeComfirmationPopUp={closeComfirmationPopUp}
            displayMessage={!alertResponse.error ? EVACUATION_ALERT_SUCCESS : EVACUATION_ALERT_FAILURE}
          />
        )}
        {notificationDrawerOpen && (
          <NotificationDrawer
            openNotificationWithIcon={openNotificationWithIcon}
          />
        )}
      </div>
    </div>
  );
}


