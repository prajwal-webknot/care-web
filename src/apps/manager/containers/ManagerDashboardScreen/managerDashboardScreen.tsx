import React from 'react';
import 'antd/dist/antd.css';
import '../../../../sass/dashboard.scss';

import {
    APPROVAL_DETAILS,
    HEAD_COUNT,
    TEAM_ROSTER,
    PERMITTED,
    LIMITED,
    RESTRICTED,
    NO_DATA_FOUND,
    R2W_INDEX,
} from '../../../common/constants/constants';
import { censusResp, isFetchingCensus } from '../../../common/store/census/CensusReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'antd';
import { CensusActions } from '../../../common/store/census/CensusAction';
import CommonCards from '../../../common/components/commonCards';
import { Redirect } from 'react-router-dom';
import SafetyCard from '../../../common/components/safetyCard';
import TableSkeleton from '../../../common/components/tableSkeleton';
import approvals from '../../../common/assets/images/approvals.png';
import { getPercentage, getDecimalTill } from '../../../common/helpers/utils';
import redUser from '../../../common/assets/images/Insite Headcount.svg';
import roster from '../../../common/assets/images/roster.svg';
import { safetyRules } from '../../../admin/mock-data/dashboard';
import yellowGroup from '../../../common/assets/images/users_manager.svg';
import { FteGuidelinesActions } from '../../../hr/store/actions/FteGuidelinesAction';
import { getFteResp } from '../../../hr/store/reducers/FteGuidelinesReducer';

interface valuesProps {
    count: string | number;
    label: string;
}
interface CommonProps {
    header: string;
    values: valuesProps[];
}
interface Props {
    history: string[];
}

