import React, { useEffect } from 'react';

import {
    ADMIN_DASHBOARD,
    ADMIN_ROLE,
    EXPECTED_VISITORS_DETAILS,
    HR_ROLE,
    MANAGER_DASHBOARD,
    MANAGER_ROLE,
    SUMMARY,
    TEAM_ROSTER,
    USER_COUNT,
    LOGIN_PATH,
    EMPLOYEES_DETAILS,
    SECURITY_ROLE,
    SECURITY_DASHBOARD,
    EXPECTED_VISITORS_DETAILS_SECURITY,
} from '../constants/constants';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { isAuthFailed, isAuthSuccess, loginSelect } from '../store/auth/AuthReducer';
import { userDetails, loadingUserDetails } from '../store/userDetails/UserDetailsReducer';
import { useDispatch, useSelector } from 'react-redux';

import AdminDashboardScreen from '../../admin/containers/AdminDashboardScreen/adminDashboard';
import ApprovalDetails from '../../hr/containers/ApprovalDetails/approvalDetails';
import { AuthActions } from '../store/auth/AuthActions';
import ChangePasswordScreen from './ChangePassword/changePasswordScreen';
import ExpectedVisitorsDetails from '../../admin/containers/ExpectedVisitorsDetails/expectedVisitorsDetails';
import ExpiredPassesDetails from '../../admin/containers/ExpiredPassesDetails/expiredPassesDetails';
import Header from './header/header';
import HrDashboardScreen from '../../hr/containers/HrDashboardScreen/hrDashboardScreen';
import LoginScreen from './LoginScreen/loginScreen';
import ManagerDashboardScreen from '../../manager/containers/ManagerDashboardScreen/managerDashboardScreen';
import PremiseHeadCountDetail from '../../admin/containers/PremiseHeadCountDetail/premiseHeadCountDetails';
import SafetyBreachesDetails from '../../hr/containers/SafetyBreaches/safetyBreachesDetails';
import Summary from '../../hr/containers/Summary/Summary';
import NewRegistrations from '.././../hr/containers/NewRegistrations/newRegistrations';
import Render404 from './render404';
import TeamHeadCountScreen from '../../manager/containers/TeamHeadCountScreen/teamHeadCountScreen';
import TeamRosterScreen from '../../manager/containers/TeamRosterScreen/teamRosterScreen';
import UserCount from '../../hr/containers/UserCount/userCount';
import Spiner from './Loader/spinner';
import { UserDetailsActions } from '../store/userDetails/UserDetailsActions';
import { Mobile, Desktop } from '../helpers/responsiveUtil';
import RenderNotAvailable from './renderNotAvailable';
import ScrollToTop from '../helpers/scrollToTop';
import ContactTracing from '../../admin/containers/ContactTracing/contactTracing';
import LunchBookingDetails from '../../admin/containers/LunchBooking/lunchSeats';
import HotDeskingDetails from '../../admin/containers/HotDesking/hotDesking';
import CafeView from '../../admin/containers/CafeView/cafeView';
import SeatSummary from '../../admin/containers/SeatSummary/seatSummary';
import RoasterReport from '../../admin/containers/RoasterReport/roasterReport';
import RosterDash from './RosterDashComponent/RosterDashOldMain';
import ConferenceRoomDetails from '../../admin/containers/ConferenceRoom/conferenceRoomDetails';
import SecurityDashboardScreen from '../../security/containers/securityDashboard/securityDashboard';

const PrivateRoute = withRouter(
    ({ component: Component, noheader, authed, sosAlert, persona, noCities, roles, ...rest }: any) => {
        const dispatch = useDispatch();
        const authSuccess: boolean = useSelector(isAuthSuccess);
        const authFailed: boolean = useSelector(isAuthFailed);
        const token = localStorage.getItem('token');
        const { view } = rest.computedMatch.params;
        const handleLogout = () => {
            dispatch(AuthActions.logoutUserAction.started(undefined));
            dispatch(AuthActions.clearReducer());
            dispatch(UserDetailsActions.clearReducer());
        };

        // If user not authenticated for a page redirect to the respective homepage
        if (!authed || (view && !roles?.includes(view))) {
            if (roles?.includes(HR_ROLE)) {
                return <Redirect to="/" />;
            } else if (roles?.includes(MANAGER_ROLE)) {
                return <Redirect to="/manager" />;
            } else if (roles?.includes(ADMIN_ROLE)) {
                return <Redirect to="/admin" />;
            }
        }

        // If user not authenticated for a page force logout and redirect to login
        // if (!authed) {
        //   localStorage.clear();
        //   dispatch(AuthActions.clearReducer());
        // }

        return (
            <Route
                {...rest}
                render={(props) =>
                    !authed || authFailed || !token ? (
                        <Redirect
                            to={{
                                pathname: LOGIN_PATH,
                                state: { from: props.location },
                            }}
                        />
                    ) : authSuccess ? (
                        <>
                            <Mobile>
                                {!noheader && <Header noCities noTabs noNotifications handleLogout={handleLogout} />}
                                <RenderNotAvailable text="Sorry this portal is only available for desktop version." />
                            </Mobile>
                            <Desktop>
                                {!noheader && (
                                    <Header
                                        sosAlert={persona === ADMIN_ROLE || view === ADMIN_ROLE.toLocaleLowerCase() || persona === SECURITY_ROLE || view === SECURITY_ROLE.toLocaleLowerCase()}
                                        noCities={(view && view !== HR_ROLE.toLocaleLowerCase()) || noCities}
                                        persona={persona || view}
                                        {...rest}
                                        handleLogout={handleLogout}
                                    />
                                )}
                                <Component {...rest} />
                            </Desktop>
                        </>
                    ) : (
                        <React.Fragment />
                    )
                }
            />
        );
    },
);

