import '../../../../sass/main.scss';
import React, { useState, useEffect } from 'react';
import CalendarComponent from '../../../common/components/Calendar/calendarComponent';
import SubHeader from '../../../common/components/SubHeader/SubHeader';
import CheckBoxList from '../../../common/components/CheckBox/checkBoxList';
import './teamRoster.scss';
import {
    MANAGER_DASHBOARD,
    NO_DATA_FOUND,
    LABEL_KEY,
    POST_MULTIDAY_ROSTER_SUCCESS,
    NO_SELECTED_EMPLOY,
    POST_MULTIDAY_ROSTER_FAILURE,
} from '../../../common/constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { rosterDataSelect } from '../../store/reducers/RosterReducer';
import { postRosterData, postRosterSelect } from '../../store/reducers/PostRosterReducer';
import { RosterActions } from '../../store/actions/RosterAction';
import { getDecimalTill, sortArrayByKey } from '../../../common/helpers/utils';
import ConfirmationModal from '../../../common/components/confirmationModal';
import { POST_ROSTER_SUCCESS, POST_ROSTER_FAILURE, LIMIT_REACHED_MSG } from '../../../common/constants/constants';
import { FteGuidelinesActions } from '../../../hr/store/actions/FteGuidelinesAction';
import { getFteResp } from '../../../hr/store/reducers/FteGuidelinesReducer';
import moment from 'moment';
import { Button, Checkbox, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Select, FormControl, InputLabel, MenuItem, Box } from '@mui/material';
import ConferenceDash from '../../../common/components/ConferenceComponent/ConferenceDash';
import MultiDayRosterScreen from '../../../common/components/RosterDashComponent/MultiDayRosterScreen';
import { GeneratePassRequest } from '../../../common/components/RosterDashComponent/RosterDashOldMain';
import { MultidayRosterActions } from '../../store/actions/MultidayRosterAction';
import { postMultidayRosterError, postMultidayRosterResponse } from '../../store/reducers/MultidayRosterReducer';
import { ConferenceActions } from '../../store/actions/ConferenceAction';
import { postConferenceRoomBookError, postConferenceRoomBookFetching, postConferenceRoomBookResponse } from '../../store/reducers/PostConferenceRoomReducer';
import { Redirect } from 'react-router-dom';
import { SearchEmployService } from '../../service/SearchEmployService';
import { SearchEmployActions } from '../../store/actions/SearchEmployAction';
import { SearchEmployResponse } from '../../store/reducers/SearchEmployReducer';
import { GetSeatDetailsActions } from '../../store/actions/GetSeatDetailsAction';
import RosterGuestScreen from '../../../common/components/RosterDashComponent/RosterGuest';
import { RosterGuestActions } from '../../store/actions/RosterGuestAction';
import { postRosterGuestError, postRosterGuestResponse } from '../../store/reducers/RosterGuestReducer';
import { DateBasedEmployesActions } from '../../store/actions/DateBasedEmployesAction';
import { DateBasedEmployesResponse } from '../../store/reducers/DateBasedEmployesReducer';
import BufferAllocateModal from '../../../common/components/Modal/BufferAllocateModal';

