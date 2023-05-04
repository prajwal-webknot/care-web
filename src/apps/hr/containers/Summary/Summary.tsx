import '../../../../sass/main.scss';

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PASS_EXPIRE_TIME_KEY, NAME_KEY, NATURE_OF_VISIT_KEY, RISK_STATUS_KEY, BLUEOOTH_STATUS_KEY } from '../../../common/constants/constants';
import { EmployeesActions } from "../../../admin/store/actions/EmployeesListAction";
import { HR_DASHBOARD } from "../../../common/constants/constants";
import TabularData from '../../../common/components/TabularData/tabularData';
import { dashboardStatusChange } from "../../../common/store/dashboardStatus/dashboardStatusReducer";
import { employeeListResp, employeeListLoading } from "../../../admin/store/reducers/EmployeesListReducer";
import getColumnsData from "../../../common/constants/columnsData";

interface objectProp {
  name?: string,
  nature_of_visit?: string,
  risk_status?: string,
  pass_expiring_time?: string,
  bluetooth_status: string;
}

export default function Summary(props: any) {
  const dispatch = useDispatch();
  let empListResp: any = useSelector(employeeListResp);
  const dashboardStatus = useSelector(dashboardStatusChange);
  let site = {};
  let unit = {};
  if (dashboardStatus?.site?.id) {
    site = { office: [dashboardStatus?.site?.id] };
  }
  if (dashboardStatus?.unit?.id) {
    unit = { user__unit: [dashboardStatus?.unit?.id] };
  }

  useEffect(() => {
    dispatch(EmployeesActions.getEmployeesRequest({
      dynamicQueryParams: [
        { user_view: 'HR' },
        { status: 'checked_in' },
        site, unit
      ]
    }));
  }, [dashboardStatus]);

  const empList = empListResp?.data ?? [];
  let SummaryDetail: any = [];
  if (empList && empList.length > 0) {
    empList.forEach((obj: any) => {
      SummaryDetail.push({
        id: obj.id,
        name: obj?.name,
        phone_number: obj?.user?.phone_number,
        nature_of_visit: obj?.nature_of_visit,
        risk_status: obj?.risk_status,
        bluetooth_status: obj?.bluetooth_status,
        pass_expiring_time: obj?.valid_to,
      });
    });
  }

  const loading: any = useSelector(employeeListLoading);

  const columnsData = getColumnsData([NAME_KEY, NATURE_OF_VISIT_KEY, RISK_STATUS_KEY, PASS_EXPIRE_TIME_KEY, BLUEOOTH_STATUS_KEY]);

  return (
    <div className="layout-container">
      <TabularData
        loading={loading}
        parent={HR_DASHBOARD}
        dataSource={SummaryDetail}
        columnsData={columnsData}
        title={"Summary"}
        approvalDropDowns={true}
      />
    </div>
  );
}


