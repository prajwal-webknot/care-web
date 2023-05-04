import "./styles.scss";

import { Button, Modal, Row, Select } from "antd";

import React, { useEffect, useState } from "react";
import deleteIcon from "../../../common/assets/images/delete.svg";
// import { userDetails } from "../../../common/store/userDetails/UserDetailsReducer";
// import Item from "antd/lib/list/Item";

const { Option } = Select;

interface Props {
  closeEditCafe?: () => any;
  handleSubmit: (value: any) => any;
  modalData: any;
  buttonText: string;
  siteWithSeatDetails: any;
  userDetails: any;
}

export default function EditCafeModal(props: Props) {
  const {
    userDetails,
    modalData,
    buttonText,
    handleSubmit,
    siteWithSeatDetails,
  } = props;
  const [natureOfVisit, setNatureOfVisit] = useState(
    modalData.employee_nature_of_visit
  );
  const [seatType, setSeatType] = useState(modalData.seat_preference ?? "None");
  const [floorType, setFloorType] = useState(
    modalData.floor_preference ?? "None"
  );
  const [allotedSeat, setAllotedSeat] = useState(
    modalData.alloted_seat ? modalData.seat_id : null
  );

  const [seatDetails, setSeatDetails] = useState([] as any);
  const [seatTypeDetails, setSeatTypeDetails] = useState([] as any);
  const [floorTypeDetails, setFloorTypeDetails] = useState([] as any);
  // const [nonRegularSelected, setNonRegularSelected] = useState(false);
  useEffect(() => {
    let tempSeatDetails: any = [];
    let tempFloorTypeDetails: any = [];
    let tempSeatTypeDetails: any = [];
    let tempUserDetails: any = [];
    tempUserDetails = userDetails;
    let index = siteWithSeatDetails.findIndex((site: any) => {
      return modalData.site_id === site.site_id;
    });
    if (index >= 0) {
      tempSeatDetails = siteWithSeatDetails[index].seat_info;
      tempFloorTypeDetails = siteWithSeatDetails[index].seat_floor_list;
      tempSeatTypeDetails = siteWithSeatDetails[index].seat_type_list;
    }

    // if (natureOfVisit === "non_regular") {
    //   setNonRegularSelected(true);
    // }
    if (seatType !== "None") {
      tempSeatDetails = tempSeatDetails?.filter(
        (item: any) => item.seat_type?.toLowerCase() === seatType?.toLowerCase()
      );
    }
    if (floorType) {
      tempSeatDetails = tempSeatDetails?.filter(
        (item: any) => item.seat_floor === floorType
      );
    }
    if (natureOfVisit !== "non_regular") {
      tempSeatDetails = tempSeatDetails?.filter((item: any) => {
        return !tempUserDetails.some(
          (tempItem: any) =>
            tempItem.employee_nature_of_visit === "non_regular" &&
            tempItem.seat_id === item.seat_id
        );
      });
    }
    if (allotedSeat) {
      const index = tempSeatDetails.findIndex((tempSeat: any) => {
        return tempSeat.seat_id === modalData.seat_id;
      });
      if (index === -1) {
        tempSeatDetails.unshift({
          seat_id: modalData.seat_id,
          seat_number: modalData.alloted_seat,
          seat_type: seatType,
          seat_floor: floorType,
        });
      }
    }
    const noneIndex = tempSeatDetails.findIndex(
      (tempSeat: any) => tempSeat.seat_number === "None"
    );
    if (noneIndex === -1) {
      tempSeatDetails.unshift({
        seat_id: null,
        seat_number: "None",
        seat_type: null,
        seat_floor: null,
      });
    }

    setSeatDetails(tempSeatDetails);
    setSeatTypeDetails(tempSeatTypeDetails);
    setFloorTypeDetails(tempFloorTypeDetails);
  }, [seatType, floorType, natureOfVisit]);
  function handleSave() {
    handleSubmit({
      id: modalData.id,
      seat_id: allotedSeat,
      natureOfVisit: natureOfVisit,
      seat_preference: seatType === "None" ? null : seatType,
      user_floor: floorType,
    });
  }
  function changeNatureOfVisit(val: any) {
    setNatureOfVisit(val);
    // val === "non_regular"
    //   ? setNonRegularSelected(true)
    //   : setNonRegularSelected(false);
  }

  return (
    <Modal
      visible
      // width={700}
      onCancel={props.closeEditCafe}
      title={
        <>
          <div className="modal-header">
            {modalData.username}
            {`(${modalData.id})`}
          </div>
          <p>{modalData.site_name}</p>
        </>
      }
      footer={null}
      closeIcon={<img src={deleteIcon} className="cancel-button" alt="" />}
    >
      <div className="flex flex-column mark-modal-body-hot-desking space-between centerAlign">
        <label>Nature of Visit</label>
        <Select
          size={"large"}
          defaultValue={natureOfVisit}
          className={"modal-input"}
          // style={{ width: 400, marginBottom: "1rem" }}
          // onChange={(val) => setNatureOfVisit(val)}
          onChange={changeNatureOfVisit}
        >
          <Option value="regular">Regular</Option>
          <Option value="non_regular">Non Regular</Option>
          <Option value="authority">Authority</Option>
        </Select>
        <label>Seat Preference</label>
        <Select
          className={"modal-input"}
          // disabled={nonRegularSelected}
          // showSearch={true}
          size={"large"}
          // placeholder={allotedSeat ? null : "Select Seat"}
          value={seatType}
          // style={{ width: 400 }}
          onChange={(val) => setSeatType(val)}
        >
          {seatTypeDetails?.map((seatType: any, index: any) => (
            <Option key={index} value={seatType}>
              {seatType}
            </Option>
          ))}
        </Select>
        <label>Floor Preference</label>
        <Select
          className={"modal-input"}
          // disabled={nonRegularSelected}
          // showSearch={true}
          size={"large"}
          // placeholder={allotedSeat ? null : "Select Seat"}
          value={floorType}
          // style={{ width: 400 }}
          onChange={(val) => setFloorType(val)}
        >
          {floorTypeDetails?.map((floorType: any, index: any) => (
            <Option key={index} value={floorType}>
              {floorType}
            </Option>
          ))}
        </Select>

        <label>Alloted Seat</label>
        <Select
          className={"modal-input"}
          // disabled={nonRegularSelected}
          showSearch={true}
          size={"large"}
          // placeholder={allotedSeat ? null : "Select Seat"}
          value={allotedSeat}
          // style={{ width: 400 }}
          onChange={(val) => setAllotedSeat(val)}
          filterOption={(input: any, option: any) =>
            option.props.children
              ?.toString()
              .toLowerCase()
              .indexOf(input?.toLowerCase()) >= 0 ||
            option.props.value
              ?.toString()
              .toLowerCase()
              .indexOf(input?.toLowerCase()) >= 0
          }
        >
          {seatDetails?.map((seat: any) => (
            <Option key={seat.seat_id} value={seat.seat_id}>
              {seat.seat_number}
            </Option>
          ))}
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