interface invite {
    first_name: String;
    last_name: String;
    phone: number | null;
    email: String;
}
interface Props { }
export default function TeamRosterScreen(props: Props) {
    const dispatch = useDispatch();
    let GetRosterResp: any = useSelector(rosterDataSelect);
    let DateBasedEmployesResp: any = useSelector(DateBasedEmployesResponse);
    // let postRosterFailed: any = useSelector(postRosterData);
    let postRosterResp: any = useSelector(postRosterSelect);
    let FteResp: any = useSelector(getFteResp);
    let AllEmploys: any = useSelector(SearchEmployResponse);
    let rosterError: any = useSelector(postMultidayRosterError);
    let rosterResponse: any = useSelector(postMultidayRosterResponse);
    let rosterResponseLocal: any;

    let rosterGuestError: any = useSelector(postRosterGuestError);
    let rosterGuestResponse: any = useSelector(postRosterGuestResponse);
    let rosterGuestResponseLocal: any;

    const [openConfirmation, toggleConfirmationModal] = useState(false);
    if (openConfirmation) {
        if (rosterError) {
            rosterResponseLocal = rosterResponse?.errorResp?.message;
            console.log(rosterResponseLocal);
        }
        else {
            rosterResponseLocal = rosterResponse?.message;
        }
    }
    if (openConfirmation) {
        if (rosterGuestError) {
            rosterGuestResponseLocal = rosterGuestResponse?.errorResp?.message;
        }
        else {
            rosterGuestResponseLocal = rosterGuestResponse?.message;
        }
    }
    let conferenceRoomBookFetching: any = useSelector(postConferenceRoomBookFetching);
    let conferenceRoomBookResponse: any = useSelector(postConferenceRoomBookResponse);
    let conferenceRoomBookError: any = useSelector(postConferenceRoomBookError);
    let conferenceRoomBookResponseLocal: any;
    const [conferenceRoomFetching, setConferenceRoomFetching] = React.useState(false);
    if (conferenceRoomFetching) {
        if (conferenceRoomBookError) {
            conferenceRoomBookResponseLocal = conferenceRoomBookResponse?.errorResp?.message;
        }
        else {
            conferenceRoomBookResponseLocal = conferenceRoomBookResponse?.message;
        }
    }


    const [selectedEmployess, setSelectedEmployeess] = useState([] as number[]);
    const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment().startOf('day').add(0, 'day'));
    const [disableComponents, setdisableComponents] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    let [totalSelected, setTotalSelected] = useState(0);
    const [isEditable, setIsEditable] = useState(true);

    const [limitReached, toggleLimitReachedModal] = useState(false);
    const [noSelected, toggleNoSelected] = useState(false);

    // const [rosterData, setRosterData] = useState([] as any);
    const currectTimeEpoc = moment().subtract(7, 'days').startOf('day').unix();
    const fourteenDayAhead = moment().add(14, 'days').startOf('day').unix();
    const managerId = localStorage.getItem('userId');
    const siteId = localStorage.getItem('siteId') ?? '';

    const [conferenceRosterType, setConferenceRosterType] = React.useState('single');
    const [rosterFor, setRosterFor] = React.useState('team');
    const [rosteringFor, setRosteringFor] = React.useState('SINGLE_DAY');
    const [addConference, setAddConference] = React.useState(false);
    const [addConferenceForm, setAddConferenceForm] = React.useState(false);

    const [selectedEmployConference, setSelectedEmployConference] = React.useState([]) as any;
    const [selectedDateNew, setSelectedDateNew] = useState<moment.Moment>(moment().startOf('day').add(0, 'day'));

    const [addMoreDays, setAddMoreDays] = React.useState('add more days');
    const [typeOfRepeat, setTypeOfRepeat] = React.useState<string>('never');
    const [selectedMultipleDate, setSelectMultipleDate] = useState<moment.Moment[] | null>([]) as any;
    const [selectedMultipleDays, setSelectMultipleDays] = React.useState<number[]>([selectedDateNew.weekday()]);
    const [noOfRepeat, setNoOfRepeat] = React.useState<number>(1);

    const [title, settitle] = React.useState('');
    const [teamSize, setteamSize] = React.useState('1-2');
    const [floor, setfloor] = React.useState<number>(1);
    const [fromTime, setfromTime] = React.useState('');
    const [toTime, settoTime] = React.useState('');
    const [rsvp, setrsvp] = React.useState('');
    // const [backParent, setbackParent] = React.useState(MANAGER_DASHBOARD);
    const [activeMonth, setActiveMonth] = React.useState(moment().add(0, 'day').month());
    const [currMonthDate, setcurrMonthDate] = React.useState(moment().startOf('day').add(0, 'day'));
    // const maxSteps = 12;

    const [roomNumber, setroomNumber] = React.useState<number | null>();
    const [specialRequirements, setspecialRequirements] = React.useState(['', '', '']) as any;
    const [technicalRequirements, settechnicalRequirements] = React.useState(['', '', '']) as any;
    const [invites, setInvites] = React.useState<invite[]>([{ first_name: '', last_name: '', phone: null, email: '' }]);
    const [redirectToManager, setRedirectToManager] = React.useState<boolean>(false);
    useEffect(() => {
        dispatch(
            RosterActions.getRosterRequest({
                dynamicQueryParams: [
                    {
                        manager_id: managerId,
                        start_date: currectTimeEpoc,
                        end_date: fourteenDayAhead,
                    },
                ],
            }),
        );
        dispatch(SearchEmployActions.searchEmployRequest({}));

    }, [postRosterResp, managerId, currectTimeEpoc, fourteenDayAhead]);

    useEffect(() => {
        if (siteId) dispatch(FteGuidelinesActions.getFteGuidelinesRequest({ dynamicRoute: [siteId] }));
    }, [siteId]);

    useEffect(() => {
        dispatch(DateBasedEmployesActions.DateBasedEmployesRequest({
            dynamicQueryParams: [{
                day_start: selectedDate.hour(0).minute(0).second(0).unix(),
                day_end: selectedDate.hour(23).minute(59).second(59).unix(),
                status: 'approved'
            }]
        }))
    }, [selectedDate]);

    useEffect(() => {
        clearSelection();
        clearSelectedData();
    }, [rosteringFor])
    // useEffect(() => {
    //   RosterActions.getRosterData({});
    // }, [searchValue]);

    let allUsers = GetRosterResp?.users_under_manager?.map((obj: any) => ({
        label: obj.name,
        value: obj.user_id,
    }));
    let rosteredEmp = DateBasedEmployesResp?.data?.map((obj: any) => ({
        label: obj?.name + " (Rostered)",
        value: obj?.user?.id,
    }));
    function filteredList(arr1: any[], arr2: any[]) {
        let arr = arr1.filter(object1 => {
            return !arr2.some(object2 => {
                return object1.value === object2.value;
            });
        });
        return arr;
    }
    let allEmploys = AllEmploys?.map((emp: any) => ({
        label: emp.first_name + " " + emp.last_name,
        value: emp.user.id
    }))

    GetRosterResp = GetRosterResp?.data ?? [];
    const employeeCount = allUsers?.length;
    if (searchValue && rosteringFor !== 'CONFERENCE') {
        allUsers = allUsers?.filter((item: any) => item.label.toLowerCase().includes(searchValue.toLowerCase()));
    }

    if (searchValue && rosteringFor === 'CONFERENCE') {
        allEmploys = allEmploys?.filter((item: any) => item.label.toLowerCase().includes(searchValue.toLowerCase()));
    }


    let dateUserMapper: any = {};
    if (GetRosterResp && GetRosterResp.length > 0) {
        GetRosterResp.forEach((obj: any) => {
            dateUserMapper[obj.date] = obj.users;
        });
    }

    const returnEmployeeNames = (obj: any) => obj.id;
    var cloneEmpIds = [] as number[];
    let selectedEmp: number[] = selectedEmployess;
    if (selectedDate && dateUserMapper[selectedDate?.startOf('day').unix()]) {
        selectedEmp = dateUserMapper[selectedDate.startOf('day').unix()].map(returnEmployeeNames);
        cloneEmpIds = dateUserMapper[selectedDate.startOf('day').unix()].map(returnEmployeeNames);
    } else {
        selectedEmp = [];
    }

    function handleSelectedDate(date: moment.Moment) {
        setSelectedDate(date);
        date?.isSameOrBefore(moment().subtract(1, 'day'), 'date') ? setIsEditable(false) : setIsEditable(true);
    }

    function handleEdit() {
        setdisableComponents(false);
        setTotalSelected(selectedEmployess.length);
        // setSelectedEmployeess(selectedEmp);
    }
    function handleCancelClick() {
        setSearchValue('');
        setdisableComponents(true);
    }
    function clearSelectedData() {
        setSelectedDate(moment().startOf('day').add(0, 'day'));
        setSelectedDateNew(moment().startOf('day').add(0, 'day'));
        setSelectedEmployeess([]);
        setTotalSelected(0);
        setSearchValue('');
    }

    function handleSelectedEmployess(empIds: number[]) {

        let oldSelectedEmployee = selectedEmployess;
        let rosterRequestData = [] as any;
        let selectEmployee: any = [];
        if (searchValue === '') {
            if (oldSelectedEmployee.length > empIds.length) {
                oldSelectedEmployee.forEach((selEmp: any, index: any) => {
                    if (!empIds.includes(selEmp)) {
                        oldSelectedEmployee.splice(index, 1);
                    }
                });
            }
            if (oldSelectedEmployee.length < empIds.length) {
                empIds.forEach((selEmp: any) => {
                    if (!oldSelectedEmployee.includes(selEmp)) {
                        oldSelectedEmployee.push(selEmp);
                    }
                });
            }
        } else {
            empIds.forEach((empId) => {
                if (!oldSelectedEmployee.includes(empId)) {
                    oldSelectedEmployee.push(empId);
                }
            });
        }

        selectEmployee = oldSelectedEmployee;
        console.log(selectEmployee);
        if (selectEmployee.length > selectLimit) {
            toggleLimitReachedModal(true);
        }
        else {
            setSelectedEmployeess(selectEmployee);
            setTotalSelected(oldSelectedEmployee.length);
            // setRosterData(rosterRequestData);
        }
    }
    function handleSelectedEmployConference(empIds: number[]) {

        let oldSelectedEmployee = selectedEmployConference;
        // let rosterRequestData = [] as any;
        let selectEmployee: any = [];
        if (searchValue === '') {
            if (oldSelectedEmployee.length > empIds.length) {
                oldSelectedEmployee.forEach((selEmp: any, index: any) => {
                    if (!empIds.includes(selEmp)) {
                        oldSelectedEmployee.splice(index, 1);
                    }
                });
            }
            if (oldSelectedEmployee.length < empIds.length) {
                empIds.forEach((selEmp: any) => {
                    if (!oldSelectedEmployee.includes(selEmp)) {
                        oldSelectedEmployee.push(selEmp);
                    }
                });
            }
        } else {
            empIds.forEach((empId) => {
                if (!oldSelectedEmployee.includes(empId)) {
                    oldSelectedEmployee.push(empId);
                }
            });
        }

        selectEmployee = oldSelectedEmployee;
        console.log(selectEmployee);
        if (selectEmployee.length > selectLimit) {
            toggleLimitReachedModal(true);
        }
        else {
            setSelectedEmployConference(selectEmployee);
            setTotalSelected(oldSelectedEmployee.length);
        }
    }


    const selectLimit = employeeCount
        ? (Number(Number(FteResp?.data?.percentage_allowed).toFixed(0)) * employeeCount) / 100
        : 0;

    function handleRosterSave() {
        setSearchValue('');

        if (rosteringFor === 'SINGLE_DAY') {
            if (selectedEmployess.length > 0 && selectedEmployess.length <= Math.round(selectLimit) && selectedDate) {

                handleSingleDayRoster();
                toggleConfirmationModal(true);
                // setTotalSelected(0);
                // setSelectedEmployeess([] as number[]);
            } else {
                toggleLimitReachedModal(true);
            }
        }
        if (selectedEmployess.length === 0 && rosteringFor === 'SINGLE_DAY') {
            toggleNoSelected(true);
        }
        // if (selectedEmployConference === 0 && rosteringFor === 'CONFERENCE') {
        //     toggleNoSelected(true);
        // }
        setdisableComponents(true);
    }

    function closeComfirmationPopUp() {
        toggleConfirmationModal(false);
        if (rosteringFor === "GUEST" && rosterGuestResponseLocal === "Rostered the guest(s) successfully") {
            setRedirectToManager(true);
        }
        else if (rosterResponseLocal === "Rostered the team successfully") {
            setRedirectToManager(true);
        }
    }
    function closeLimitReachedPopUp() {
        toggleLimitReachedModal(false);
    }
    function closeNoSelectedPopUp() {
        toggleNoSelected(false);
    }
    function ConferenceRoomBookResponseToggle() {
        console.log(conferenceRoomBookResponseLocal);
        setConferenceRoomFetching(false);
        if (conferenceRoomBookResponseLocal === "Conference room booked successfully.") {
            // console.log("redirect");
            setRedirectToManager(true);
        }



    }
    sortArrayByKey(allUsers, LABEL_KEY);
    sortArrayByKey(allEmploys, LABEL_KEY);

    //new component functions
    function clearSelection() {
        setSelectedEmployConference([]);
        setSelectedEmployeess([]);
        setTypeOfRepeat('never')
        settitle('');
        setfromTime('');
        settoTime('');
        setroomNumber(null);
        setspecialRequirements(['', '', '']);
        settechnicalRequirements(['', '', '']);
        setInvites([{ first_name: '', last_name: '', phone: null, email: '' }]);
        // setSelectedDate(moment().startOf('day').add(0, 'day'));
        // setSelectedDateNew(moment().startOf('day').add(0, 'day'));
        // clearSelectedData();
    }
    const handleCalenderNext = () => {
        if (activeMonth === 11) {
            setActiveMonth(-1);
        }
        setActiveMonth((prevActiveMonth) => prevActiveMonth + 1);
        let date = selectedDateNew.startOf('day').add(1, 'M');
        setcurrMonthDate(date);
        setSelectMultipleDays([date.weekday()])
    };

    const handleCalenderBack = () => {
        if (activeMonth === 0) {
            setActiveMonth(12);
        }
        setActiveMonth((prevActiveMonth) => prevActiveMonth - 1);
        let date = selectedDateNew.startOf('day').subtract(1, 'M');
        setcurrMonthDate(date);
        setSelectMultipleDays([date.weekday()])
    };

    const handleRosteringForChange = (event: any) => {
        if (rosteringFor !== 'SINGLE_DAY') {
            handleRosterSave();
        }
        setdisableComponents(true);
        let value = event.target.value;
        setRosteringFor(value);
    };

    const handleRadioChange = (event: any) => {
        let value = event.target.value;
        setteamSize(value);
    };
    const handleTitleChange = (event: any) => {
        let value = event.target.value;
        settitle(value);
    };

    const handleFloorChange = (event: any) => {
        let value = event.target.value;
        setfloor(value);
        console.log(floor);
    };

    const handleToTimeChange = (event: any) => {
        let value = event.target.value;
        settoTime(value);
    };
    const handleFromTimeChange = (event: any) => {
        let value = event.target.value;
        setfromTime(value);
    };
    const handleRsvpChange = (event: any) => {
        let value = event.target.value;
        setrsvp(value);
    };

    const handleAddConference = () => {
        setAddConference(!addConference);
    };

    const handleMultipleSelectedDateDays = (date: any) => {
        setActiveMonth(date.month());
        setSelectedDateNew(date);
        let days = [date.weekday()];
        setSelectMultipleDays(days);
    };

    const handleMultipleSelectedDays = (dayIndex: number) => {
        let days = [...selectedMultipleDays];
        if (days.indexOf(dayIndex) === -1) {
            days.push(dayIndex);
        } else {
            days.splice(days.indexOf(dayIndex), 1);
        }
        setSelectMultipleDays(days);
    };

    const handleNoOfRepeatChange = (event: any) => {
        let value = event.target.value;
        setNoOfRepeat(value);
    };

    const handleAddMoreDaysChange = (e: any) => {
        let value = e.target.value;
        setAddMoreDays(value);
    };

    const handleTypeOfRepeatChange = (e: any) => {
        let value = e.target.value;
        setTypeOfRepeat(value);
    };

    const handleConferenceRosterType = (e: any) => {
        let value = e.target.value;
        setConferenceRosterType(value);
    };

    //CONFERENCE Room

    const handleinviteNameChange = (event: any, id: number) => {
        let value = event.target.value;
        let newInvites = [...invites];

        newInvites[id].first_name = value;

        setInvites(newInvites);
    };
    const handleinvitesurNameChange = (event: any, id: number) => {
        let value = event.target.value;
        let newInvites = [...invites];

        newInvites[id].last_name = value;

        setInvites(newInvites);
    };
    const handleinvitePhoneChange = (event: any, id: number) => {
        let value = event.target.value;
        let newInvites = [...invites];

        newInvites[id].phone = value;

        setInvites(newInvites);
    };
    const handleinviteEmailChange = (event: any, id: number) => {
        let value = event.target.value;
        let newInvites = [...invites];

        newInvites[id].email = value;

        setInvites(newInvites);
    };

    const handleaddinviteButton = () => {
        let emptyInvite: invite = {
            first_name: '',
            last_name: '',
            phone: null,
            email: '',
        };
        let newInvites = [...invites];
        newInvites.push(emptyInvite);
        setInvites(newInvites);
    };

    const handlespecialRequirementsChange = (event: any, id: number) => {
        let requirement = event.target.value;
        let value = [...specialRequirements];
        value[id] = requirement;
        setspecialRequirements(value);
    };
    const handletechnicalRequirementsChange = (event: any, id: number) => {
        let requirement = event.target.value;
        let value = [...technicalRequirements];
        value[id] = requirement;
        settechnicalRequirements(value);
    };

    const handleroomNumberChange = (value: number) => {
        if (value === roomNumber) {
            setroomNumber(null);
        } else {
            setroomNumber(value);
        }
    };

    const handleInvitesCrossButton = (id: number) => {
        let newInvites = [...invites];
        newInvites.splice(id, 1);
        setInvites(newInvites);
    };

    const handleaddSpecialRequirementsChange = () => {
        let requirements = [...specialRequirements];
        requirements.push('');
        setspecialRequirements(requirements);
    };
    const handleaddtechnicalRequirementsChange = () => {
        let requirements = [...technicalRequirements];
        requirements.push('');
        settechnicalRequirements(requirements);
    };

    const handletechRequirementCrossButton = (id: number) => {
        let requirements = [...technicalRequirements];
        requirements.splice(id, 1);
        settechnicalRequirements(requirements);
    };
    const handleaddSpecialRequirementCrossButton = (id: number) => {
        let requirements = [...specialRequirements];
        requirements.splice(id, 1);
        setspecialRequirements(requirements);
    };

    // submit button

    const GenerateWeekdayArray = (): string[] => {
        const weekdays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
        // console.log(selectedMultipleDays);
        let week_days = selectedMultipleDays.map((day) => {
            return weekdays[day];
        });
        return week_days;
    };


    const handleSingleDayRoster = (buffer: boolean = false) => {
        let date = selectedDate?.date() + '/' + (selectedDate?.month() + 1) + '/' + selectedDate?.year();
        const weekdays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
        let week_day = weekdays[selectedDate?.weekday()];
        let requestBody = {
            frequency_type: 'never',
            number_of_events: 1,
            start_date: date,
            users_details: selectedEmployess,
            week_days: [week_day],
            enable_buffer: buffer,
        };
        dispatch(MultidayRosterActions.postRosterRequest(requestBody));
    }
    const handleMultipleDayRoster = async () => {
        if (selectedEmployess.length === 0) {
            toggleNoSelected(true);
        } else {
            let week_days = await GenerateWeekdayArray();

            let date = selectedDateNew.date() + '/' + (selectedDateNew.month() + 1) + '/' + selectedDateNew.year();
            let requestBody = {
                frequency_type: noOfRepeat === 1 ? 'never' : typeOfRepeat,
                number_of_events: (noOfRepeat * week_days.length),
                start_date: date,
                users_details: selectedEmployess,
                week_days: week_days,
            };

            console.log(requestBody);
            dispatch(MultidayRosterActions.postRosterRequest(requestBody));
            toggleConfirmationModal(true);
        }
    };

    const handleConferenceRoomSubmit = async () => {
        // if (selectedEmployConference.length === 0) {
        //     // toggleNoSelected(true);
        // } else {
        let date = selectedDateNew.date() + '/' + (selectedDateNew.month() + 1) + '/' + selectedDateNew.year();
        let week_days = await GenerateWeekdayArray();

        let itResources = [];
        let specialResources = [];
        for (let i = 0; i < technicalRequirements.length; i++) {
            if (technicalRequirements[i] !== '') {
                itResources.push(technicalRequirements[i]);
            }
        }
        for (let i = 0; i < specialRequirements.length; i++) {
            if (specialRequirements[i] !== '') {
                specialResources.push(specialRequirements[i]);
            }
        }

        let req_data = {
            title: title,
            teammates: selectedEmployConference,
            it_resources: itResources,
            other_resources: specialResources,
            conference_room: roomNumber,
            guests: invites?.length === 1 && invites[0].first_name === '' ? [] : invites,
            rsvp_required: rsvp === 'RSVP-YES' ? true : false,

            start_date: date,
            start_time: fromTime,
            end_time: toTime,
            number_of_events: noOfRepeat * week_days.length,
            frequency_type: noOfRepeat === 1 ? 'never' : typeOfRepeat,
            week_days: week_days,
        };

        dispatch(ConferenceActions.postConferenceRoomBookRequest(req_data));
        setConferenceRoomFetching(true);
        // }
    };

    const handleRosterGuestSubmit = async () => {

        let week_days = await GenerateWeekdayArray();

        let date = selectedDateNew.date() + '/' + (selectedDateNew.month() + 1) + '/' + selectedDateNew.year();
        let requestBody = {
            frequency_type: noOfRepeat === 1 ? 'never' : typeOfRepeat,
            number_of_events: (noOfRepeat * week_days.length),
            start_date: date,
            guests: invites,
            week_days: week_days,
        };

        console.log(requestBody);
        dispatch(RosterGuestActions.postRosterGuestRequest(requestBody));
        toggleConfirmationModal(true);

    }
    const guideline = getDecimalTill(FteResp?.data?.percentage_allowed, 0);
    return (
        <div className="layout-container">
            <SubHeader
                parent={MANAGER_DASHBOARD}
                title={'Team Roster'}
                noExport
                saveButton
                handleRosterSave={handleRosterSave}
                handleEdit={handleEdit}
                handleCancelClick={handleCancelClick}
                disableComponents={disableComponents}
                isEditable={isEditable}
                isRoster={true}
                availableSeats={FteResp?.data?.available_seats_under_suite_guideline}
                bufferSeats={FteResp?.data?.available_seats_under_buffer}

            />
            <Box className="clear-button-roster" sx={{ display: 'flex', alignItems: 'center' }}>
                <Button onClick={clearSelection}>Clear</Button>
                <FormControl sx={{ minWidth: 200, margin: 1, marginLeft: '45px' }}>
                    <InputLabel id="demo-simple-select-label">Roster For</InputLabel>

                    <Select
                        sx={{ height: 35 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={rosteringFor}
                        label="Rostering For"
                        onChange={handleRosteringForChange}
                    >
                        <MenuItem value={'SINGLE_DAY'}>Single Day</MenuItem>
                        <MenuItem value={'MULTIPLE_DAYS'}>Multiple Days</MenuItem>
                        <MenuItem value={'GUEST'}>Roster Guests</MenuItem>
                        <MenuItem value={'CONFERENCE'}>Book Conference Room</MenuItem>

                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ display: 'flex' }}>
                {rosteringFor === 'SINGLE_DAY' ? (
                    <div className="left-section-roster">
                        <CalendarComponent
                            handleSelectedDate={handleSelectedDate}
                            clearSelectedData={clearSelectedData}
                            disableComponents={disableComponents}
                        />
                    </div>
                ) : (
                    <></>
                )}
                {rosteringFor === 'MULTIPLE_DAYS' ? (
                    <MultiDayRosterScreen
                        handleMultipleSelectedDateDays={handleMultipleSelectedDateDays}
                        clearSelectedData={clearSelectedData}
                        disableComponents={disableComponents}
                        isMultiple={false}
                        selectedSingleDate={selectedDateNew}
                        selectedMultipleDate={selectedMultipleDate}
                        currMonthDate={currMonthDate}
                        selectedDateNew={selectedDateNew}
                        handleCalenderBack={handleCalenderBack}
                        handleCalenderNext={handleCalenderNext}
                        activeMonth={activeMonth}
                        selectedMultipleDays={selectedMultipleDays}
                        setSelectMultipleDays={setSelectMultipleDays}
                        handleMultipleSelectedDays={handleMultipleSelectedDays}
                        addMoreDays={addMoreDays}
                        handleAddMoreDaysChange={handleAddMoreDaysChange}
                        typeOfRepeat={typeOfRepeat}
                        handleTypeOfRepeatChange={handleTypeOfRepeatChange}
                        noOfRepeat={noOfRepeat}
                        handleNoOfRepeatChange={handleNoOfRepeatChange}
                        handleMultipleDayRoster={handleMultipleDayRoster}
                    />
                ) : (
                    <></>
                )}
                {
                    rosteringFor === "GUEST" && (
                        <RosterGuestScreen
                            handleMultipleSelectedDateDays={handleMultipleSelectedDateDays}
                            clearSelectedData={clearSelectedData}
                            disableComponents={disableComponents}
                            isMultiple={false}
                            selectedSingleDate={selectedDateNew}
                            selectedMultipleDate={selectedMultipleDate}
                            currMonthDate={currMonthDate}
                            selectedDateNew={selectedDateNew}
                            handleCalenderBack={handleCalenderBack}
                            handleCalenderNext={handleCalenderNext}
                            activeMonth={activeMonth}
                            selectedMultipleDays={selectedMultipleDays}
                            setSelectMultipleDays={setSelectMultipleDays}
                            handleMultipleSelectedDays={handleMultipleSelectedDays}
                            addMoreDays={addMoreDays}
                            handleAddMoreDaysChange={handleAddMoreDaysChange}
                            typeOfRepeat={typeOfRepeat}
                            handleTypeOfRepeatChange={handleTypeOfRepeatChange}
                            noOfRepeat={noOfRepeat}
                            handleNoOfRepeatChange={handleNoOfRepeatChange}
                            handleMultipleDayRoster={handleMultipleDayRoster}
                            invites={invites}
                            handleinviteNameChange={handleinviteNameChange}
                            handleinvitesurNameChange={handleinvitesurNameChange}
                            handleinvitePhoneChange={handleinvitePhoneChange}
                            handleinviteEmailChange={handleinviteEmailChange}
                            handleaddinviteButton={handleaddinviteButton}
                            handleInvitesCrossButton={handleInvitesCrossButton}
                            handleRosterGuestSubmit={handleRosterGuestSubmit}
                        />

                    )
                }


                {rosteringFor === 'CONFERENCE' && (
                    <ConferenceDash
                        handleMultipleSelectedDateDays={handleMultipleSelectedDateDays}
                        clearSelectedData={clearSelectedData}
                        disableComponents={disableComponents}
                        isMultiple={false}
                        selectedDateNew={selectedDateNew}
                        selectedMultipleDate={selectedMultipleDate}
                        currMonthDate={currMonthDate}
                        title={title}
                        handleTitleChange={handleTitleChange}
                        teamSize={teamSize}
                        handleRadioChange={handleRadioChange}
                        floor={floor}
                        handleFloorChange={handleFloorChange}
                        fromTime={fromTime}
                        handleFromTimeChange={handleFromTimeChange}
                        toTime={toTime}
                        handleToTimeChange={handleToTimeChange}
                        rsvp={rsvp}
                        handleRsvpChange={handleRsvpChange}
                        handleCalenderBack={handleCalenderBack}
                        handleCalenderNext={handleCalenderNext}
                        activeMonth={activeMonth}
                        conferenceRosterType={conferenceRosterType}
                        handleConferenceRosterType={handleConferenceRosterType}
                        selectedMultipleDays={selectedMultipleDays}
                        setSelectMultipleDays={setSelectMultipleDays}
                        handleMultipleSelectedDays={handleMultipleSelectedDays}
                        addMoreDays={addMoreDays}
                        handleAddMoreDaysChange={handleAddMoreDaysChange}
                        typeOfRepeat={typeOfRepeat}
                        handleTypeOfRepeatChange={handleTypeOfRepeatChange}
                        noOfRepeat={noOfRepeat}
                        handleNoOfRepeatChange={handleNoOfRepeatChange}
                        roomNumber={roomNumber}
                        handleroomNumberChange={handleroomNumberChange}
                        specialRequirements={specialRequirements}
                        handleaddSpecialRequirementsChange={handleaddSpecialRequirementsChange}
                        handlespecialRequirementsChange={handlespecialRequirementsChange}
                        handleaddSpecialRequirementCrossButton={handleaddSpecialRequirementCrossButton}
                        technicalRequirements={technicalRequirements}
                        handleaddtechnicalRequirementsChange={handleaddtechnicalRequirementsChange}
                        handletechnicalRequirementsChange={handletechnicalRequirementsChange}
                        handletechRequirementCrossButton={handletechRequirementCrossButton}
                        invites={invites}
                        handleinviteNameChange={handleinviteNameChange}
                        handleinvitesurNameChange={handleinvitesurNameChange}
                        handleinvitePhoneChange={handleinvitePhoneChange}
                        handleinviteEmailChange={handleinviteEmailChange}
                        handleaddinviteButton={handleaddinviteButton}
                        handleInvitesCrossButton={handleInvitesCrossButton}
                        handleConferenceRoomSubmit={handleConferenceRoomSubmit}
                    />
                )}

                <div className="right-section-roster" >
                    <div className="guideline-container">
                        <p className="guideline-label">Current Site Guideline</p>
                        <p className="guideline-value">{guideline}</p>
                    </div>
                    {selectLimit ? (
                        <p>{`As per current site guideline you can roster a maximum of ${Math.round(
                            selectLimit,
                        )} employees.`}</p>
                    ) : (
                        <p>Please Contact Your Admin For Rostering Limit.</p>
                    )}
                    {!disableComponents && (
                        <React.Fragment>
                            <Input
                                value={searchValue}
                                placeholder="Search for employee"
                                size={'large'}
                                suffix={<SearchOutlined />}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            {searchValue !== '' && (
                                <p style={{ marginTop: '0.5rem', color: '#F2494E' }}>
                                    {'Note: Please do not uncheck any member'}
                                </p>
                            )}
                        </React.Fragment>
                    )}
                    {
                        rosteringFor === 'CONFERENCE' && (
                            <CheckBoxList
                                disableComponents={disableComponents}
                                handleSelectedEmployess={handleSelectedEmployConference}
                                employeesNames={allEmploys?.sort()}
                                selectedEmp={selectedEmployConference}
                                totalSelected={totalSelected}
                            />)
                    }

                    {
                        rosteringFor === 'SINGLE_DAY' && (
                            <>
                                <CheckBoxList
                                    disableComponents={disableComponents}
                                    handleSelectedEmployess={handleSelectedEmployess}
                                    employeesNames={rosteredEmp ? filteredList(allUsers, rosteredEmp) : []}
                                    selectedEmp={selectedEmployess}
                                    totalSelected={totalSelected}
                                />
                                <Checkbox.Group
                                    disabled={true}
                                    className="checkbox-group-container"
                                    options={rosteredEmp?.sort()}
                                />
                            </>)
                    }

                    {
                        rosteringFor !== 'CONFERENCE' && rosteringFor !== 'SINGLE_DAY' &&
                        (<CheckBoxList
                            disableComponents={disableComponents}
                            handleSelectedEmployess={handleSelectedEmployess}
                            employeesNames={allUsers?.sort()}
                            selectedEmp={selectedEmployess}
                            totalSelected={totalSelected}
                        />)
                    }




                </div>
            </Box>
            {openConfirmation && rosterResponseLocal && rosterResponseLocal.split('.')[2] !== " Remaining Roster Left : 0" && (
                <ConfirmationModal
                    closeComfirmationPopUp={closeComfirmationPopUp}
                    displayMessage={rosteringFor === 'GUEST' ? rosterGuestResponseLocal : rosterResponseLocal}
                />
            )}
            {openConfirmation && rosterResponseLocal && rosterResponseLocal.split('.')[2] === " Remaining Roster Left : 0" && (
                <BufferAllocateModal closePopUp={closeComfirmationPopUp} handleSubmit={() => { handleSingleDayRoster(true) }} />
            )}

            {limitReached && (
                <ConfirmationModal
                    closeComfirmationPopUp={closeLimitReachedPopUp}
                    displayMessage={LIMIT_REACHED_MSG(Math.round(selectLimit))}
                />
            )}
            {noSelected && (
                <ConfirmationModal closeComfirmationPopUp={closeNoSelectedPopUp} displayMessage={NO_SELECTED_EMPLOY} />
            )}
            {conferenceRoomFetching && !conferenceRoomBookFetching && (
                <ConfirmationModal closeComfirmationPopUp={ConferenceRoomBookResponseToggle} displayMessage={conferenceRoomBookResponseLocal} />
            )}
            {
                redirectToManager && (<Redirect
                    to={{ pathname: MANAGER_DASHBOARD, state: { headerNotFound: true } }}
                />)
            }
            {

            }
        </div>
    );
}
