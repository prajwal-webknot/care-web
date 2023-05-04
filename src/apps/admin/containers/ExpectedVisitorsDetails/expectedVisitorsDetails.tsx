import "../../../../sass/main.scss";
import "./styles.scss";

import {
  ADMIN_DASHBOARD,
  // ARRIVED_ALERT_FAILURE,
  // ARRIVED_ALERT_SUCCESS,
  TEMP_VISIT_FAILURE,
  TEMP_VISIT_SUCCESS,
  STATUS_KEY,
  // EPASS_STATUS_APPROVED,
  EPASS_STATUS_ARRIVED,
  NAME_KEY,
  NATURE_OF_VISIT_KEY,
  RISK_STATUS_KEY,
  EPASS_STATUS_NOT_ALLOWED,
  ALLOW_ENTRY,
  DENY_ENTRY,
  ALLOCATED_SEAT,
  ADMIN_ROLE,
  SECURITY_ROLE,
  SECURITY_DASHBOARD,
  STARTING_TIME,
  ENDING_TIME,
  CONFERENCE_ROOM_NUMBER,
  EMAIL,
  PHONE_NUMBER,
  SEAT,
  FIRST_NAME,
  LAST_NAME,
  GUEST,
  CONFERENCE,
} from "../../../common/constants/constants";
import getColumnsData from "../../../common/constants/columnsData";
import {
  BODY_TEMPRATURE_LABEL,
  SAFE_TEMP,
  SETU_STATUS,
  GREEN,
} from "../../../common/constants/constants";
import React, { useEffect, useState } from "react";
import {
  statusChangeFull,
  statusChange,
} from "../../store/reducers/StatusChangeReducer";
import { tempVisitorResponse } from "../../store/reducers/TempVisitorReducer";
import { useDispatch, useSelector } from "react-redux";

// import AlertModal from "./alertModal";
import ConfirmationModal from "../../../common/components/confirmationModal";
import { EntrySurveyActions } from "../../store/actions/EntrySurveyAction";
import { TempVisitorActions } from "../../store/actions/TempVisitorAction";
import { ExpectedVisitorsActions } from "../../store/actions/ExpectedVisitorsAction";
import ModalMark from "./markModal";
import { StatusChangeActions } from "../../store/actions/StatusChangeAction";
import TabularData from "../../../common/components/TabularData/tabularData";
import TempVisitorModal from "./tempVisitorModal";
import {
  expectedVisitorList,
  expectedVisitorLoading,
} from "../../store/reducers/ExpectedVisitorsReducer";
import SwapSeatModal from "./swapSeatModal";
import { editExpectedVisitorError, editExpectedVisitorResponse } from "../../store/reducers/EditExpectedVisitorsReducer";

interface Props {
  isAdmin?: boolean
}

