import "../../../../sass/main.scss";
// import "./styles.scss";
import {
  ADMIN_DASHBOARD,
  SERIAL_NUMBER,
  USER_NAME,
  POORNATA_ID,
  EMAIL,
  UNIT_BUSINESS,
  DATE,
  TIME,
  EMPLOYEE_NATURE_OF_VISIT,
  EPASS_STATUS,
  ALLOCATED_SEAT,
  SEAT_CLUSTER,
} from "../../../common/constants/constants";
import getColumnsData from "../../../common/constants/columnsData";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { SeatSummaryActions } from "../../store/actions/SeatSummaryAction";
import TabularData from "../../../common/components/TabularData/tabularData";
import EditSeatModal from "./editSeatModal";
import {
  seatSummaryResponse,
  seatSummaryFetching,
} from "../../store/reducers/SeatSummaryReducer";
import ConfirmationModal from "../../../common/components/confirmationModal";
import moment from "moment";
import {
  editSeatSummary,
  editSeatSummaryFull,
} from "../../store/reducers/EditSeatSummaryReducer";
import { SeatSummarySeatsActions } from "../../store/actions/SeatSummarySeatsAction";
export default function LunchBookingDetails(props: any) {
  const [ePassValue, setEPassValue] = useState("All ePass Status");
  const [departmentSlot, setDepartmentSlot] = useState(-1 as any);
  const [searchValue, setSearchValue] = useState("");
  const [getError, setGetError] = useState(true);
  const [openConfirmation, toggleConfirmationModal] = useState(false);
  const [editSeatModalOpen, setEditSeatModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null as any);
  const [dateValue, setDateValue] = useState({
    date: moment().startOf("day").format("DD-MM-YYYY"),
    timeStamp: moment().startOf("day").unix(),
  });
  let seatSummaryData: any = useSelector(seatSummaryResponse);
  const loading: any = useSelector(seatSummaryFetching);
  const editSeatSummaryRespFull = useSelector(editSeatSummaryFull);
  const editSeatSummaryResp: any = useSelector(editSeatSummary);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      SeatSummaryActions.getSeatSummaryRequest({
        dynamicQueryParams: [{ filter_date: dateValue.timeStamp }],
      })
    );
  }, [dateValue, editSeatSummaryResp]);
  let data: any = [];

  function filterOnStatus(val: any) {
    setEPassValue(val);
  }
  function filterOnSearch(val: any) {
    setSearchValue(val);
  }
  function departmentOnChange(val: any) {
    setDepartmentSlot(val);
  }
  function closeComfirmationPopUp() {
    toggleConfirmationModal(!openConfirmation);
  }
  function dateOnChange(val: any) {
    setDateValue({
      date: moment.unix(parseFloat(val)).startOf("day").format("DD-MM-YYYY"),
      timeStamp: val,
    });
  }
  function handleChange(row: any) {
    setEditSeatModalOpen(true);
    setModalData(row);
  }
  function closeEditSeatModal() {
    setEditSeatModalOpen(false);
    // setModalData(null);
  }
  function handleSubmit(value: any) {
    let obj: any = {};
    obj.epass_id = value.ePassId;
    obj.seat_id = value.seatId;
    dispatch(
      SeatSummarySeatsActions.patchSeatSummaryRequest({
        path: { },
        payload: obj,
      })
    );
    setTimeout(() => {
      setEditSeatModalOpen(false);
      setModalData(null);
      toggleConfirmationModal(true);
    }, 500);
  }
  function closeGetError() {
    setGetError(false);
  }
  let ePassSlots: any = ["All ePass Status", "CHECKED_IN", "CHECKED_OUT","Expire"];
  let departmentSlots: any = [{ id: -1, unit_bu: "All Seat Cluster" }];
  let tempDateArray: any = [];
  let dateArray: any = [dateValue];
  if (seatSummaryData?.data) {
    data = seatSummaryData.data.desking_report;
    departmentSlots = [];
    departmentSlots = seatSummaryData.data.seat_unit_bu;
    dateArray = [];
    tempDateArray = seatSummaryData.data?.date_list?.sort();
    tempDateArray.forEach((data: any) => {
      dateArray.push({
        date: moment.unix(parseFloat(data)).startOf("day").format("DD-MM-YYYY"),
        timeStamp: data,
      });
    });
  }

  let seatSummaryDetails: any = [];
  if (data && data.length > 0) {
    data.forEach((obj: any) => {
      seatSummaryDetails.push({
        username:
          obj.user_details.first_name + " " + obj.user_details.last_name,
        poornata_id: obj.user_details?.poornata_id
          ? obj.user_details.poornata_id
          : "",
        email: obj.user_details.email ? obj.user_details.email : "",
        unit_business: obj.user_details?.unit_bu?.id
          ? obj.user_details.unit_bu.unit?.name +
            "-" +
            obj.user_details.unit_bu?.bu?.name
          : "",
        date: obj.created_on,
        time: obj.created_on,
        employee_nature_of_visit: obj.user_details?.user_type,
        epass_status: obj.epass_details?.status ?? "",
        epass_id: obj.epass_details?.id ?? null,
        alloted_seat: obj.allotted_seat ? obj.allotted_seat.seat_number : "",
        alloted_seat_id: obj.allotted_seat ? obj.allotted_seat.id : null,
        seat_cluster: obj.allotted_seat?.cluster
          ? obj.allotted_seat.cluster.unit.name +
            "-" +
            obj.allotted_seat.cluster.bu.name
          : "",
        cluster_id: obj.allotted_seat?.cluster
          ? obj.allotted_seat.cluster.id
          : null,
        floor: obj.user_details?.floor ?? null,
        seat_preference: obj.user_details?.seat_preference ?? "",
        site_id: obj.user_details?.site?.id ?? null,
        site_name: obj.user_details?.site?.name ?? "",
      });
    });
    if (ePassValue !== "All ePass Status") {
      seatSummaryDetails = seatSummaryDetails?.filter(
        (item: any) =>
          item.epass_status.toLowerCase() === ePassValue.toLowerCase()
      );
    }
    if (searchValue !== "") {
      seatSummaryDetails = seatSummaryDetails?.filter((item: any) => {
        return (
          item.username.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.poornata_id?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.email?.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
    }
    if (departmentSlot !== -1) {
      if (!departmentSlot) {
        seatSummaryDetails = seatSummaryDetails?.filter(
          (item: any) => !item.cluster_id && item.seat_cluster === ""
        );
      } else {
        seatSummaryDetails = seatSummaryDetails?.filter(
          (item: any) => item.cluster_id === departmentSlot
        );
      }
    }
  }

  const columnsData = getColumnsData([
    SERIAL_NUMBER,
    USER_NAME,
    POORNATA_ID,
    EMAIL,
    UNIT_BUSINESS,
    DATE,
    TIME,
    EMPLOYEE_NATURE_OF_VISIT,
    EPASS_STATUS,
    ALLOCATED_SEAT,
    SEAT_CLUSTER,
  ]);
  return (
    <div className="layout-container">
      <TabularData
        loading={loading}
        parent={ADMIN_DASHBOARD}
        dataSource={seatSummaryDetails}
        columnsData={columnsData}
        title={"Seat Allotment Summary"}
        seatSummary={true}
        dateArray={dateArray}
        dateValue={dateValue}
        filterArray={ePassSlots}
        departmentArray={departmentSlots}
        departmentValue={departmentSlot}
        filterValue={ePassValue}
        filterOnChange={filterOnStatus}
        filterOnSearch={filterOnSearch}
        departmentOnChange={departmentOnChange}
        dateOnChange={dateOnChange}
        setEditCafeteriaModalOpen={handleChange}
      />
      {editSeatModalOpen && (
        <EditSeatModal
          closeEditCafe={closeEditSeatModal}
          modalData={modalData}
          handleSubmit={handleSubmit}
          buttonText={"SAVE"}
          // siteWithSeatDetails={siteWithSeatDetails}
        />
      )}
      {seatSummaryData?.errorCode && getError && (
        <ConfirmationModal
          closeComfirmationPopUp={closeGetError}
          displayMessage={
            seatSummaryData.errorResp?.message ?? "Something went wrong"
          }
        />
      )}
      {openConfirmation && (
        <ConfirmationModal
          closeComfirmationPopUp={closeComfirmationPopUp}
          displayMessage={
            editSeatSummaryRespFull?.error
              ? editSeatSummaryResp.errorResp?.message ?? "Something went wrong"
              : editSeatSummaryResp?.message
          }
        />
      )}
    </div>
  );
}
