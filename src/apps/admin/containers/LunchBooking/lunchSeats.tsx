import "../../../../sass/main.scss";
import "./styles.scss";
import {
  ADMIN_DASHBOARD,
  SERIAL_NUMBER,
  CAFETERIA_NAME,
  SITE_NAME,
  AVAILABLE_SEATS,
  IS_ACTIVE,
  EDIT_CAFE_FAILURE,
  EDIT_CAFE_SUCCESS,
} from "../../../common/constants/constants";
import getColumnsData from "../../../common/constants/columnsData";
import React, { useEffect, useState } from "react";
import { editCafe, editCafeFull } from "../../store/reducers/EditCafeReducer";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../../common/components/confirmationModal";
import { LunchSeatsActions } from "../../store/actions/LunchSeatsAction";
import EditCafeModal from "./editLunchSeatModal";
import TabularData from "../../../common/components/TabularData/tabularData";

import {
  lunchSeatsResponse,
  lunchSeatsFetching,
} from "../../store/reducers/LunchSeatsReducer";
import { useHistory, Redirect } from "react-router-dom";

export default function LunchBookingDetails(props: any) {
  const history = useHistory();
  const [editCafeModalOpen, setEditCafeModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [openConfirmation, toggleConfirmationModal] = useState(false);
  const [filterValue, setFilterValue] = useState("All Sites");
  const [searchValue, setSearchValue] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [getError, setGetError] = useState(true);
  const [cafeData, setCafeData] = useState(null as any);

  let lunchSeatsData: any = useSelector(lunchSeatsResponse);
  const loading: any = useSelector(lunchSeatsFetching);
  const editCafeFullResp = useSelector(editCafeFull);
  const editCafeResp: any = useSelector(editCafe);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LunchSeatsActions.getLunchSeatsRequest({}));
  }, [editCafeResp]);
  // useEffect(() => {
  //   dispatch(LunchSeatsActions.getLunchSeatsData({}));
  // }, [searchValue, filterValue]);

  function closeComfirmationPopUp() {
    toggleConfirmationModal(false);
  }

  function filterOnSite(val: any) {
    setFilterValue(val);
  }
  function filterOnSearch(val: any) {
    setSearchValue(val);
  }

  function handleChange(row: any) {
    setEditCafeModalOpen(true);
    setModalData(row);
  }
  function closeEditCafeModal() {
    setEditCafeModalOpen(false);
    setModalData(null);
  }
  function handleCafeOpen(data: any) {
    setRedirect(true);
    setCafeData(data);
  }
  function closeGetError() {
    setGetError(false);
  }

  function handleSubmit(value: any) {
    const patchCafeData = {
      number_of_seats: value.seats,
      is_active: value.isActive === "Active" ? "True" : "False",
    };

    dispatch(
      LunchSeatsActions.patchCafeRequest({
        path: { dynamicRoute: [value.id] },
        payload: patchCafeData,
      })
    );
    setTimeout(() => {
      setEditCafeModalOpen(false);
      setModalData(null);
      toggleConfirmationModal(true);
    }, 500);
  }

  let data: any = [];
  let siteNames: any = [];
  if (lunchSeatsData?.data) {
    data = lunchSeatsData.data.sites;
    lunchSeatsData.data.site_name.forEach((item: any) => {
      if (!siteNames.includes(item)) {
        siteNames.push(item);
      }
    });
  }
  let lunchSeatDetail: any = [];
  if (data && data.length > 0) {
    data.forEach((obj: any) => {
      lunchSeatDetail.push({
        id: obj.id,
        site_name: obj?.site_name,
        cafeteria_name: obj?.cafeteria_name,
        available_seats: obj?.total_seats,
        is_active: obj?.is_active ? "Active" : "Inactive",
      });
    });
    if (filterValue !== "All Sites") {
      lunchSeatDetail = lunchSeatDetail.filter(
        (item: any) => item.site_name === filterValue
      );
    }
    if (searchValue !== "") {
      lunchSeatDetail = lunchSeatDetail.filter((item: any) =>
        item.cafeteria_name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  }

  const columnsData = getColumnsData([
    SERIAL_NUMBER,
    CAFETERIA_NAME,
    SITE_NAME,
    AVAILABLE_SEATS,
    IS_ACTIVE,
  ]);

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/cafe-booking/cafe-view",
          state: cafeData,
        }}
      />
    );
  }

  return (
    <div className="layout-container">
      <TabularData
        loading={loading}
        parent={ADMIN_DASHBOARD}
        dataSource={lunchSeatDetail}
        editCafe={true}
        filterValue={filterValue}
        searchValue={searchValue}
        columnsData={columnsData}
        title={"Cafeteria Status"}
        setEditCafeteriaModalOpen={handleChange}
        filterArray={siteNames}
        filterOnChange={filterOnSite}
        filterOnSearch={filterOnSearch}
        openCafeView={handleCafeOpen}
      />

      {editCafeModalOpen && (
        <EditCafeModal
          closeEditCafe={closeEditCafeModal}
          modalData={modalData}
          handleSubmit={handleSubmit}
          buttonText={"SAVE"}
        />
      )}

      {openConfirmation && (
        <ConfirmationModal
          closeComfirmationPopUp={closeComfirmationPopUp}
          displayMessage={
            editCafeFullResp?.error
              ? EDIT_CAFE_FAILURE("")
              : EDIT_CAFE_SUCCESS(editCafeResp?.message)
          }
        />
      )}
      {lunchSeatsData?.errorCode && getError && (
        <ConfirmationModal
          closeComfirmationPopUp={closeGetError}
          displayMessage={
            lunchSeatsData.errorResp?.message ?? "Something went wrong"
          }
        />
      )}
    </div>
  );
}
