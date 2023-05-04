import "../../../../sass/main.scss";
import "./styles.scss";

import {
    ADMIN_DASHBOARD,
    SERIAL_NUMBER,
    // EDIT_HOT_DESK_SUCCESS,
    ORGANISER,
    TITLE,
    ROOM_NUMBER,
    STARTING_TIME,
    ENDING_TIME,
    FLOOR,
} from "../../../common/constants/constants";
import getColumnsData from "../../../common/constants/columnsData";

import React, { useEffect, useState } from "react";
// import {
//   statusChangeFull,
//   statusChange,
// } from "../../store/reducers/HotDeskingReducer";
import { useDispatch, useSelector } from "react-redux";

// import AlertModal from "./alertModal";
import ConfirmationModal from "../../../common/components/confirmationModal";


import TabularData from "../../../common/components/TabularData/tabularData";


import {
    editHotDesk,
    editHotDeskFull,
} from "../../store/reducers/EditHotDeskingReducer";
import EditConferenceRoomModal from "./editConferenceRoomModal";
// import { Button } from "antd";
import BlockConferenceRoomModal from "./blockConferenceRoomModal";
import { ConferenceRoomDetailsActions } from "../../store/actions/ConferenceRoomDetailsActions";
import { ConferenceRoomDetailsFetching, ConferenceRoomDetailsResponse } from "../../store/reducers/ConferenceRoomDetailsReducer";
import moment from "moment";
import { BlockConferenceRoomActions } from "../../store/actions/BlockConferenceRoomAction";
import { BlockConferenceRoomError, BlockConferenceRoomResponse } from "../../store/reducers/BlockConferenceRoomReducer";
import { SwapConferenceError, SwapConferenceResponse } from "../../store/reducers/SwapConferenceReducer";
export default function ConferenceRoomDetails(props: any) {
    const [editHotDeskModalOpen, setEditHotDeskModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [openConfirmationBlock, toggleConfirmationModalBlock] = useState(false);
    const [openConfirmationUpdate, toggleConfirmationModalUpdate] = useState(false);

    const [getError, setGetError] = useState(true);
    const [blockConferenceRoomModalOpen, setBlockConferenceRoomModalOpen] = useState(false);

    let hotDeskingData: any = useSelector(ConferenceRoomDetailsResponse);
    const loading: any = useSelector(ConferenceRoomDetailsFetching);
    // const editHotDeskFullResp = useSelector(editHotDeskFull);
    const editHotDeskResp: any = useSelector(editHotDesk);
    const [reRenderTable, setReRenderTable] = useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            ConferenceRoomDetailsActions.getConferenceRoomDetailsRequest({
                dynamicQueryParams: [
                    {
                        date: (moment().date()) + '/' + (moment().month() + 1) + '/' + moment().year()
                    },
                ],
            }),
        );
    }, [editHotDeskResp, reRenderTable]);


    function handleChange(row: any) {
        setEditHotDeskModalOpen(true);
        setModalData(row);
        setReRenderTable((val) => !val);
    }
    function closeEditCafeModal() {
        setEditHotDeskModalOpen(false);
        setModalData(null);
    }

    function handleEditConferenceSubmit(value: any) {
        dispatch(ConferenceRoomDetailsActions.postSwapConferenceRequest(value));
        setEditHotDeskModalOpen(false);
        toggleConfirmationModalUpdate(true);
        setReRenderTable((val) => !val);
    }

    function openBlockConferenceRoomModal() {
        setBlockConferenceRoomModalOpen(true);
    }

    function closeComfirmationPopUp() {
        toggleConfirmationModalBlock(false);
        toggleConfirmationModalUpdate(false);
    }

    function closeBlockConferenceRoomModal() {
        setBlockConferenceRoomModalOpen(false);
    }
    function filterOnSearch(val: any) {
        setSearchValue(val);
    }
    function closeGetError() {
        setGetError(false);
    }

    function handleBlockConferenceRoomSubmit(data: any) {
        // alert("handled Blocked Conference Room");
        dispatch(BlockConferenceRoomActions.BlockConferenceRoomRequest(data));
        closeBlockConferenceRoomModal();
        toggleConfirmationModalBlock(true);
        setReRenderTable((val) => !val);
    }
    let data: any = [];
    let blockConferenceError: any = useSelector(BlockConferenceRoomError);
    let blockConferenceResponse: any = useSelector(BlockConferenceRoomResponse);
    let blockConferenceResponseLocal: any;

    let swapConferenceError: any = useSelector(SwapConferenceError);
    let swapConferenceResponse: any = useSelector(SwapConferenceResponse);
    let swapConferenceResponseLocal: any;
    if (openConfirmationBlock) {
        // console.log(blockConferenceResponse);
        if (blockConferenceError) {
            blockConferenceResponseLocal = blockConferenceResponse?.errorResp?.message;
        }
        else {
            blockConferenceResponseLocal = blockConferenceResponse?.message;
        }
    }
    if (openConfirmationUpdate) {
        // console.log(blockConferenceResponse);
        // console.log(swapConferenceResponse);
        if (swapConferenceError) {
            swapConferenceResponseLocal = swapConferenceResponse?.errorResp?.message;
        }
        else {
            swapConferenceResponseLocal = swapConferenceResponse?.message;
        }
    }
    if (hotDeskingData?.data) {
        data = hotDeskingData.data;
    }

    let hotDeskingUserDetail: any = [];
    const week = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
    if (data && data.length > 0) {
        data.forEach((obj: any, index: any) => {

            // let date = new Date(obj?.start_time * 1000).toLocaleString().split(',')[0];
            // let day = new Date(obj?.start_time * 1000).getDay();
            // let startTime = new Date(obj?.start_time * 1000).toLocaleTimeString();
            // let endTime = new Date(obj?.end_time * 1000).toLocaleTimeString();
            hotDeskingUserDetail.push({
                id: obj?.id,
                date: new Date(obj?.start_time.split("T")[0]).toLocaleString().split(',')[0],
                is_active: obj?.is_active,
                organiser: obj?.organizer?.name ?? "",
                title: obj?.title,
                room_number: obj?.conference_room?.number,
                starting_time: obj?.start_time.split("T")[1],
                ending_time: obj?.start_time.split("T")[1],
                // day: week[day],
                floor: obj?.conference_room?.floor_number,
            });
        });

        if (searchValue !== "") {
            hotDeskingUserDetail = hotDeskingUserDetail.filter(
                (item: any) =>
                    item.username.toLowerCase().includes(searchValue.toLowerCase()) ||
                    item.email.toLowerCase().includes(searchValue.toLowerCase())
            );
        }
    }

    const columnsData = getColumnsData([
        SERIAL_NUMBER,
        ORGANISER,
        TITLE,
        ROOM_NUMBER,
        STARTING_TIME,
        ENDING_TIME,
        FLOOR]);
    return (
        <div className="layout-container">
            {/* <Button>Block a Conference Room</Button> */}
            <TabularData
                loading={loading}
                parent={ADMIN_DASHBOARD}
                dataSource={hotDeskingUserDetail}
                // editHotDesk={true}
                conferenceRoomDetails={true}
                openConferenceRoomModalToggle={openBlockConferenceRoomModal}
                columnsData={columnsData}
                title={"Conference Room Details"}
                setEditCafeteriaModalOpen={handleChange}
                searchValue={searchValue}
                filterOnSearch={filterOnSearch}
            />

            {editHotDeskModalOpen && (
                <EditConferenceRoomModal
                    closeEditCafe={closeEditCafeModal}
                    modalData={modalData}
                    handleSubmit={handleEditConferenceSubmit}
                    buttonText={"SAVE"}
                    userDetails={hotDeskingUserDetail}
                />
            )}
            {
                blockConferenceRoomModalOpen && (
                    <BlockConferenceRoomModal
                        closeEditCafe={closeBlockConferenceRoomModal}
                        modalData={modalData}
                        handleSubmit={handleBlockConferenceRoomSubmit}
                        buttonText={"SAVE"}
                        userDetails={hotDeskingUserDetail}
                    />

                )
            }

            {openConfirmationBlock && (
                <ConfirmationModal
                    closeComfirmationPopUp={closeComfirmationPopUp}
                    displayMessage={blockConferenceResponseLocal
                    }
                />
            )}
            {openConfirmationUpdate && (
                <ConfirmationModal
                    closeComfirmationPopUp={closeComfirmationPopUp}
                    displayMessage={swapConferenceResponseLocal
                    }
                />
            )}
        </div>
    );
}
