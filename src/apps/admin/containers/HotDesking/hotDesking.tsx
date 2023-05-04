import "../../../../sass/main.scss";
import "./styles.scss";

import {
  ADMIN_DASHBOARD,
  SERIAL_NUMBER,
  USER_NAME,
  EMAIL,
  EMPLOYEE_NATURE_OF_VISIT,
  SITE_NAME,
  UNIT_NAME,
  ALLOCATED_SEAT,
  EDIT_HOT_DESK_FAILURE,
  EDIT_HOT_DESK_SUCCESS,
} from "../../../common/constants/constants";
import getColumnsData from "../../../common/constants/columnsData";

import React, { useEffect, useState } from "react";
// import {
//   statusChangeFull,
//   statusChange,
// } from "../../store/reducers/HotDeskingReducer";
import { useDispatch, useSelector } from "react-redux";

// import AlertModal from "./alertModal";
import ConfirmationModal from "../../../common/components/confirmationModal";

import { HotDeskingActions } from "../../store/actions/HotDeskingActions";

import TabularData from "../../../common/components/TabularData/tabularData";

import {
  hotDeskingResponse,
  hotDeskingFetching,
} from "../../store/reducers/HotDeskingReducer";
import {
  editHotDesk,
  editHotDeskFull,
} from "../../store/reducers/EditHotDeskingReducer";
import EditHotDeskModal from "./editHotDeskModal";
export default function HotDeskingDetails(props: any) {
  const [editHotDeskModalOpen, setEditHotDeskModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [openConfirmation, toggleConfirmationModal] = useState(false);
  const [getError, setGetError] = useState(true);

  let hotDeskingData: any = useSelector(hotDeskingResponse);
  const loading: any = useSelector(hotDeskingFetching);
  const editHotDeskFullResp = useSelector(editHotDeskFull);
  const editHotDeskResp: any = useSelector(editHotDesk);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(HotDeskingActions.getHotDeskingRequest({}));
  }, [editHotDeskResp]);

  function handleChange(row: any) {
    setEditHotDeskModalOpen(true);
    setModalData(row);
  }
  function closeEditCafeModal() {
    setEditHotDeskModalOpen(false);
    setModalData(null);
  }

  function handleSubmit(value: any) {
    let obj: any = {};
    obj.nature_of_visit = value.natureOfVisit;
    obj.seat = value.seat_id ? value.seat_id : null;
    obj.seat_preference = value.seat_preference;
    obj.user_floor = value.user_floor;
    dispatch(
      HotDeskingActions.patchHotDeskRequest({
        path: { dynamicQueryParams: [{ user_seat_id: value.id }] },
        payload: obj,
      })
    );
    setTimeout(() => {
      setEditHotDeskModalOpen(false);
      setModalData(null);
      toggleConfirmationModal(true);
    }, 500);
  }
  function closeComfirmationPopUp() {
    toggleConfirmationModal(false);
  }
  function filterOnSearch(val: any) {
    setSearchValue(val);
  }
  function closeGetError() {
    setGetError(false);
  }
  let data: any = [];

  let siteWithSeatDetails: any = [];
  if (hotDeskingData?.data) {
    data = hotDeskingData.data.user_seating_details;
    siteWithSeatDetails = hotDeskingData.data.seat_details;
  }

  let hotDeskingUserDetail: any = [];

  if (data && data.length > 0) {
    data.forEach((obj: any, index: any) => {
      hotDeskingUserDetail.push({
        id: obj?.id,
        username: obj?.user_name ?? "",
        email: obj?.email ?? "",
        // employee_id: obj?.employee_id,
        employee_nature_of_visit: obj?.nature_of_visit ?? "",
        site_name: obj.site_details?.name ?? "",
        unit_name: obj.unit_details?.name ?? "",
        alloted_seat: obj.seat_allocated?.seat_number ?? "",
        seat_id: obj.seat_allocated?.seat_id ?? null,
        site_id: obj.site_details?.id ?? null,
        seat_preference: obj.seat_preference,
        floor_preference: obj.user_floor,
      });
    });

    if (searchValue !== "") {
      hotDeskingUserDetail = hotDeskingUserDetail.filter(
        (item: any) =>
          item.username.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.email.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  }

  const columnsData = getColumnsData([
    SERIAL_NUMBER,
    USER_NAME,
    EMAIL,
    EMPLOYEE_NATURE_OF_VISIT,
    SITE_NAME,
    UNIT_NAME,
    // EMPLOYEE_SITE_NAME,
    ALLOCATED_SEAT,
  ]);
  return (
    <div className="layout-container">
      <TabularData
        loading={loading}
        parent={ADMIN_DASHBOARD}
        dataSource={hotDeskingUserDetail}
        editHotDesk={true}
        columnsData={columnsData}
        title={"Hot Desking"}
        setEditCafeteriaModalOpen={handleChange}
        searchValue={searchValue}
        filterOnSearch={filterOnSearch}
      />

      {editHotDeskModalOpen && (
        <EditHotDeskModal
          closeEditCafe={closeEditCafeModal}
          modalData={modalData}
          handleSubmit={handleSubmit}
          buttonText={"SAVE"}
          siteWithSeatDetails={siteWithSeatDetails}
          userDetails={hotDeskingUserDetail}
        />
      )}

      {openConfirmation && (
        <ConfirmationModal
          closeComfirmationPopUp={closeComfirmationPopUp}
          displayMessage={
            editHotDeskFullResp?.error
              ? editHotDeskResp.errorResp?.message ?? "Something went wrong"
              : EDIT_HOT_DESK_SUCCESS(editHotDeskResp?.message)
          }
        />
      )}
      {hotDeskingData?.errorCode && getError && (
        <ConfirmationModal
          closeComfirmationPopUp={closeGetError}
          displayMessage={
            hotDeskingData.errorResp?.message ?? "Something went wrong"
          }
        />
      )}
    </div>
  );
}