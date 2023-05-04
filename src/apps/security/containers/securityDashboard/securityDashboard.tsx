import React from "react";
import "antd/dist/antd.css";
import "../../../../sass/dashboard.scss";

import { Card } from "antd";
import {
  EMPLOYEES_DETAILS,
  // EXPECTED_VISITORS_DETAILS,
  EXPIRED_PASSES_DETAILS,
  NO_DATA_FOUND,
  SAFETY_BREACHES_DETAILS,
  LOW,
  HIGH,
  MEDIUM,
  RISK_STATUS_MAPPER_FUNC,
  PERMITTED,
  LIMITED,
  RESTRICTED,
  SUMMARY_BY_NATURE_OF_VISIT,
  EMPLOYEE_LABEL,
  VISITORS_LABEL,
  TEMPORARY_MEMBER_LABEL,
  SUMMARY_BY_WORK_INDEX,
  SUMMARY_BY_BLUETOOTH_STATUS,
  SECURITY_DASHBOARD,
  BUFFER_ALLOCATIONS,
  CONFERENCE_ROOM,
  EXPECTED_VISITORS_DETAILS_SECURITY,
  SECURITY_ROLE,
} from "../../../common/constants/constants";
import {
  censusResp,
  isFetchingCensus,
} from "../../../common/store/census/CensusReducer";
import { useDispatch, useSelector } from "react-redux";

import { CensusActions } from "../../../common/store/census/CensusAction";
import CommonCards from "../../../common/components/commonCards";
import EmergencyCard from "../../../common/components/emergencyCard";
import { Redirect } from "react-router-dom";
import SafetyCard from "../../../common/components/safetyCard";
import TableSkeleton from "../../../common/components/tableSkeleton";
import bgSafety from "../../../common/assets/images/bg-safety.svg";
import bgUser from "../../../common/assets/images/bg-user.svg";
import bluetooth from "../../../common/assets/images/bg-bluetooth.svg";
import building from "../../../common/assets/images/bg-building.svg";
import defective from "../../../common/assets/images/defective.svg";
import expired from "../../../common/assets/images/expired.svg";
import redUser from "../../../common/assets/images/red_user.svg";
import { safetyRules } from "../../mock-data/dashboard";
import ticket from "../../../common/assets/images/blue_ticket.svg";
import yellowUser from "../../../common/assets/images/yellow_user.svg";
import { Capitalize } from "../../../common/helpers/utils";
import register from "../../../common/assets/images/register.png";

interface CommonProps {
  header: string;
  val1: number;
  head1: string;
  val2: number;
  head2: string;
  val3: number;
  head3: string;
  val4?: number;
  head4: string;
  val5?: number;
  head5: string;
  img: string;
  customStyle?: string;
}

interface Props {
  history: string[];
}

