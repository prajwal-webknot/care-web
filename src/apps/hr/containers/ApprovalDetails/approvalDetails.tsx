import './styles.scss';
import '../../../../sass/main.scss';

import { HR_DASHBOARD, MANAGER_DASHBOARD, ROSTER_STATUS, NAME_KEY, NATURE_OF_APPROVAL_KEY, SITE_KEY, RISK_STATUS_KEY, DATE, APPROVAL_ERROR_BUFFER } from "../../../common/constants/constants";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApproveModal from './approveModal';
import { EmployeesActions } from "../../../admin/store/actions/EmployeesListAction";
import { StatusChangeActions } from "../../../admin/store/actions/StatusChangeAction";
import TabularData from '../../../common/components/TabularData/tabularData';
import { employeeListResp, employeeListLoading } from "../../../admin/store/reducers/EmployeesListReducer";
import getColumnsData from "../../../common/constants/columnsData";
import { useParams } from "react-router-dom";
import { dashboardStatusChange } from "../../../common/store/dashboardStatus/dashboardStatusReducer";
import { statusChange } from "../../../admin/store/reducers/StatusChangeReducer";
import BufferModal from './bufferModal';

export default function ApprovalDetails(props: any) {
  const { view }:any = useParams();
  const dispatch = useDispatch();

  // States
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [actionName, setActionName] = useState('');
  const [epassId, setEpassId] = useState('');
  const [actionStatus, setActionStatus] = useState('');
  const [bufferModal, setBufferModalOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  // Selectors
  const dashboardStatus = useSelector(dashboardStatusChange);
  const statusChangeResp: any = useSelector(statusChange);
  if (statusChangeResp && bufferModal === false && requested && !approveModalOpen) {
    if (statusChangeResp?.errorResp?.message === APPROVAL_ERROR_BUFFER) {
      setBufferModalOpen(true);
      setRequested(false);
    }
  }


  let expectedVisitorData: any = useSelector(employeeListResp);

  let locationParam = [] as any;
  if (view === "hr") {
    locationParam = [
      { site_ids: [dashboardStatus?.site?.id] },
      { unit_ids: dashboardStatus?.unit?.id },
    ];
  }

  React.useEffect(() => {
    if (view === 'hr') {
      dispatch(EmployeesActions.getEmployeesRequest({
        dynamicQueryParams: [...locationParam,
        { status: 'hr_approval,approved,refused,not_allowed,checked_in,checked_out,expire,arrived' },
        { user_view: "HR" },
        { view_name: "approvals" }
        ]
      }));
    }
    else if (view === 'manager') {
      dispatch(EmployeesActions.getEmployeesRequest({
        dynamicQueryParams: [
          { status: 'manager_approval,approved,refused,not_allowed,checked_in,checked_out,expire,arrived,hr_approval' },
          { user_view: "Manager-team" },
          { view_name: "approvals" }
        ]
      }));

    }
  }, [dashboardStatus, view, statusChangeResp]);

  function handleChange(row: any, status: string) {
    closePopUp();
    setEpassId(row.id);
    setName(row.name);
  }

  function closePopUp() {
    setApproveModalOpen(false);
  }
  function closePopUpBuffer() {
    setBufferModalOpen(false);
  }

  async function getRequestBody(actionName: string, bufferEnable: boolean = false) {
    switch (actionName) {
      case "revoke":
        return {
          epass_id: parseInt(epassId),
          revoke_type: "SINGLE"
        }

      case "reject":
        return {
          epass_id: parseInt(epassId),
          reject_type: "SINGLE"
        }
      case "approve":
        return {
          epass_id: parseInt(epassId),
          approve_type: "SINGLE",
          enable_buffer: bufferEnable
        }
      default:
        break;
    }
  }
  async function handleApproveReject(bufferEnable?: boolean) {
    let reqBody = await getRequestBody(actionName.split(' ')[0], bufferEnable);
    dispatch(StatusChangeActions.statusChangeRequest({
      path: { dynamicRoute: [actionName.split(' ')[0]] },
      payload: reqBody
    }));
  }

  function handleApproval(row: any, status: string, actionName: string) {
    setEpassId(row.id);
    setName(row.name);
    setActionStatus(status);
    setActionName(actionName);
    setApproveModalOpen(true);
    setRequested(true);
  }

  function handleBufferEnable() {
    closePopUpBuffer();
    handleApproveReject(true);
  }

  function handleSubmit() {
    handleApproveReject();
    closePopUp();
  }


  let data: any = [];
  if (expectedVisitorData?.data) {
    data = expectedVisitorData.data;
  }

  const mapper: any = {
    manager_approval: "manager_approval",
    hr_approval: "hr_approval",
    approved: "Approved",
    refused: "Rejected",
    not_allowed: "Denied Entry",
    checked_in: "Checked In",
    checked_out: "Checked Out",
    expire: "Expired",
    arrived: "Arrived"
  };

  let expectedVisitorDetail: any = [];
  if (data && data.length > 0) {
    data.forEach((obj: any) => {
      let date = new Date(obj?.valid_from);
      expectedVisitorDetail.push({
        id: obj.id,
        name: obj?.name,
        nature_of_visit: obj?.nature_of_visit,
        site: obj?.office?.name,
        risk_status: obj?.risk_status,
        date: date,
        status: mapper[obj?.status] ?? "-",
        approved_by_hr: obj?.approved_by_hr,
        approved_by_manager: obj?.approved_by_manager,
        roster_status: obj?.roster_status
      });
    });
  }

  const columnsToShow = [NAME_KEY, NATURE_OF_APPROVAL_KEY, DATE];
  if (view === 'hr') columnsToShow.push(ROSTER_STATUS);
  const columnsData = getColumnsData(columnsToShow);
  const loading: any = useSelector(employeeListLoading);

  return (
    <div className="layout-container">
      <TabularData
        loading={loading}
        parent={view === 'hr' ? HR_DASHBOARD : MANAGER_DASHBOARD}
        dataSource={expectedVisitorDetail}
        columnsData={columnsData}
        approval={true}
        title={"Approvals"}
        handleApproval={handleApproval}
        setApproveOpen={handleChange}
        persona={view}
      />
      {approveModalOpen &&
        <ApproveModal
          name={name}
          closePopUp={closePopUp}
          handleSubmit={handleSubmit}
          status={`${actionName ? 'Do you want to ' + actionName + "?" : ''}`}
        />
      }
      {bufferModal &&
        <BufferModal
          name={name}
          closePopUp={closePopUpBuffer}
          handleSubmit={handleBufferEnable}
          status={''}
        />
      }
    </div>
  );
}


