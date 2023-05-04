import "../../../../sass/main.scss";
import {
  ADMIN_DASHBOARD,
  SERIAL_NUMBER,
  USER_NAME,
  POORNATA_ID,
  SITE_NAME,
  ADDED_BY,
} from "../../../common/constants/constants";
import getColumnsData from "../../../common/constants/columnsData";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RosterReportActions } from "../../store/actions/RosterReportAction";
import TabularData from "../../../common/components/TabularData/tabularData";

import {
  rosterReportResponse,
  rosterReportFetching,
} from "../../store/reducers/RosterReportReducer";
import moment from "moment";
import ConfirmationModal from "../../../common/components/confirmationModal";
export default function LunchBookingDetails(props: any) {
  const [siteValue, setSiteValue] = useState("All Sites");
  const [dateValue, setDateValue] = useState({
    date: moment().startOf("day").format("DD-MM-YYYY"),
    timeStamp: moment().startOf("day").add(1, "day").unix(),
  });
  const [searchValue, setSearchValue] = useState("");
  const [openConfirmation, toggleConfirmationModal] = useState(true);
  let rosterReportData: any = useSelector(rosterReportResponse);
  const loading: any = useSelector(rosterReportFetching);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      RosterReportActions.getRosterReportRequest({
        dynamicQueryParams: [{ filter_date: dateValue.timeStamp }],
      })
    );
  }, [dateValue]);
  let data: any = [];
  let tempDateArray: any = [];
  let dateArray: any = [dateValue];
  if (rosterReportData?.data) {
    data = rosterReportData.data.roster_data;
    dateArray=[];
    tempDateArray = rosterReportData.data?.date_list?.sort();
    tempDateArray.forEach((data: any) => {
      dateArray.push({
        date: moment
          .unix(parseFloat(data))
          .startOf("day")
          .subtract(1, "day")
          .format("DD-MM-YYYY"),
        timeStamp: data,
      });
    });
  }
  

  let rosterReportDetails: any = [];
  let siteSlots: any = ["All Sites"];
  if (data && data.length > 0) {
    data.forEach((obj: any) => {
      rosterReportDetails.push({
        username: obj?.user?.user_name,
        poornata_id: obj?.user?.poornata_id ? obj?.user?.poornata_id : "",
        site_name: obj?.user?.site?.name,
        added_by: obj?.added_by?.user_name,
      });
      if (!siteSlots.includes(obj?.user?.site?.name)) {
        siteSlots.push(obj.user.site.name);
      }
    });
    if (siteValue !== "All Sites") {
      rosterReportDetails = rosterReportDetails.filter(
        (item: any) => item.site_name.toLowerCase() === siteValue.toLowerCase()
      );
    }
    if (searchValue !== "") {
      rosterReportDetails = rosterReportDetails.filter((item: any) => {
        return (
          item.username.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.poornata_id.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
    }
  }
  function dateOnChange(val: any) {
    setDateValue({
      date: moment
        .unix(parseFloat(val))
        .startOf("day")
        .subtract(1, "day")
        .format("DD-MM-YYYY"),
      timeStamp: val,
    });
  }
  function filterOnSite(val: any) {
    setSiteValue(val);
  }
  function closeComfirmationPopUp() {
    toggleConfirmationModal(!openConfirmation);
  }
  function filterOnSearch(val: any) {
    setSearchValue(val);
  }

  const columnsData = getColumnsData([
    SERIAL_NUMBER,
    USER_NAME,
    POORNATA_ID,
    SITE_NAME,
    ADDED_BY,
  ]);
  return (
    <div className="layout-container">
      <TabularData
        loading={loading}
        parent={ADMIN_DASHBOARD}
        dataSource={rosterReportDetails}
        columnsData={columnsData}
        title={"Roster Report"}
        roasterReport={true}
        filterArray={siteSlots}
        filterValue={siteValue}
        dateArray={dateArray}
        dateValue={dateValue}
        dateOnChange={dateOnChange}
        filterOnChange={filterOnSite}
        filterOnSearch={filterOnSearch}
      />
      {rosterReportData?.errorCode && openConfirmation && (
        <ConfirmationModal
          closeComfirmationPopUp={closeComfirmationPopUp}
          displayMessage={
            rosterReportData.errorResp?.message ?? "Something went wrong"
          }
        />
      )}
    </div>
  );
}