function CommonRow(props: CommonProps) {
    return (
        <Card className="manager-status grey-font">
            <div className="mr-bottom hr-desc">{props.header}</div>
            <div className={`flex flex-row space-between`}>
                {props.values.map((obj) => (
                    <div className="flex flex-column">
                        <div className="number">{obj.count}</div>
                        <div
                            className={`${obj.label === PERMITTED && 'green-font'} ${
                                obj.label === LIMITED && 'orange-font'
                            } ${obj.label === RESTRICTED && 'red-font'} hr-desc manager-desc-label`}
                        >
                            {obj.label}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default function HrDashboardScreen(props: Props) {
    const dispatch = useDispatch();
    const [path, setPath] = React.useState('');
    const [redirect, setRedirect] = React.useState(false);
    let managerCensusData: any = useSelector(censusResp);
    const fetchingData: any = useSelector(isFetchingCensus);

    function handleRedirection(urlPath: string) {
        setPath(urlPath);
        setRedirect(true);
    }
    let FteResp: any = useSelector(getFteResp);
    const siteId = localStorage.getItem('siteId') ?? '';

    React.useEffect(() => {
        dispatch(
            CensusActions.censusRequest({
                dynamicQueryParams: [{ user_view: 'Manager' }],
            }),
        );
        if (siteId) {
            dispatch(FteGuidelinesActions.getFteGuidelinesRequest({ dynamicRoute: [siteId] }));
        }
    }, []);

    if (redirect) {
        return <Redirect to={path} />;
    }

    if (fetchingData) {
        return <TableSkeleton />;
    }

    managerCensusData = managerCensusData?.data;

    return (
        <div className="layout-container flex flex-row">
            <div className="left-container">
                <Card
                    className="cursor border-radius-10 margin-bottom-10 manager-cards"
                    onClick={() => handleRedirection(HEAD_COUNT('insite'))}
                >
                    <div className="flex flex-row vertical-center">
                        <img className="padding-right" alt="icon" src={redUser} />
                        <span className="big-font grey-font bold">{`Insite Headcount (${
                            managerCensusData?.team_members_present ?? '-'
                        })`}</span>
                    </div>
                    <div className="flex flex-row wrap space-between">
                        <CommonRow
                            values={[{ label: '', count: managerCensusData?.team_expired_passes }]}
                            header="No. of People With Expired Passes"
                        />

                        <CommonRow
                            values={[
                                {
                                    label: '',
                                    count: `${getPercentage(
                                        managerCensusData?.team_safety_breaches,
                                        managerCensusData?.total_team_members,
                                    )}`,
                                },
                            ]}
                            header="% of Daily Safety Breaches"
                        />

                        <CommonRow
                            values={[
                                {
                                    label: 'Current',
                                    count: `${getPercentage(
                                        managerCensusData?.team_members_present,
                                        managerCensusData?.total_team_members,
                                    )}`,
                                },
                                {
                                    label: 'Guideline',
                                    count: `${getDecimalTill(FteResp?.data?.percentage_allowed, 0) ?? NO_DATA_FOUND}`,
                                },
                            ]}
                            header={`Today's Workforce`}
                        />
                        <CommonRow
                            values={[
                                { label: PERMITTED, count: managerCensusData?.team_low_risk },
                                { label: LIMITED, count: managerCensusData?.team_moderate_risk },
                                { label: RESTRICTED, count: managerCensusData?.team_high_risk },
                            ]}
                            header={R2W_INDEX}
                        />
                    </div>
                </Card>
                <Card
                    className="cursor border-radius-10 manager-cards"
                    onClick={() => handleRedirection(HEAD_COUNT('total'))}
                >
                    <div className="flex flex-row vertical-center">
                        <img className="padding-right" alt="icon" src={yellowGroup} />
                        <span className="big-font grey-font bold">{`Total Teams Headcount (${
                            managerCensusData?.total_site_employees_present ?? '-'
                        })`}</span>
                    </div>
                    <div className="flex flex-row wrap space-between">
                        <CommonRow
                            values={[{ label: '', count: managerCensusData?.team_expired_passes }]}
                            header="No. of People With Expired Passes"
                        />

                        <CommonRow
                            values={[
                                {
                                    label: '',
                                    count: `${getPercentage(
                                        managerCensusData?.total_site_safety_breaches,
                                        managerCensusData?.total_site_employees,
                                    )}`,
                                },
                            ]}
                            header="% of Daily Safety Breaches"
                        />

                        <CommonRow
                            values={[
                                {
                                    label: 'Current',
                                    count: `${getPercentage(
                                        managerCensusData?.total_site_employees_present,
                                        managerCensusData?.total_site_employees,
                                    )}`,
                                },
                                {
                                    label: 'Guideline',
                                    count: `${getDecimalTill(FteResp?.data?.percentage_allowed, 0) ?? NO_DATA_FOUND}`,
                                },
                            ]}
                            header="Daily % FTE"
                        />
                        <CommonRow
                            values={[
                                { label: PERMITTED, count: managerCensusData?.total_site_low_risk },
                                { label: LIMITED, count: managerCensusData?.total_site_moderate_risk },
                                { label: RESTRICTED, count: managerCensusData?.total_site_high_risk },
                            ]}
                            header={R2W_INDEX}
                        />
                    </div>
                </Card>
            </div>
            <div className="right-container">
                <CommonCards
                    customStyle="right-approval"
                    desc="Approvals"
                    value={managerCensusData?.approvals_count}
                    border="green-blue-border"
                    path={APPROVAL_DETAILS('manager')}
                    handleRedirection={handleRedirection}
                    img={approvals}
                />

                <CommonCards
                    customStyle="right-approval"
                    desc="Rosters"
                    border="orange-border"
                    path={TEAM_ROSTER}
                    handleRedirection={handleRedirection}
                    img={roster}
                />
                {/* <CommonCards
          customStyle="right-approval"
          desc='Roster Team'
          border='red-border'
          path={NEW_TEAM_ROSTER}
          handleRedirection={handleRedirection}
          img={roster} /> */}
                <SafetyCard data={safetyRules} height={'manager-safety-guideline'} />
            </div>
        </div>
    );
}
