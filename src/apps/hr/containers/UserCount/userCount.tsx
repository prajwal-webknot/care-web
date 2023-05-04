import '../../../../sass/main.scss';

import { HR_DASHBOARD, NAME_KEY, NATURE_OF_VISIT_KEY, RISK_STATUS_KEY, PASS_EXPIRE_TIME_KEY, BLUEOOTH_STATUS_KEY } from "../../../common/constants/constants";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { EmployeesActions } from "../../../admin/store/actions/EmployeesListAction";
import TabularData from '../../../common/components/TabularData/tabularData';
import { employeeListResp, employeeListLoading } from "../../../admin/store/reducers/EmployeesListReducer";
import getColumnsData from "../../../common/constants/columnsData";

export default function UserCount(props: any) {
  const dispatch = useDispatch();
  let empListResp: any = useSelector(employeeListResp);

  useEffect(() => {
    dispatch(EmployeesActions.getEmployeesRequest({ dynamicQueryParams: [{ status: 'checked_in' }] }));
  }, []);


  const empList = empListResp?.data ?? [];
  let premiseCountDetail: any = [];
  if (empList && empList.length > 0) {
    empList.forEach((obj: any) => {
      premiseCountDetail.push({
        name: obj?.name,
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
        dataSource={premiseCountDetail}
        columnsData={columnsData}
        title={"User Headcount"}
        approvalDropDowns={true}
      />
    </div>
  );
}


