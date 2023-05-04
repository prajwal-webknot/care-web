import "../../../../sass/main.scss";
// import "./styles.scss";
import {
  SERIAL_NUMBER,
  USER_NAME,
  POORNATA_ID,
  SLOT,
} from "../../../common/constants/constants";
import getColumnsData from "../../../common/constants/columnsData";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { CafeViewActions } from "../../store/actions/CafeViewActions";
import TabularData from "../../../common/components/TabularData/tabularData";

import {
  cafeViewResponse,
  cafeViewFetching,
} from "../../store/reducers/CafeViewReducer";
import ConfirmationModal from "../../../common/components/confirmationModal";

export default function LunchBookingDetails(props: any) {
  const [slotValue, setSlotValue] = useState("All Slots");
  const [openConfirmation, toggleConfirmationModal] = useState(true);
  const locationState = props.location.state;
  let cafeViewData: any = useSelector(cafeViewResponse);
  const loading: any = useSelector(cafeViewFetching);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      CafeViewActions.getCafeViewRequest({
        dynamicQueryParams: [{ cafeteria_id: locationState.id }],
      })
    );
  }, []);
  function closeComfirmationPopUp() {
    toggleConfirmationModal(!openConfirmation);
  }
  let data: any = [];
  let slotNames: any = [];
  if (cafeViewData?.data) {
    data = cafeViewData.data.user_details_list;
  }
  let cafeViewDetails: any = [];
  if (!slotNames.includes("All Slots")) {
    slotNames.push("All Slots");
  }
  if (data && data.length > 0) {
    data.forEach((obj: any) => {
      if (!slotNames.includes(obj.slot)) {
        slotNames.push(obj.slot);
      }
      cafeViewDetails.push({
        username: obj?.username,
        poornata_id: obj?.poornata_id?obj?.poornata_id:"",
        slot: obj?.slot,
      });
    });
    if (slotValue !== "All Slots") {
      cafeViewDetails = cafeViewDetails.filter(
        (item: any) => item.slot === slotValue
      );
    }
  }
  function filterOnSlot(val: any) {
    setSlotValue(val);
  }

  const columnsData = getColumnsData([
    SERIAL_NUMBER,
    USER_NAME,
    POORNATA_ID,
    SLOT,
  ]);
  return (
    <div className="layout-container">
      <TabularData
        loading={loading}
        parent={"/cafe-booking"}
        dataSource={cafeViewDetails}
        columnsData={columnsData}
        title={`Cafeteria Status / ${locationState.cafeteria_name} Summary`}
        cafeView={true}
        filterArray={slotNames}
        filterValue={slotValue}
        filterOnChange={filterOnSlot}
        totalSeats={locationState.available_seats}
      />
      {cafeViewData?.errorCode && openConfirmation && (
        <ConfirmationModal
          closeComfirmationPopUp={closeComfirmationPopUp}
          displayMessage={
            cafeViewData.errorResp?.message ?? "Something went wrong"
          }
        />
      )}
    </div>
  );
}