export default function AppLayout() {
    const userData = useSelector(userDetails);
    const loading = useSelector(loadingUserDetails);
    const authFailed: boolean = useSelector(isAuthFailed);
    const loginResp = useSelector(loginSelect);
    const roles: any = userData?.data?.user?.groups?.map((role: any) => role.name.toLocaleLowerCase()) ?? []; //based on this roles the view is modified
    const userId = loginResp?.data?.data?.user_obj?.id;
    const dispatch = useDispatch();

    useEffect(() => {
        if (userId)
            dispatch(
                UserDetailsActions.userDetailsRequest({
                    dynamicRoute: [userId],
                }),
            );
    }, [userId, dispatch]);

    function hasPermission(role: string) {
        return roles?.includes(role);
    }

    if (loading) {
        return <Spiner />;
    }

    const handleFirstComponentRedirection = () => {
        if (roles?.includes(HR_ROLE)) {
            return {
                component: HrDashboardScreen,
                noTabs: false,
                noheader: false,
                persona: HR_ROLE,
            };
        } else if (roles?.includes(MANAGER_ROLE)) {
            return {
                component: ManagerDashboardScreen,
                noTabs: false,
                noheader: false,
                noCities: true,
                persona: MANAGER_ROLE,
            };
        } else if (roles?.includes(ADMIN_ROLE)) {
            return {
                component: AdminDashboardScreen,
                noTabs: true,
                noheader: false,
                noCities: true,
                persona: ADMIN_ROLE,
                sosAlert: true,
            };
        } else if (roles?.includes(SECURITY_ROLE)) {
            return {
                component: SecurityDashboardScreen,
                noTabs: true,
                noheader: false,
                noCities: true,
                persona: SECURITY_ROLE,
                sosAlert: true,
            };
        } else {
            return {
                component: Render404,
                noTabs: true,
                noheader: false,
                noCities: true,
                noNotifications: true,
            };
        }
    };

    return (
        <div>
            <ScrollToTop />
            <Switch>
                <Route exact path={LOGIN_PATH} noheader component={LoginScreen} />

                <PrivateRoute
                    exact
                    path="/"
                    persona={handleFirstComponentRedirection()?.persona}
                    noCities={handleFirstComponentRedirection()?.noCities}
                    noheader={handleFirstComponentRedirection()?.noheader}
                    noTabs={handleFirstComponentRedirection()?.noTabs}
                    component={handleFirstComponentRedirection()?.component}
                    authed={true}
                    noNotifications={handleFirstComponentRedirection()?.noNotifications}
                    sosAlert={handleFirstComponentRedirection()?.sosAlert}
                />
                <PrivateRoute
                    persona={ADMIN_ROLE}
                    exact
                    noCities
                    path={EXPECTED_VISITORS_DETAILS}
                    component={ExpectedVisitorsDetails}
                    isAdmin
                    authed={hasPermission(ADMIN_ROLE)}
                    sosAlert
                />
                <PrivateRoute
                    persona={SECURITY_ROLE}
                    exact
                    noCities
                    path={EXPECTED_VISITORS_DETAILS_SECURITY}
                    component={ExpectedVisitorsDetails}
                    authed={hasPermission(SECURITY_ROLE)}
                    sosAlert
                />
                {/* three routes added for lunch seat allocation and hot desking */}
                <PrivateRoute
                    persona={ADMIN_ROLE}
                    exact
                    noCities
                    path={'/cafe-booking'}
                    component={LunchBookingDetails}
                    authed={hasPermission(ADMIN_ROLE)}
                    sosAlert
                />
                <PrivateRoute
                    persona={ADMIN_ROLE}
                    exact
                    noCities
                    path={'/cafe-booking/cafe-view'}
                    component={CafeView}
                    authed={hasPermission(ADMIN_ROLE)}
                    sosAlert
                />
                <PrivateRoute
                    persona={ADMIN_ROLE}
                    exact
                    noCities
                    path={'/hot-desking'}
                    component={HotDeskingDetails}
                    authed={hasPermission(ADMIN_ROLE)}
                    sosAlert
                />
                <PrivateRoute
                    persona={ADMIN_ROLE}
                    exact
                    noCities
                    path={'/conference-room'}
                    component={ConferenceRoomDetails}
                    authed={hasPermission(ADMIN_ROLE)}
                    sosAlert
                />
                <PrivateRoute
                    persona={ADMIN_ROLE}
                    exact
                    noCities
                    path={'/seat-summary'}
                    component={SeatSummary}
                    authed={hasPermission(ADMIN_ROLE)}
                    sosAlert
                />
                <PrivateRoute
                    persona={ADMIN_ROLE}
                    exact
                    noCities
                    path={'/roster-report'}
                    component={RoasterReport}
                    authed={hasPermission(ADMIN_ROLE)}
                    sosAlert
                />
                <PrivateRoute
                    exact
                    noCities
                    persona={MANAGER_ROLE}
                    path={MANAGER_DASHBOARD}
                    component={ManagerDashboardScreen}
                    authed={hasPermission(MANAGER_ROLE)}
                />
                {/* <PrivateRoute
                    exact
                    noCities
                    persona={MANAGER_ROLE}
                    path={NEW_TEAM_ROSTER}
                    component={RosterDash}
                    authed={hasPermission(MANAGER_ROLE)}
                /> */}
                <PrivateRoute
                    exact
                    noCities
                    roles={roles}
                    path={'/change-password/:view'}
                    component={ChangePasswordScreen}
                    authed={hasPermission(HR_ROLE) || hasPermission(ADMIN_ROLE) || hasPermission(MANAGER_ROLE) || hasPermission(SECURITY_ROLE)}
                />
                <PrivateRoute
                    exact
                    noCities
                    persona={ADMIN_ROLE}
                    roles={roles}
                    path={EMPLOYEES_DETAILS}
                    component={PremiseHeadCountDetail}
                    authed={hasPermission(ADMIN_ROLE)}
                />
                <PrivateRoute
                    exact
                    roles={roles}
                    path={'/safety-breaches/:view'}
                    component={SafetyBreachesDetails}
                    authed={hasPermission(HR_ROLE) || hasPermission(ADMIN_ROLE) || hasPermission(SECURITY_ROLE)}
                    sosAlert
                />
                <PrivateRoute
                    exact
                    roles={roles}
                    persona={ADMIN_ROLE}
                    noCities
                    path={'/contact-tracing'}
                    component={ContactTracing}
                    authed={hasPermission(ADMIN_ROLE)}
                    sosAlert
                />
                <PrivateRoute
                    exact
                    roles={roles}
                    path={'/expired-passes/:view'}
                    component={ExpiredPassesDetails}
                    authed={hasPermission(ADMIN_ROLE) || hasPermission(HR_ROLE) || hasPermission(SECURITY_ROLE)}
                />
                <PrivateRoute
                    exact
                    path={ADMIN_DASHBOARD}
                    noTabs
                    noCities
                    persona={ADMIN_ROLE}
                    component={AdminDashboardScreen}
                    authed={hasPermission(ADMIN_ROLE)}
                    sosAlert
                />
                <PrivateRoute
                    exact
                    path={SECURITY_DASHBOARD}
                    noTabs
                    noCities
                    persona={SECURITY_ROLE}
                    component={SecurityDashboardScreen}
                    authed={hasPermission(SECURITY_ROLE)}
                    sosAlert
                />
                {authFailed && <Redirect to={LOGIN_PATH} />}

                <PrivateRoute
                    exact
                    roles={roles}
                    path={'/approval/:view'}
                    authed={hasPermission(HR_ROLE) || hasPermission(MANAGER_ROLE)}
                    component={ApprovalDetails}
                />
                <PrivateRoute
                    exact
                    path={SUMMARY}
                    component={Summary}
                    persona={HR_ROLE}
                    authed={hasPermission(HR_ROLE)}
                />
                <PrivateRoute
                    exact
                    path={USER_COUNT}
                    component={UserCount}
                    authed={hasPermission(HR_ROLE)}
                    persona={HR_ROLE}
                />
                <PrivateRoute
                    exact
                    path={TEAM_ROSTER}
                    noCities
                    component={TeamRosterScreen}
                    authed={hasPermission(MANAGER_ROLE)}
                    persona={MANAGER_ROLE}
                />
                <PrivateRoute
                    exact
                    noCities
                    path="/headcount/:type"
                    component={TeamHeadCountScreen}
                    authed={hasPermission(MANAGER_ROLE)}
                    persona={MANAGER_ROLE}
                />
                <PrivateRoute
                    exact
                    path="/registrations"
                    component={NewRegistrations}
                    persona={HR_ROLE}
                    authed={hasPermission(HR_ROLE)}
                />
                <PrivateRoute path="*" noCities noNotifications authed={true} noTabs component={Render404} />
            </Switch>
        </div>
    );
}