function CommonRow(props: CommonProps) {
  const {
    customStyle,
    head1,
    head2,
    head3,
    head4,
    head5,
    header,
    val1,
    val2,
    val3,
    val4,
    val5,
    img,
  } = props;


  return (
    <Card className="admin-status grey-font">
      <img className="bg-assets" alt="icon" src={img} />
      <div className="mr-bottom hr-desc">{header}</div>
      <div className={`flex flex-row wrap space-evenly ${customStyle}`}>
        <div className="flex flex-column">
          <div className="number">{val1}</div>
          <div
            className={`${head1 === PERMITTED && "green-font"} ${head1 === LIMITED && "orange-font"
              } ${head1 === RESTRICTED && "red-font"} hr-desc hr-desc-label`}
          >
            {head1}
          </div>
        </div>
        <div className="flex flex-column">
          <div className="number">{val2}</div>
          <div
            className={`${head2 === PERMITTED && "green-font"} ${head2 === LIMITED && "orange-font"
              } ${head2 === RESTRICTED && "red-font"} hr-desc hr-desc-label`}
          >
            {head2}
          </div>
        </div>
        {head3.length > 0 && (
          <div className="flex flex-column">
            <div className="number">{val3}</div>
            <div
              className={`${head3 === PERMITTED && "green-font"} ${head3 === LIMITED && "orange-font"
                } ${head3 === RESTRICTED && "red-font"} hr-desc hr-desc-label`}
            >
              {head3}
            </div>
          </div>
        )}
        {head4.length > 0 && (
          <div className="flex flex-column">
            <div className="number">{val4}</div>
            <div
              className={`${head4 === PERMITTED && "green-font"} ${head4 === LIMITED && "orange-font"
                } ${head4 === RESTRICTED && "red-font"} hr-desc hr-desc-label`}
            >
              {head4}
            </div>
          </div>
        )}
        {head5.length > 0 && (
          <div className="flex flex-column">
            <div className="number">{val5}</div>
            <div
              className={`${head5 === PERMITTED && "green-font"} ${head5 === LIMITED && "orange-font"
                } ${head5 === RESTRICTED && "red-font"} hr-desc hr-desc-label`}
            >
              {head5}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export default function SecurityDashboardScreen(props: Props) {
  const dispatch = useDispatch();
  let censusData: any = useSelector(censusResp);
  let isFetching: boolean = useSelector(isFetchingCensus);
  const [path, setPath] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [stateObj, setstateObj] = React.useState({});
  React.useEffect(() => {
    dispatch(
      CensusActions.censusRequest({
        dynamicQueryParams: [{ user_view: "Security" }],
      })
    );
  }, []);

  function handleRedirection(path: string, stateObj: object) {
    setPath(path);
    setRedirect(true);
    setstateObj(stateObj);
  }

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: path,
          state: stateObj,
        }}
      />
    );
  }

  if (isFetching) {
    return <TableSkeleton />;
  }

  if (!censusData) {
    return <div>Data not found</div>;
  }
  censusData = censusData?.data;

  return (
    <>
      <div className="layout-container flex flex-row">
        <div className="left-container">
          <Card
            className="cursor border-radius-10"
            onClick={() => handleRedirection(EMPLOYEES_DETAILS, {})}
          >
            <div className="flex flex-row vertical-center">
              <img className="padding-right" alt="icon" src={redUser} />
              <span className="header-color">Current Premise Headcount</span>
            </div>
            <div className="flex flex-row wrap space-between">
              <Card className="admin-status">
                <img className="bg-assets" alt="icon" src={building} />
                <div className="current-premise flex flex-row space-between vertical-center">
                  <span className="hr-desc grey-font">
                    Current Premise Headcount
                  </span>
                  <span className="number">
                    {censusData?.current_premise_head_count ?? NO_DATA_FOUND}
                  </span>
                </div>
                <div className="current-premise flex flex-row space-between vertical-center">
                  <span className="hr-desc grey-font">
                    Security Breaches For Today
                  </span>
                  <span className="number">
                    {censusData?.social_distancing_breaches ?? NO_DATA_FOUND}
                  </span>
                </div>
              </Card>
              <CommonRow
                img={bgUser}
                val1={censusData?.employee ?? NO_DATA_FOUND}
                head1={EMPLOYEE_LABEL}
                val2={censusData?.visitors ?? NO_DATA_FOUND}
                head2={VISITORS_LABEL}
                val3={censusData?.temporary ?? NO_DATA_FOUND}
                head3={TEMPORARY_MEMBER_LABEL}
                val4={censusData?.buffer_allocations ?? NO_DATA_FOUND}
                head4={BUFFER_ALLOCATIONS}
                val5={censusData?.conference_rooms ?? NO_DATA_FOUND}
                head5={CONFERENCE_ROOM}
                header={SUMMARY_BY_NATURE_OF_VISIT}
              />
              <CommonRow
                img={bgSafety}
                val1={censusData?.low_risk ?? NO_DATA_FOUND}
                head1={Capitalize(RISK_STATUS_MAPPER_FUNC(LOW))}
                val2={censusData?.moderate_risk ?? NO_DATA_FOUND}
                head2={Capitalize(RISK_STATUS_MAPPER_FUNC(MEDIUM))}
                val3={censusData?.high_risk ?? NO_DATA_FOUND}
                head3={Capitalize(RISK_STATUS_MAPPER_FUNC(HIGH))}
                head4=""
                head5=""
                header={SUMMARY_BY_WORK_INDEX}
              />
              <CommonRow
                img={bluetooth}
                customStyle="w-50"
                val1={censusData?.bluetooth_status_on ?? NO_DATA_FOUND}
                head1="ON"
                val2={censusData?.bluetooth_status_off ?? NO_DATA_FOUND}
                head2="OFF"
                val3={0}
                head3=""
                head4=""
                head5=""
                header={SUMMARY_BY_BLUETOOTH_STATUS}
              />
            </div>
          </Card>
          <div className="flex flex-row wrap space-between">

            <CommonCards
              desc="Expected Visits Today"
              value={censusData?.expected_visiters ?? NO_DATA_FOUND}
              parent={SECURITY_DASHBOARD}
              border="yellow-border"
              img={yellowUser}
              showCounts={false}
              path={EXPECTED_VISITORS_DETAILS_SECURITY}
              handleRedirection={handleRedirection}
            />
            <CommonCards
              desc="Expired Passes"
              title="Expired Passes"
              expireType="expired"
              hours={24}
              parent={SECURITY_DASHBOARD}
              showCounts={true}
              value={censusData?.passes_expired_last_24_hr ?? NO_DATA_FOUND}
              border="orange-border"
              img={expired}
              path={EXPIRED_PASSES_DETAILS(SECURITY_ROLE)}
              handleRedirection={handleRedirection}
            />
            <CommonCards
              desc="Passes Expiring in 2 Hrs"
              title="Passes Expiring in 2 Hrs"
              expireType="expiring"
              hours={2}
              parent={SECURITY_DASHBOARD}
              value={censusData?.passes_expiring ?? NO_DATA_FOUND}
              border="light-blue-border"
              img={ticket}
              path={EXPIRED_PASSES_DETAILS(SECURITY_ROLE)}
              handleRedirection={handleRedirection}
            />
            <CommonCards
              desc="Security Breaches During The Day"
              value={censusData?.social_distancing_breaches ?? NO_DATA_FOUND}
              parent={SECURITY_DASHBOARD}
              border="blue-border"
              img={defective}
              path={SAFETY_BREACHES_DETAILS(SECURITY_ROLE)}
              handleRedirection={handleRedirection}
            />

          </div>
        </div>
        <div className="right-container">
          {/* options of lunch allocation and hot desking added */}
          {/* <CommonCards
            customStyle="right-approval"
            desc="Hot Desking"
            value={undefined}
            path={"/hot-desking"}
            handleRedirection={handleRedirection}
            border="blue-border"
            img={HotDesking}
          />
          <CommonCards
            customStyle="right-approval"
            desc="Lunch Area Allocation"
            value={undefined}
            border="orange-border"
            img={LunchSeat}
            path={"/lunch-booking"}
            handleRedirection={handleRedirection}
          />
          */}
          <CommonCards
            customStyle="right-approval"
            desc="Contact Tracing"
            value={undefined}
            border="green-blue-border"
            path={"/contact-tracing"}
            handleRedirection={handleRedirection}
            img={register}
          />

          <EmergencyCard
            emergency_hospitals_names={censusData?.emergency_hospitals_names}
            emergency_helpline_numbers={censusData?.emergency_helpline_numbers}
          />
          <SafetyCard data={safetyRules} height={"admin-safety-guideline"} />
        </div>
      </div>
    </>
  );
}