export default function ExpectedVisitorsDetails(props: Props) {

  const { isAdmin } = props;
  const [markModalOpen, setMarkModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [markId, setMarkId] = useState("");
  const [markTemp, setMarkTemp] = useState("");
  const [markArrival, setMarkArrival] = useState(false);
  const [marksetuStatus, setMarkSetuStatus] = useState("");
  const [alertPopUp, setAlertPopUp] = useState(false);
  const [visitorPopUp, setVisitorPopUp] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [survetAnswers, setsurveyAnswers] = useState([] as any);
  const [openConfirmation, toggleConfirmationModal] = useState(false);
  const [isVisitor, setIsVisitor] = useState(false);
  const [swapModalData, setSwapModalData] = useState<any>();
  const [expectedVisitorType, setExpectedVisitorType] = useState("roster");

  let expectedVisitorData: any = useSelector(expectedVisitorList);
  const loading: any = useSelector(expectedVisitorLoading);
  // const statusChangeFullResp = useSelector(statusChangeFull);
  const statusChangeResp = useSelector(statusChange);
  const tempVisitorResp: any = useSelector(tempVisitorResponse);
  const [swapSeatModalOpen, setSwapSeatModal] = useState(false);
  const [openSwapConfirmation, setSwapConfirmation] = useState(false);
  const [reRenderTable, setReRenderTable] = useState(false);
  const dispatch = useDispatch();
  const siteId = localStorage.getItem("siteId") ?? "";

  let editSwapResponseLocal: any;
  let editSwapResponse: any = useSelector(editExpectedVisitorResponse);
  let editSwapError: any = useSelector(editExpectedVisitorError);
  if (openSwapConfirmation) {
    // console.log(blockConferenceResponse);
    if (editSwapError) {
      editSwapResponseLocal = editSwapResponse?.errorResp?.message;
    }
    else {
      editSwapResponseLocal = editSwapResponse?.message;
    }
  }
  useEffect(() => {
    dispatch(
      ExpectedVisitorsActions.getExpectedVisitorsRequest({
        dynamicQueryParams: [
          { user_view: isAdmin ? "Admin" : "Security" },
          { view_name: "expected_visitors" },
        ],
      })
    );
  }, [statusChangeResp, reRenderTable]);

  function closeComfirmationPopUp() {
    toggleConfirmationModal(false);
    if (isVisitor) {
      setIsVisitor(false);
    } else if (markTemp !== SAFE_TEMP || marksetuStatus !== GREEN) {
      toggleAlertPopUp();
    }
  }

  function resetStates() {
    setMarkArrival(false);
    setMarkSetuStatus("");
    setMarkTemp("");
  }

  function handleSwapModal(e: any) {
    setSwapSeatModal(true);
    setSwapModalData(e);
  }
  function swapToggle() {
    setSwapSeatModal(false);
  }
  // function handleChange(row: any) {
  //   setMarkId(row.id);
  //   setName(row.name);
  //   openSurveyModal();
  // }

  function closeSurveyModal() {
    setMarkModalOpen(false);
    toggleConfirmationModal(true);
  }
  function onlyCloseSurveyPopup() {
    resetStates();
    setMarkModalOpen(false);
  }
  // function openSurveyModal() {
  //   resetStates();
  //   setMarkModalOpen(true);
  // }

  function visitorPopUpOpen() {
    setVisitorPopUp(!visitorPopUp);
  }

  function toggleAlertPopUp() {
    setAlertPopUp(!alertPopUp);
  }

  function handleSurveyChange(value: any, id: number, type: string) {
    if (type === BODY_TEMPRATURE_LABEL) {
      setMarkTemp(value);
    } else if (type === SETU_STATUS) {
      setMarkSetuStatus(value);
    }
    const duplicateSurveyAnswers = survetAnswers.filter(
      (obj: any) => obj.question_id !== id
    );
    duplicateSurveyAnswers.push({ question_id: id, answers: [value] });
    setsurveyAnswers(duplicateSurveyAnswers);
  }

  function handleCheckBoxChange(value: any) {
    setMarkArrival(!markArrival);
  }

  function handleSubmit(buttonText: string) {
    if (buttonText === ALLOW_ENTRY) {
      setAlertMessage("marked arrived");
    } else {
      setAlertMessage("denied entry");
    }
    const postSurveyRawData = {
      // employee_id: 21,
      epass_id: markId,
      survey_answers: survetAnswers,
      arrival: markArrival,
    };

    dispatch(EntrySurveyActions.postSurveyRequest(postSurveyRawData));

    if (markArrival && markTemp === SAFE_TEMP && marksetuStatus === GREEN) {
      dispatch(
        StatusChangeActions.statusChangeRequest({
          path: { dynamicRoute: [markId] },
          payload: { requested_state: EPASS_STATUS_ARRIVED },
        })
      );
    } else {
      dispatch(
        StatusChangeActions.statusChangeRequest({
          path: { dynamicRoute: [markId] },
          payload: { requested_state: EPASS_STATUS_NOT_ALLOWED },
        })
      );
    }
    setReRenderTable((val) => !val);
    setTimeout(() => {
      closeSurveyModal();
    }, 500);
  }
  function handleTempVisitSubmit(data: any) {
    dispatch(TempVisitorActions.postTempVisitorRequest(data));
    setReRenderTable((val) => !val);
    setTimeout(() => {
      setVisitorPopUp(false);
      setIsVisitor(true);
      toggleConfirmationModal(true);
    }, 500);
  }

  function handleSwapSubmit(e: any) {
    // console.log(e);
    dispatch(
      ExpectedVisitorsActions.editExpectedVisitorRequest({
        path: {},
        payload: e
      })
    );
    swapToggle();
    setSwapConfirmation(true);
    setReRenderTable((val) => !val);
  }

  function toggleSwapConfirmation() {
    setSwapConfirmation(false);
  }
  let data: any = [];
  if (expectedVisitorData?.data) {
    data = expectedVisitorData.data;
  }

  // interface objInfo {
  //   id: number,
  //   name: string,
  //   phone_number: string,
  //   nature_of_visit: string,
  //   risk_status: string,
  //   status: string,
  //   temp_status: string,
  //   user: {
  //     phone_number: string;
  //   };
  // }
  let expectedVisitorDetail: any = [];
  // const week = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  if (data && data.length > 0) {
    // console.log(data);
    data.forEach((obj: any) => {
      let date = new Date(obj?.valid_from * 1000).toLocaleString().split(',')[0];
      let start_time = new Date(obj?.valid_from * 1000).toLocaleTimeString();
      let end_time = new Date(obj?.valid_to * 1000).toLocaleTimeString();

      expectedVisitorDetail.push({
        id: obj.id,
        name: obj?.name,
        phone_number: obj?.phone_number,
        nature_of_visit: obj?.nature_of_visit,
        risk_status: obj?.risk_status,
        status: obj?.status === "approved" ? "Not Arrived" : "Arrived",
        temp_status: obj?.temp_status,
        alloted_seat: obj?.seat?.seat_number.length > 0 ? obj?.seat?.seat_number : "Not Alloted",
        conference_room_number: obj?.seat?.seat_number.length > 0 ? obj?.seat?.seat_number.split("-")[0] : "Not Alloted",
        starting_time: start_time,
        ending_time: end_time,
        date: date,
        seat: obj?.seat_booking?.seat?.seat_number.length > 0 ? obj?.seat_booking?.seat?.seat_number.split("-")[0] : "Not Alloted",
        email: obj?.email,
        first_name: obj?.first_name,
        username: obj?.first_name + " " + obj?.last_name,
        last_name: obj?.last_name,
        temporary_visitor_id: obj?.seat_booking?.temporary_visitor_id
      });
    });
  }

  function handleVisiterSelect(e: any) {
    // console.log(e);
    setExpectedVisitorType(e);
    dispatch(ExpectedVisitorsActions.getExpectedVisitorsRequest({
      dynamicQueryParams: [
        { user_view: isAdmin ? "Admin" : "Security" },
        { view_name: "expected_visitors" },
        { walkin_type: e }
      ],
    }));
    data = undefined;
  }
  const columnsDataGuest = getColumnsData([
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    PHONE_NUMBER,
    STARTING_TIME,
    ENDING_TIME,
    SEAT,
  ]);
  const columnsDataConfernce = getColumnsData([
    NAME_KEY,
    STARTING_TIME,
    ENDING_TIME,
    CONFERENCE_ROOM_NUMBER,
    // ALLOCATED_SEAT,
    RISK_STATUS_KEY,
  ]);

  const columnsData = getColumnsData([
    NAME_KEY,
    NATURE_OF_VISIT_KEY,
    RISK_STATUS_KEY,
    ALLOCATED_SEAT,
    STATUS_KEY,
  ]);
  const buttonText =
    markTemp === SAFE_TEMP && marksetuStatus === GREEN && markArrival
      ? ALLOW_ENTRY
      : DENY_ENTRY;
  return (
    <div className="layout-container">
      {
        expectedVisitorType === GUEST ?
          <TabularData
            loading={loading}
            parent={isAdmin ? ADMIN_DASHBOARD : SECURITY_DASHBOARD}
            dataSource={expectedVisitorDetail}
            expectedVisitor={true}
            persona={isAdmin ? ADMIN_ROLE : SECURITY_ROLE}
            visitorPopUpOpen={visitorPopUpOpen}
            handleVisitorSelect={handleVisiterSelect}
            expectedVisitorType={expectedVisitorType}
            columnsData={columnsDataGuest}
            title={"Expected Visitors"}
            setCheckoutModalOpen={handleSwapModal}
          /> :
          <></>
      }
      {
        expectedVisitorType === CONFERENCE ?
          <TabularData
            loading={loading}
            parent={isAdmin ? ADMIN_DASHBOARD : SECURITY_DASHBOARD}
            dataSource={expectedVisitorDetail}
            expectedVisitor={true}
            persona={isAdmin ? ADMIN_ROLE : SECURITY_ROLE}
            visitorPopUpOpen={visitorPopUpOpen}
            handleVisitorSelect={handleVisiterSelect}
            expectedVisitorType={expectedVisitorType}
            columnsData={columnsDataConfernce}
            title={"Expected Visitors"}
            setCheckoutModalOpen={handleSwapModal}
          /> :
          <></>
      }
      {
        expectedVisitorType !== CONFERENCE && expectedVisitorType !== GUEST
          ?
          <TabularData
            loading={loading}
            parent={isAdmin ? ADMIN_DASHBOARD : SECURITY_DASHBOARD}
            dataSource={expectedVisitorDetail}
            expectedVisitor={true}
            persona={isAdmin ? ADMIN_ROLE : SECURITY_ROLE}
            visitorPopUpOpen={visitorPopUpOpen}
            handleVisitorSelect={handleVisiterSelect}
            expectedVisitorType={expectedVisitorType}
            columnsData={columnsData}
            title={"Expected Visitors"}
            setCheckoutModalOpen={handleSwapModal}
          />
          : <></>

      }


      {markModalOpen && (
        <ModalMark
          disabled={markTemp && marksetuStatus && markArrival ? false : true}
          handleCheckBoxChange={handleCheckBoxChange}
          handleChange={handleSurveyChange}
          name={name}
          handleSubmit={handleSubmit}
          closePopUp={onlyCloseSurveyPopup}
          buttonText={buttonText}
        />
      )}
      {/* {alertPopUp && <AlertModal closePopUp={toggleAlertPopUp} />} */}
      {/* {openConfirmation && (
        <ConfirmationModal
          closeComfirmationPopUp={closeComfirmationPopUp}
          displayMessage={
            statusChangeFullResp?.error
              ? ARRIVED_ALERT_FAILURE(alertMessage)
              : ARRIVED_ALERT_SUCCESS(alertMessage)
          }
        />
      )} */}
      {openConfirmation && isVisitor && (
        <ConfirmationModal
          closeComfirmationPopUp={closeComfirmationPopUp}
          displayMessage={
            tempVisitorResp?.data?.errorCode
              ? TEMP_VISIT_FAILURE(
                tempVisitorResp.data.errorResp?.message ??
                "Error adding temporary visitor"
              )
              : TEMP_VISIT_SUCCESS(tempVisitorResp.data.message)
          }
        />
      )}
      {visitorPopUp && (
        <TempVisitorModal
          handleTempVisitSubmit={handleTempVisitSubmit}
          siteId={siteId}
          closePopUp={visitorPopUpOpen}
        // toggleAlertPopUp={toggleAlertPopUp}
        />

      )}
      {
        swapSeatModalOpen && (
          <SwapSeatModal
            modalData={swapModalData}
            handleSubmit={handleSwapSubmit}
            closePopUp={swapToggle}
            buttonText="Save"
          />
        )
      }

      {openSwapConfirmation && (
        <ConfirmationModal
          closeComfirmationPopUp={toggleSwapConfirmation}
          displayMessage={editSwapResponseLocal}
        />
      )}
    </div>
  );
}
