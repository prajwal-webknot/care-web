import "./styles.scss";

import { Button, Modal, Row, Select } from "antd";

import React, { useEffect, useState } from "react";
import deleteIcon from "../../../common/assets/images/delete.svg";
// import { userDetails } from "../../../common/store/userDetails/UserDetailsReducer";
// import Item from "antd/lib/list/Item";
import { useDispatch, useSelector } from "react-redux";
import { HotDeskingActions } from "../../store/actions/HotDeskingActions";
import { availableSeatsResponse } from "../../store/reducers/GetAvailableSeatsReducer";

const { Option } = Select;

interface Props {
  closePopUp?: () => any;
  handleSubmit: (value: any) => any;
  modalData: any;
  isGuest?: boolean;
  buttonText: string;
}

export default function SwapSeatModal(props: Props) {
  const {
    modalData,
    buttonText,
    handleSubmit,
    isGuest
  } = props;
  const dispatch = useDispatch();
  const [natureOfVisit, setNatureOfVisit] = useState(
    modalData.employee_nature_of_visit
  );
  const [seatType, setSeatType] = useState(modalData.seat_preference ?? "None");
  const [floorType, setFloorType] = useState();
  // const [allotedSeat, setAllotedSeat] = useState(
  //   modalData.alloted_seat ? modalData.seat_id : null
  // );

  const [selectedAvailableSeat, SetSelectedAvailableSeat] = useState<number | null>(null);
  // const [seatDetails, setSeatDetails] = useState([] as any);
  // const [seatTypeDetails, setSeatTypeDetails] = useState([] as any);
  // const [floorTypeDetails, setFloorTypeDetails] = useState([] as any);
  // const [nonRegularSelected, setNonRegularSelected] = useState(false);
  useEffect(() => {
  }, [seatType, floorType, natureOfVisit]);
  function handleSave() {
    if (isGuest) {
      handleSubmit({
        epass_id: modalData.id,
        seat_id: selectedAvailableSeat,
        temporary_visitor_id: modalData.temporary_visitor_id
      })
    }
    else {
      handleSubmit({
        epass_id: modalData.id,
        seat_id: selectedAvailableSeat,
      });
    }
  }
  // function changeNatureOfVisit(val: any) {
  //   setNatureOfVisit(val);
  //   // val === "non_regular"
  //   //   ? setNonRegularSelected(true)
  //   //   : setNonRegularSelected(false);
  // }
  let availableSeat = useSelector(availableSeatsResponse);
  let availableSeatLocal: any;
  // if (typeof availableSeatLocal === 'undefined' || (availableSeatLocal && availableSeatLocal.length < 0)) {
  //   console.log(availableSeat);
  //   availableSeatLocal = availableSeat;
  // }
  if (!availableSeatLocal) {
    console.log(availableSeat);
    availableSeatLocal = availableSeat;
  }
  useEffect(() => {
    dispatch(HotDeskingActions.getAvailableSeatsRequest({
      dynamicQueryParams: [
        {
          function_id: 1,
          type: 'all'
        },
      ],
    }))
  }, [])
  return (
    <Modal
      visible
      // width={700}
      onCancel={props.closePopUp}
      title={
        <>
          <div className="modal-header">
            {modalData.name}
            {`(${modalData.id})`}
            <br></br>
            {`Alloted Seat: ${modalData?.alloted_seat}`}
          </div>
          <p>{modalData.site_name}</p>
        </>
      }
      footer={null}
      closeIcon={<img src={deleteIcon} className="cancel-button" alt="" />}
    >
      <div className="flex flex-column mark-modal-body-hot-desking centerAlign">
        <label>Floor Preference</label>
        <Select
          className={"modal-input"}
          // disabled={nonRegularSelected}
          // showSearch={true}
          size={"large"}
          // placeholder={allotedSeat ? null : "Select Seat"}
          value={floorType}
          // style={{ width: 400 }}
          onChange={(val: any) => setFloorType(val)}
        >
          {[1, 2, 3, 4, 5]?.map((floorType: any, index: any) => (
            <Option key={index} value={floorType}>
              {floorType}
            </Option>
          ))}
        </Select>

        {/* <label>Alloted Seat</label>
        <Button
          className={"modal-input"}
          // disabled={nonRegularSelected}
          size={"large"}
          // placeholder={allotedSeat ? null : "Select Seat"}
          value={allotedSeat}
          // style={{ width: 400 }}
          onChange={(val) => setAllotedSeat(val)}
        >
          {modalData?.alloted_seat}
        </Button> */}
        <label>Available Seat</label>
        <Select
          className={"modal-input"}
          // disabled={nonRegularSelected}
          // showSearch={true}
          size={"large"}
          // placeholder={allotedSeat ? null : "Select Seat"}
          // style={{ width: 400 }}
          onChange={(val: any) => SetSelectedAvailableSeat(val)}
        >
          {availableSeatLocal?.data.function_seats?.filter((data: any) => seatType !== "None" ? data.floor === floorType && data.type === seatType : data.floor === floorType).map((seat: any, index: any) => (
            <Option key={seat?.seat_number} value={seat?.id}>
              {seat?.seat_number}
            </Option>
          ))}
          {availableSeatLocal?.data.buffer_seats?.filter((data: any) => seatType !== "None" ? data.floor === floorType && data.type === seatType : data.floor === floorType).map((seat: any, index: any) => (
            <Option key={seat?.seat_number} value={seat?.id}>
              {`buffer seat `}{seat?.seat_number}
            </Option>
          ))}
          {/* {availableSeatLocal?.data.guest_seats?.map((seat: any, index: any) => (
            <Option key={seat?.seat_number} value={seat?.seat_number}>
              {`Guest seat `}{seat?.seat_number}
            </Option>
          ))} */}

        </Select>

      </div>

      <Row justify="end" align="middle" style={{ marginTop: "2.5rem" }}>
        <Button type="primary" size={"large"} onClick={handleSave}>
          {buttonText}
        </Button>
      </Row>
    </Modal>
  );
}
