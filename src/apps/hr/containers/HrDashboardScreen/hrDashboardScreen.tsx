import "antd/dist/antd.css";
import "../../../../sass/dashboard.scss";

import {
  APPROVAL_DETAILS,
  NO_DATA_FOUND,
  SAFETY_BREACHES_DETAILS,
  SUMMARY,
  EMPLOYEE_LABEL,
  VISITORS_LABEL,
  TEMPORARY_MEMBER_LABEL,
  SUMMARY_BY_NATURE_OF_VISIT,
  RETURN_2_WORK_INDEX,
  EXPIRED_PASSES_DETAILS,
  HR_DASHBOARD,
} from "../../../common/constants/constants";
import { Card, Table } from "antd";
import React, { useState } from "react";
import {
  censusResp,
  isFetchingCensus,
} from "../../../common/store/census/CensusReducer";
import { getDecimalTill, getPercentage } from "../../../common/helpers/utils";
import { useDispatch, useSelector } from "react-redux";

import { CensusActions } from "../../../common/store/census/CensusAction";
import CommonCards from "../../../common/components/commonCards";
import EmergencyCard from "../../../common/components/emergencyCard";
import { FteGuidelinesActions } from "../../store/actions/FteGuidelinesAction";
import FteModal from "./fteModal";
import { Redirect } from "react-router-dom";
import SafetyCard from "../../../common/components/safetyCard";
import TableSkeleton from "../../../common/components/tableSkeleton";
import approvals from "../../../common/assets/images/approvals.png";
import bgSafety from "../../../common/assets/images/bg-safety.svg";
import { columnsData } from "../../mock-data/hrDashboard";
import { dashboardStatusChange } from "../../../common/store/dashboardStatus/dashboardStatusReducer";
import defective from "../../../common/assets/images/defective.svg";
import fte from "../../../common/assets/images/fte.png";
import { getFteResp } from "../../store/reducers/FteGuidelinesReducer";
import register from "../../../common/assets/images/register.png";
import { safetyRules } from "../../../admin/mock-data/dashboard";
import { locationsList } from "../../../common/store/locations/LocationReducer";

interface valuesProps {
  count: string;
  label: string;
}
interface CommonProps {
  header: string;
  values: valuesProps[];
  handleRedirection: any;
}
interface Props {
  history: string[];
}

