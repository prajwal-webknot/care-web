import "./styles.scss";

import {
  ADMIN_DASHBOARD,
  NAME_KEY,
  NATURE_OF_VISIT_KEY,
  RISK_STATUS_KEY,
  PASS_EXPIRE_TIME_KEY,
  BLUEOOTH_STATUS_KEY,
  TEMP_VISIT_FAILURE,
  TEMP_VISIT_SUCCESS,
} from "../../../common/constants/constants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmployeesActions } from "../../store/actions/EmployeesListAction";
import ModalCheckout from "./modalCheckout";
import { StatusChangeActions } from "../../store/actions/StatusChangeAction";
import TabularData from "../../../common/components/TabularData/tabularData";
import {
  employeeListResp,
  employeeListLoading,
} from "../../store/reducers/EmployeesListReducer";
import getColumnsData from "../../../common/constants/columnsData";
import { statusChange } from "../../store/reducers/StatusChangeReducer";
import ConfirmationModal from "../../../common/components/confirmationModal";

export default function PremiseHeadCountDetail(props: any) {
  const dispatch = useDispatch();

  // States
  const [epassId, setEpassId] = useState("");
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [isVisitor, setIsVisitor] = useState(false);
  const [openConfirmation, toggleConfirmationModal] = useState(false);

  // Selectors
  let empListResp: any = useSelector(employeeListResp);
  const statusChangeResp: any = useSelector(statusChange);

  useEffect(() => {
    setIsVisitor(false);
    dispatch(
      EmployeesActions.getEmployeesRequest({
        dynamicQueryParams: [{ status: "checked_in" }, { user_view: "Admin" }],
      })
    );
  }, [statusChangeResp]);

  useEffect(() => {
    setCheckoutModalOpen(props.value);
  }, [props.value, props.id]);

  function handleChange(row: any) {
    closePopUp();
    setEpassId(row.id);
    setCheckoutName(row.name);
    if (row.nature_of_visit === "VISITOR") {
      setIsVisitor(true);
    }
  }

  function closePopUp() {
    setCheckoutModalOpen(!checkoutModalOpen);
  }
  function closeComfirmationPopUp() {
    toggleConfirmationModal(!openConfirmation);
  }
  function handleSubmit() {
    if (isVisitor) {
      dispatch(
        StatusChangeActions.statusChangeTempRequest({
          path: { dynamicQueryParams: [{ temporary_visitor_id: epassId }] },
          payload: {},
        })
      );
      setIsVisitor(false);
    } else {
      dispatch(
        StatusChangeActions.statusChangeRequest({
          path: { dynamicRoute: [epassId] },
          payload: { requested_state: "checked_out" },
        })
      );
    }
    closePopUp();
    toggleConfirmationModal(!openConfirmation);
  }

  const empList = empListResp?.data ?? [];
  let premiseCountDetail: any = [];
  if (empList && empList.length > 0) {
    empList.forEach((obj: any) => {
      premiseCountDetail.push({
        id: obj.id,
        name: obj?.name,
        status: obj?.nature_of_visit === "VISITOR" ? "checked_in" : obj?.status,
        nature_of_visit: obj?.nature_of_visit,
        risk_status: obj?.risk_status,
        bluetooth_status: obj?.bluetooth_status,
        pass_expiring_time: obj?.valid_to,
      });
    });
  }

  const columnsData = getColumnsData([
    NAME_KEY,
    NATURE_OF_VISIT_KEY,
    RISK_STATUS_KEY,
    PASS_EXPIRE_TIME_KEY,
    BLUEOOTH_STATUS_KEY,
  ]);
  const loading: any = useSelector(employeeListLoading);

  return (
    <div className="layout-container">
      <TabularData
        loading={loading}
        parent={ADMIN_DASHBOARD}
        dataSource={premiseCountDetail}
        columnsData={columnsData}
        title={"Current Premise Headcount"}
        setCheckoutModalOpen={handleChange}
        checkout={true}
      />
      {checkoutModalOpen && (
        <ModalCheckout
          title="Record Exit"
          buttonTest="Confirm"
          message={`Do you want to record exit for ${checkoutName}`}
          name={checkoutName}
          handleSubmit={handleSubmit}
          closePopUp={closePopUp}
        />
      )}
      {openConfirmation && (
        <ConfirmationModal
          closeComfirmationPopUp={closeComfirmationPopUp}
          displayMessage={
            statusChangeResp?.error
              ? TEMP_VISIT_FAILURE("Error while Check Out")
              : TEMP_VISIT_SUCCESS(`${checkoutName} is Checked Out successfully`)
          }
        />
      )}
    </div>
  );
}
