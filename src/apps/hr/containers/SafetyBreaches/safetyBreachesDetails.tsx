import '../../../../sass/main.scss';

import { ADMIN_DASHBOARD, HR_DASHBOARD, NAME_KEY, NATURE_OF_VISIT_KEY, RISK_STATUS_KEY, BLUEOOTH_STATUS_KEY, SECURITY_DASHBOARD } from "../../../common/constants/constants";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SafetyBreachesActions } from "../../../common/store/safetyBreach/SafetyBreachesAction";
import TabularData from '../../../common/components/TabularData/tabularData';
import { safetyBreachesResp, safetyBreachesLoading } from "../../../common/store/safetyBreach/SafetyBreachesReducer";
import { dashboardStatusChange } from "../../../common/store/dashboardStatus/dashboardStatusReducer";
import getColumnsData from "../../../common/constants/columnsData";
import { useParams } from "react-router-dom";

interface Props {
  parent?: any
}
export default function SafetyBreachesDetails(props: any) {
  const { parent } = props;
  const dispatch = useDispatch();
  const { view }:any = useParams();

  // Selectors
  const loading: any = useSelector(safetyBreachesLoading);
  const dashboardStatus = useSelector(dashboardStatusChange);
  let safetyBreachesData: any = useSelector(safetyBreachesResp);

  let locationParam = [] as any;
  if (view === "hr") {
    locationParam = [
      { site_ids: [dashboardStatus?.site?.id] },
      { unit_ids: [dashboardStatus?.unit?.id] },
    ];
  }

  useEffect(() => {
    dispatch(SafetyBreachesActions.safetyBreachesRequest({
      dynamicQueryParams: [...locationParam,
      { user_view: view === "hr" ? "HR" : view[0].toUpperCase() + view.substring(1) }
      ]
    }));
  }, [dashboardStatus]);

  let expectedVisitorDetail: any = [];
  safetyBreachesData?.data?.forEach((obj: any) => {
    expectedVisitorDetail.push({
      id: obj.id,
      name: obj?.name,
      nature_of_visit: obj?.nature_of_visit,
      risk_status: obj?.risk_status,
      bluetooth_status: obj?.bluetooth_status
    });
  });

  const columnsData = getColumnsData([NAME_KEY, NATURE_OF_VISIT_KEY, RISK_STATUS_KEY, BLUEOOTH_STATUS_KEY]);
  let getParent: any;

  if (typeof getParent === "undefined") {
    switch (view) {
      case "admin":
        getParent = ADMIN_DASHBOARD;
        break;
      case "hr":
        getParent = HR_DASHBOARD;
        break;
      case "security":
        getParent = SECURITY_DASHBOARD;
        break;
      default:
        break;
    }
  }
  return (
    <div className="layout-container">
      <TabularData
        loading={loading}
        parent={getParent}
        dataSource={expectedVisitorDetail}
        columnsData={columnsData}
        title={"Security Breaches During The Day"}
        approvalDropDowns={view === "hr"}
      />
    </div>
  );
}


