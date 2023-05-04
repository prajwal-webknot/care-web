import "./styles.scss";

import { Button, Modal, Row, Select } from "antd";

import React, { useEffect, useState } from "react";
import deleteIcon from "../../../common/assets/images/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { SeatSummarySeatsActions } from "../../store/actions/SeatSummarySeatsAction";
import {
  seatSummarySeatsResponse,
  seatSummarySeatsFetching,
} from "../../store/reducers/SeatSummarySeatsReducer";
import ConfirmationModal from "../../../common/components/confirmationModal";
import Spinner from "../../../common/components/Loader/spinner";
const { Option } = Select;

interface Props {
  closeEditCafe?: () => any;
  handleSubmit: (value: any) => any;
  modalData: any;
  buttonText: string;
}

export default function EditCafeModal(props: Props) {
  const { modalData, handleSubmit, buttonText } = props;

  const [openConfirmation, toggleConfirmationModal] = useState(true);
  const [seatType, setSeatType] = useState("All");
  const [floorType, setFloorType] = useState("All");
  const [allotedSeat, setAllotedSeat] = useState(
    modalData.alloted_seat_id ?? null
  );
  const dispatch = useDispatch();
  let seatSummarySeatsData: any = useSelector(seatSummarySeatsResponse);
  const loading: any = useSelector(seatSummarySeatsFetching);
  useEffect(() => {
    dispatch(
      SeatSummarySeatsActions.getSeatSummarySeatsRequest({
        dynamicQueryParams: [{ user_site_id: modalData.site_id }],
      })
    );
  }, []);

  let floorTypeDetails: any = [];
  let seatTypeDetails: any = [];
  let seat_details: any = [];
  if (seatSummarySeatsData?.data) {
    floorTypeDetails = seatSummarySeatsData.data?.seat_floor_list ?? [];
    seat_details = seatSummarySeatsData.data?.seat_details_list ?? [];
    seatTypeDetails = seatSummarySeatsData.data?.seat_type_list ?? [];
  }

  if (seatType !== "All") {
    seat_details = seat_details?.filter(
      (item: any) => item.type?.toLowerCase() === seatType?.toLowerCase()
    );
  }
  if (floorType !== "All") {
    seat_details = seat_details?.filter(
      (item: any) => item.floor === floorType
    );
  }

  if (allotedSeat) {
    const index = seat_details?.findIndex((seat: any) => {
      return seat.id === modalData.alloted_seat_id;
    });

    if (index === -1) {
      seat_details.push({
        id: modalData.alloted_seat_id,
        seat_number: modalData.alloted_seat,
        type: seatType,
        floor: floorType,
      });
    }
  }

  function handleSave() {
    handleSubmit({
      id: modalData.site_id,
      ePassId: modalData.epass_id,
      seatId: allotedSeat,
    });
  }

  function closeComfirmationPopUp() {
    toggleConfirmationModal(!openConfirmation);
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
            {`(${modalData.poornata_id})`}
          </div>
          <p>{modalData.employee_nature_of_visit}</p>
        </>
      }
      footer={null}
      closeIcon={<img src={deleteIcon} className="cancel-button" alt="" />}
    >
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <div className="flex flex-column mark-modal-body-seat-summary space-between centerAlign">
            <label>Seat Type</label>
            <Select
              className={"modal-input"}
              size={"large"}
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
            <label>Floor</label>
            <Select
              className={"modal-input"}
              size={"large"}
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
              size={"large"}
              value={allotedSeat}
              showSearch={true}
              // style={{ width: 400 }}
              onChange={(val) => setAllotedSeat(val)}
              filterOption={(input: any, option: any) =>
                option.props.children
                  ?.toString()
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0 ||
                option.props.value
                  ?.toString()
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {seat_details?.map((seat: any) => (
                <Option key={seat.id} value={seat.id}>
                  {seat.seat_number}
                </Option>
              ))}
            </Select>
          </div>

          <Row justify="end" align="middle" style={{ marginTop: "1.5rem" }}>
            <Button type="primary" size={"large"} onClick={handleSave}>
              {buttonText}
            </Button>
          </Row>
        </React.Fragment>
      )}
      {seatSummarySeatsData?.errorCode && openConfirmation && (
        <ConfirmationModal
          closeComfirmationPopUp={closeComfirmationPopUp}
          displayMessage={
            seatSummarySeatsData.errorResp?.message ?? "Something went wrong"
          }
        />
      )}
    </Modal>
  );
}
