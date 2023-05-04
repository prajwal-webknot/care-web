import '../../../../sass/main.scss';

import { MANAGER_DASHBOARD, PASS_EXPIRE_TIME_KEY, RISK_STATUS_KEY, NATURE_OF_VISIT_KEY, NAME_KEY } from "../../../common/constants/constants";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { EmployeesActions } from "../../../admin/store/actions/EmployeesListAction";
import TabularData from '../../../common/components/TabularData/tabularData';
import { employeeListResp, employeeListLoading } from "../../../admin/store/reducers/EmployeesListReducer";
import getColumnsData from "../../../common/constants/columnsData";
import { useParams } from "react-router-dom";

export default function TeamHeadCountScreen(props: any) {
  const { type }:any = useParams();
  let empListResp: any = useSelector(employeeListResp);

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'total') {
      dispatch(EmployeesActions.getEmployeesRequest({
        dynamicQueryParams: [
          { user_view: "Manager-site" },
          { status: "checked_in" }
        ]
      }));
    } else {
      dispatch(EmployeesActions.getEmployeesRequest({
        dynamicQueryParams: [
          { user_view: "Manager-team" },
          { status: "checked_in" }
        ]
      }));
    }
  }, []);


  let expectedVisitorDetail: any = [];
  empListResp?.data?.forEach((obj: any) => {
    expectedVisitorDetail.push({
      name: obj?.name,
      nature_of_visit: obj?.nature_of_visit,
      risk_status: obj?.risk_status,
      pass_expiring_time: obj?.valid_to,
    });
  });

  const columnsData = getColumnsData([NAME_KEY, NATURE_OF_VISIT_KEY, RISK_STATUS_KEY, PASS_EXPIRE_TIME_KEY]);

  function handleChange() {
  }
  const loading: any = useSelector(employeeListLoading);

  return (
    <div className="layout-container">
      <TabularData
        loading={loading}
        parent={MANAGER_DASHBOARD}
        dataSource={expectedVisitorDetail}
        columnsData={columnsData}
        title={`${type === 'total' ? 'Total Team Headcount' : 'Insite Headcount'}`}
        setCheckoutModalOpen={handleChange}
        checkout={true}
      />
    </div>
  );
}