function CommonRow(props: CommonProps) {
  return (
    <Card
      className="hr-status grey-font"
      onClick={() => props.handleRedirection()}
    >
      <div className="mr-bottom hr-header bold">{props.header}</div>
      <div className={`flex flex-row space-between`}>
        {props.values.map((obj) => (
          <div className="flex flex-column">
            <div className="number">{obj.count}</div>
            <div className="hr-desc hr-desc-label">{obj.label}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function HrDashboardScreen(props: any) {
  const dispatch = useDispatch();
  const [fteModalOpen, setFteModalOpen] = useState(false);
  let censusData: any = useSelector(censusResp);
  let isFetching: any = useSelector(isFetchingCensus);
  const dashboardStatus = useSelector(dashboardStatusChange);
  let FteResp: any = useSelector(getFteResp);
  const locations = useSelector(locationsList);
  const sites = locations?.data?.site_details;

  React.useEffect(() => {
    dispatch(
      CensusActions.censusRequest({
        dynamicQueryParams: [
          { user_view: "HR" },
          { site_ids: [dashboardStatus?.site?.id] },
          { unit_ids: [dashboardStatus?.unit?.id] },
        ],
      })
    );
    if (dashboardStatus?.site?.id) {
      dispatch(
        FteGuidelinesActions.getFteGuidelinesRequest({
          dynamicRoute: [dashboardStatus?.site?.id],
        })
      );
    } else {
      dispatch(FteGuidelinesActions.getFteGuidelinesRequest({}));
    }
  }, [dashboardStatus]);

  const [path, setPath] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [stateObj, setstateObj] = React.useState({});
  function handleRedirection(urlPath: string, stateObj: object) {
    setPath(urlPath);
    setRedirect(true);
    setstateObj(stateObj);
  }

  function fteCardClick() {
    setFteModalOpen(!fteModalOpen);
  }
  function handleSubmit(value: number, sites: number[]) {
    const setFteGuidelineObj = {
      site_id: sites,
      guidelines: "",
      percentage_allowed: value,
    };
    dispatch(
      FteGuidelinesActions.setFteGuidelinesRequest({
        path: {},
        payload: setFteGuidelineObj,
      })
    );
    fteCardClick();

    setTimeout(() => {
      if (dashboardStatus?.site?.id) {
        dispatch(
          FteGuidelinesActions.getFteGuidelinesRequest({
            dynamicRoute: [dashboardStatus?.site?.id],
          })
        );
      } else {
        dispatch(FteGuidelinesActions.getFteGuidelinesRequest({}));
      }
    }, 300);
  }

  if (redirect && path) {
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
  censusData = censusData?.data;

  const riskData = [
    {
      key: "current_site",
      name: "Current Site",
      high: censusData?.selected_site_high_risk ?? NO_DATA_FOUND,
      medium: censusData?.selected_site_moderate_risk ?? NO_DATA_FOUND,
      low: censusData?.selected_site_low_risk ?? NO_DATA_FOUND,
      registered_employees:
        censusData?.selected_site_employees ?? NO_DATA_FOUND,
    },
    {
      key: "all_site",
      name: "All Site",
      high: censusData?.all_site_high_risk ?? NO_DATA_FOUND,
      medium: censusData?.all_site_moderate_risk ?? NO_DATA_FOUND,
      low: censusData?.all_site_low_risk ?? NO_DATA_FOUND,
      registered_employees: censusData?.all_site_employees ?? NO_DATA_FOUND,
    },
  ];

  return (
    <div className="layout-container flex flex-row">
      <div className="left-container">
        <Card className="cursor border-radius-10">
          <img className="bg-assets" alt="icon" src={bgSafety} />
          <div className="flex flex-row vertical-center">
            <span className="big-font grey-font bold">Summary</span>
          </div>
          <div className="flex flex-row wrap space-between">
            <CommonRow
              handleRedirection={() => handleRedirection(SUMMARY, {})}
              values={[
                {
                  label: EMPLOYEE_LABEL,
                  count: censusData?.employees ?? NO_DATA_FOUND,
                },
                // { label: VISITORS_LABEL, count: censusData?.visitors ?? NO_DATA_FOUND },
                {
                  label: TEMPORARY_MEMBER_LABEL,
                  count: censusData?.non_employees ?? NO_DATA_FOUND,
                },
                { label: "", count: "" },
              ]}
              header={SUMMARY_BY_NATURE_OF_VISIT}
            />
            <CommonRow
              handleRedirection={() => handleRedirection(SUMMARY, {})}
              values={[
                {
                  label: "Current Site",
                  count:
                    censusData?.selected_site_present_employees ??
                    NO_DATA_FOUND,
                },
                {
                  label: "All Site",
                  count:
                    censusData?.all_site_present_employees ?? NO_DATA_FOUND,
                },
                { label: "", count: "" },
              ]}
              header="Current Premise Headcount"
            />
            <CommonRow
              handleRedirection={() => handleRedirection(SUMMARY, {})}
              values={[
                {
                  label: "Current",
                  count:
                    getPercentage(
                      censusData?.selected_site_present_employees,
                      censusData?.selected_site_employees
                    ) ?? NO_DATA_FOUND,
                },
                {
                  label: "Guideline",
                  count: `${
                    getDecimalTill(FteResp?.data?.percentage_allowed, 0) ??
                    NO_DATA_FOUND
                  }`,
                },
                { label: "", count: "" },
              ]}
              header={`Today's Workforce`}
            />
            <CommonRow
              handleRedirection={() =>
                handleRedirection(EXPIRED_PASSES_DETAILS("hr"), {
                  title: "Expired Passes",
                  expireType: "expired",
                  hours: 24,
                  showCounts: false,
                  parent: HR_DASHBOARD,
                })
              }
              values={[
                {
                  label: "Current Site",
                  count:
                    censusData?.selected_site_expired_passes ?? NO_DATA_FOUND,
                },
                {
                  label: "All Site",
                  count: censusData?.all_site_expired_passes ?? NO_DATA_FOUND,
                },
                { label: "", count: "" },
              ]}
              header="Expired Passes for Today"
            />
          </div>
          <hr className="hr-style" />
          <div className="flex flex-row vertical-center">
            <span className="big-font bold grey-font">
              {RETURN_2_WORK_INDEX}
            </span>
          </div>
          <Table
            className="risk-table"
            dataSource={riskData}
            columns={columnsData}
            pagination={false}
          />
        </Card>
        <div className="flex flex-row wrap space-between hr-bottom-cards">
          <CommonCards
            desc="New Registrations"
            value={censusData?.new_registrations ?? NO_DATA_FOUND}
            border="yellow-border"
            img={register}
            path={"/registrations"}
            handleRedirection={handleRedirection}
          />
          {/* <CommonCards
            desc='User Headcounts'
            value={censusData?.selected_site_employees ?? NO_DATA_FOUND}
            border='orange-border'
            img={expired}
            path={USER_COUNT}
            handleRedirection={handleRedirection}
          /> */}
          <CommonCards
            desc="Security Breaches During The Day"
            value={censusData?.safety_breaches_during_day ?? NO_DATA_FOUND}
            border="blue-border"
            img={defective}
            path={SAFETY_BREACHES_DETAILS("hr")}
            handleRedirection={handleRedirection}
          />
        </div>
      </div>
      <div className="right-container">
        <CommonCards
          customStyle="right-approval"
          desc="Approvals"
          value={censusData?.new_approvals ?? NO_DATA_FOUND}
          border="green-blue-border"
          path={APPROVAL_DETAILS("hr")}
          handleRedirection={handleRedirection}
          img={approvals}
        />
        <CommonCards
          customStyle="right-approval"
          desc="Set % FTE Guidelines"
          border="light-blue-border"
          img={fte}
          fteCardClick={fteCardClick}
        />

        <EmergencyCard
          emergency_helpline_numbers={
            censusData?.emergency_helpline_numbers ?? []
          }
          emergency_hospitals_names={
            censusData?.emergency_hospitals_names ?? []
          }
        />
        <SafetyCard data={safetyRules} height={"hr-safety-guideline"} />
      </div>
      {fteModalOpen && (
        <FteModal
          handleSubmit={handleSubmit}
          closePopUp={fteCardClick}
          sites={sites}
        />
      )}
    </div>
  );
}
