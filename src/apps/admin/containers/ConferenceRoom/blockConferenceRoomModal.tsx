import "./styles.scss";

import { Button, Modal, Row, Select } from "antd";

import React, { useEffect, useState } from "react";
import deleteIcon from "../../../common/assets/images/delete.svg";
// import { timeInterval } from "./data/dummyData";
import { useDispatch, useSelector } from "react-redux";
import { ConferenceRoomDetailsActions } from "../../store/actions/ConferenceRoomDetailsActions";
import { getConferenceRoomsResponse } from "../../store/reducers/ConferenceRoomsReducer";

const { Option } = Select;

interface Props {
    closeEditCafe?: () => any;
    handleSubmit: (value: any) => any;
    modalData: any;
    buttonText: string;
    userDetails: any;
}


export default function BlockConferenceRoomModal(props: Props) {
    const dispatch = useDispatch();
    const {
        // userDetails,
        // modalData,
        buttonText,
        handleSubmit,
    } = props;

    const [roomNumber, setSeatType] = useState(null);
    const [roomStatus, setRoomStatus] = useState("blocked");
    useEffect(() => {
        dispatch(ConferenceRoomDetailsActions.getConferenceRoomsRequest({}));
    }, []);


    let conferenceRooms = useSelector(getConferenceRoomsResponse);
    let conferenceRoomsLocal: any;
    if (!conferenceRoomsLocal) {
        // console.log(conferenceRooms);
        conferenceRoomsLocal = conferenceRooms;
    }

    function handleRoomSelectChange(val: any) {
        setSeatType(val)
        if (typeof conferenceRoomsLocal !== undefined) {

            conferenceRoomsLocal?.filter((data: any) => data.id === val)[0]?.is_active === true ? setRoomStatus("blocked") : setRoomStatus("unblocked")
        }
    }
    function handleSave() {
        handleSubmit({
            conference_room_id: roomNumber,
            is_active: roomStatus === "blocked" ? true : false
        });
    }


    return (
        <Modal
            visible
            // width={700}
            onCancel={props.closeEditCafe}
            title={"Block Conference Room"
            }
            footer={null}
            closeIcon={<img src={deleteIcon} className="cancel-button" alt="" />}
        >
            <div className="flex flex-column mark-modal-body-hot-desking centerAlign" style={{ justifyContent: 'center' }}>

                <label>Select Room No.</label>
                <Select
                    className={"modal-input"}
                    // disabled={nonRegularSelected}
                    // showSearch={true}
                    size={"large"}
                    // placeholder={allotedSeat ? null : "Select Seat"}
                    // style={{ width: 400 }}
                    onChange={(val: any) => handleRoomSelectChange(val)}
                >
                    {/* {console.log(conferenceRoomsLocal)} */}
                    {conferenceRoomsLocal?.map((room: any) => (
                        <Option key={room?.id} value={room?.id}>
                            {room?.number}
                        </Option>
                    ))}
                </Select>

                <label>Room Status</label>
                <Select
                    className={"modal-input"}
                    // disabled={nonRegularSelected}
                    showSearch={true}
                    size={"large"}
                    // placeholder={allotedSeat ? null : "Select Seat"}
                    value={roomStatus}
                    // style={{ width: 400 }}
                    onChange={(val) => setRoomStatus(val)}
                >
                    <Option value="blocked">
                        Blocked
                    </Option>
                    <Option value="unblocked">
                        UnBlocked
                    </Option>
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
