import "./styles.scss";

import { Button, Modal, Row, Select } from "antd";

import React, { useEffect, useState } from "react";
import deleteIcon from "../../../common/assets/images/delete.svg";
// import { timeInterval } from "./data/dummyData";
import { useDispatch, useSelector } from "react-redux";
// import { ConferenceRoomDetailsActions } from "../../store/actions/ConferenceRoomDetailsActions";
// import { getConferenceRoomsResponse } from "../../store/reducers/ConferenceRoomsReducer";
import { ConferenceActions } from "../../../manager/store/actions/ConferenceAction";
import { conferenceRoomDataError, conferenceRoomDataResponse, isFetchingConferenceRoom } from "../../../manager/store/reducers/ConferenceRoomReducer";
// import { set } from "lodash";

const { Option } = Select;

interface Props {
    closeEditCafe?: () => any;
    handleSubmit: (value: any) => any;
    modalData: any;
    buttonText: string;
    siteWithSeatDetails?: any;
    userDetails: any;
}

const floorDummy = [1, 2, 3, 4, 5];
// const roomDummy = [101, 102, 103, 104, 105];

export default function EditConferenceRoomModal(props: Props) {
    const {
        // userDetails,
        modalData,
        buttonText,
        handleSubmit,
        // siteWithSeatDetails,
    } = props;
    const [floorPreference, setFloorPreference] = useState(
        1
    );
    const dispatch = useDispatch();
    const [roomNumber, setRoomNumber] = useState(null);
    // const [startTime, setStartTime] = useState<string>(timeInterval[timeInterval.indexOf(modalData.starting_time)]);
    // const [endTime, setEndTime] = useState<string>(timeInterval[timeInterval.indexOf(modalData.ending_time)]);
    // const [roomStatus, setRoomStatus] = useState(modalData.is_active ? "blocked" : "unblocked");
    useEffect(() => {
        dispatch(ConferenceActions.postConferenceRoomRequest({
            "start_date": modalData.date,
            "start_time": modalData.starting_time,
            "end_time": modalData.ending_time,
            "floor_number": floorPreference,
            "team_size": {
                "min": 1,
                "max": 20
            },
            "number_of_events": 1,
            "frequency_type": "never",
            "week_days": [
                modalData.day
            ]
        }))
        // dispatch(ConferenceRoomDetailsActions.getConferenceRoomsRequest({}));
    }, []);


    let conferenceRooms: any = useSelector(conferenceRoomDataResponse);
    let conferenceRoomError = useSelector(conferenceRoomDataError);
    let conferenceRoomsLocal: any;
    let conferenceRoomFetching = useSelector(isFetchingConferenceRoom)


    if (!conferenceRoomsLocal) {
        // console.log(conferenceRooms);
        if (conferenceRoomError && !conferenceRoomFetching) {
            conferenceRoomsLocal = [];
        }
        conferenceRoomsLocal = conferenceRooms?.data;
        // console.log(conferenceRooms);
    }

    function handleSave() {
        handleSubmit({
            conference_room_booking_id: modalData.id,
            conference_room_id: roomNumber
        });
    }

    function floorChange(val: number) {
        dispatch(ConferenceActions.postConferenceRoomRequest({
            "start_date": modalData.date,
            "start_time": modalData.starting_time,
            "end_time": modalData.ending_time,
            "floor_number": val,
            "team_size": {
                "min": 1,
                "max": 20
            },
            "number_of_events": 1,
            "frequency_type": "never",
            "week_days": [
                modalData.day
            ]
        }))
        setFloorPreference(val);
        conferenceRoomsLocal = undefined;
    }


    return (
        <Modal
            visible
            // width={700}
            onCancel={props.closeEditCafe}
            title={
                <>

                    <div className="modal-header">
                        {modalData.title}
                        <br></br>
                        {`ID:${modalData.id}`}
                    </div>
                    <p>{modalData.organiser}</p>

                </>
            }
            footer={null}
            closeIcon={<img src={deleteIcon} className="cancel-button" alt="" />}
        >
            <div className="flex flex-column mark-modal-body-hot-desking centerAlign">
                <label>Floor Preference</label>
                <Select
                    size={"large"}
                    defaultValue={floorPreference}
                    className={"modal-input"}
                    // style={{ width: 400, marginBottom: "1rem" }}
                    // onChange={(val) => setNatureOfVisit(val)}
                    onChange={(val) => floorChange(val)}
                >
                    {
                        floorDummy?.map((floor: any) =>
                            <Option value={floor}>{`floor ${floor}`}</Option>
                        )
                    }
                </Select>
                <label>Room No.</label>
                <Select
                    className={"modal-input"}
                    // disabled={nonRegularSelected}
                    // showSearch={true}
                    size={"large"}
                    // placeholder={allotedSeat ? null : "Select Seat"}
                    // value={roomNumber}
                    // style={{ width: 400 }}
                    onChange={(val: any) => setRoomNumber(val)}
                >

                    {
                        conferenceRoomsLocal
                            ?.filter((data: any) => data?.error === null)
                            ?.map((room: any) =>
                                <Option key={room?.id} value={room?.id}>{room?.number}</Option>
                            )
                    }
                </Select>
                {/* <div className="flex" style={{ justifyContent: 'space-between' }}>
                    <div className="flex flex-column" style={{ width: '98%', justifyContent: 'space-between' }}>
                        <label>Select Start Time</label>
                        <Select
                            className={"modal-input"}
                            // disabled={nonRegularSelected}
                            showSearch={true}
                            size={"large"}
                            // placeholder={allotedSeat ? null : "Select Seat"}
                            value={startTime}
                            // style={{ width: 400 }}
                            onChange={(val) => setStartTime(val)}
                        >

                            {timeInterval.map((time) => {
                                return (
                                    <Option key={time} value={time}>
                                        {time}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>
                    <div className="flex flex-column" style={{ width: '98%' }}>
                        <label>Select End Time</label>
                        <Select
                            className={"modal-input"}
                            // disabled={nonRegularSelected}
                            showSearch={true}
                            size={"large"}
                            // placeholder={allotedSeat ? null : "Select Seat"}
                            value={endTime}
                            // style={{ width: 400 }}
                            onChange={(val) => setEndTime(val)}
                        >

                            {timeInterval.slice(timeInterval.indexOf(startTime) + 1).map((time) => {
                                return (
                                    <Option key={time} value={time}>
                                        {time}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>

                </div>
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
                </Select> */}
            </div>

            <Row justify="end" align="middle" style={{ marginTop: "2.5rem" }}>
                <Button type="primary" size={"large"} onClick={handleSave}>
                    {buttonText}
                </Button>
            </Row>
        </Modal>
    );
}


