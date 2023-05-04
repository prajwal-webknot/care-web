import React, { useEffect, useState } from "react";
import { TYPE_KEY, REVOKE_ACCESS_FAILURE, REVOKE_ACCESS_SUCCESS, HR_DASHBOARD, NAME_KEY, RISK_STATUS_KEY } from "../../../common/constants/constants";
import '../../../../sass/main.scss';
import '../../../../sass/dashboard.scss';

import TabularData from '../../../common/components/TabularData/tabularData';
import { useDispatch, useSelector } from 'react-redux';
import { NewRegistrationsSelect, newRegistrationsLoading } from "../../../hr/store/reducers/NewRegistrationsReducer";
import { NewRegistrationsActions } from "../../store/actions/NewRegistrationsAction";
import { statusChangeFull } from "../../../admin/store/reducers/StatusChangeReducer";
import { dashboardStatusChange } from "../../../common/store/dashboardStatus/dashboardStatusReducer";
import getColumnsData from "../../../common/constants/columnsData";
import ConfirmationModal from "../../../common/components/confirmationModal";
import { UserDetailsActions } from "../../../common/store/userDetails/UserDetailsActions";
import { deleteUserSelect } from "../../../common/store/userDetails/deleteUserReducer";

export default function NewRegistrations(props: any) {
  const dispatch = useDispatch();

  // States
  const [openConfirmation, toggleConfirmationModal] = useState(false);
  const [markId, setMarkId] = useState<Number>();
  const [responseModal, setResponseModal] = useState(false);

  // Selectors
  const dashboardStatus = useSelector(dashboardStatusChange);
  const statusChangeFullResp = useSelector(statusChangeFull);
  const deleteUserResp: any = useSelector(deleteUserSelect);
  let newRegistrationsResp: any = useSelector(NewRegistrationsSelect);

  useEffect(() => {
    dispatch(NewRegistrationsActions.newRegistrationsRequest({
      dynamicQueryParams: [
        { user_view: 'HR' },
        { site_ids: [dashboardStatus?.site?.id] },
        { unit_ids: [dashboardStatus?.unit?.id] },
      ]
    }));
  }, [dashboardStatus, deleteUserResp]);

  function openResonseModal() {
    setResponseModal(true);
  }

  function closeComfirmationPopUp() {
    toggleConfirmationModal(false);
    setResponseModal(false);
  }

  const handleClick = (userId: number) => {
    toggleConfirmationModal(true);
    setMarkId(userId);
  };

  function handleChange(row: any) {
    toggleConfirmationModal(false);
  }

  const handleClickYes = () => {
    toggleConfirmationModal(false);
    dispatch(UserDetailsActions.deleteUserRequest({
      dynamicRoute: [markId]
    }));

    setTimeout(() => {
      openResonseModal();
    }, 1000);
  };
  const handleClickNo = () => {
    toggleConfirmationModal(false);

  };
  const newUsers = newRegistrationsResp?.data?.emp_data ?? [];

  let newUserObjs: any = [];
  newUsers?.forEach((obj: any) => {
    newUserObjs.push(
      {
        id: obj.user_id,
        name: `${obj?.first_name ?? ""} ${obj?.last_name ?? ""}`,
        type: obj?.nature_of_visit,
        risk_status: obj?.risk_status
      });
  });

  const columnsData = getColumnsData([NAME_KEY, TYPE_KEY, RISK_STATUS_KEY]);
  const loading: any = useSelector(newRegistrationsLoading);

  return (
    <div className="layout-container">
      <TabularData
        loading={loading}
        parent={HR_DASHBOARD}
        dataSource={newUserObjs}
        columnsData={columnsData}
        title={"New Registrations"}
        revokeOnly
        handleButtonClick={handleClick}
        setCheckoutModalOpen={handleChange}
      />
      {openConfirmation &&
        <ConfirmationModal
          handleClickYes={handleClickYes}
          handleClickNo={handleClickNo}
          closeComfirmationPopUp={closeComfirmationPopUp}
          displayMessage={"Do you want to revoke the access of selected user?"}
          confirmRequest
        />
      }

      {responseModal &&
        <ConfirmationModal
          closeComfirmationPopUp={closeComfirmationPopUp}
          displayMessage={statusChangeFullResp.error ? REVOKE_ACCESS_FAILURE : REVOKE_ACCESS_SUCCESS}
        />
      }
    </div>
  );
}


