export interface EmpData {
    emp_id: number,
    name: string
}
const EmployData: EmpData[] = [

    {
        emp_id: 1,
        name: "Dipanshu"
    },
    {
        emp_id: 2,
        name: "Oliver Hansen"
    },
    {
        emp_id: 3,
        name: 'Van Henry'
    },
    {
        emp_id: 4,
        name: 'April Tucker'

    },
    {
        emp_id: 5,
        name: "Ralph Hubbard"
    },
    {
        emp_id: 6,
        name: 'Omar Alexander'
    },
    // {
    //     emp_id: 7,
    //     name: 'Carlos Abbott'
    // },
    // {
    //     emp_id: 8,
    //     name: "Oliver Hansen"
    // },
    // {
    //     emp_id: 9,
    //     name: 'Virginia Andrews',
    // },
    // {
    //     emp_id: 10,
    //     name: 'Kelly Snyder',

    // },
    // {
    //     emp_id: 11,
    //     name: 'Bradley Wilkerson',
    // },
    // {
    //     emp_id: 12,
    //     name: 'Miriam Wagner',
    // },

]


export const days = [
    "su",
    "mo",
    "tu",
    "we",
    "th",
    "fr",
    "sa",
]
export const floors = [
    1, 2, 3, 4, 5
]

export function generate_series(step: number) {
    const dt = new Date();
    const rc = [];
    while (dt.getDate() === 1) {
        rc.push(dt.toLocaleTimeString('en-US'));
        dt.setMinutes(dt.getMinutes() + step);
    }
    return rc;
}

export const timeIntervalAMPM = [
    '12:00 AM',
    '12:30 AM',
    '1:00 AM',
    '1:30 AM',
    '2:00 AM',
    '2:30 AM',
    '3:00 AM',
    '3:30 AM',
    '4:00 AM',
    '4:30 AM',
    '5:00 AM',
    '5:30 AM',
    '6:00 AM',
    '6:30 AM',
    '7:00 AM',
    '7:30 AM',
    '8:00 AM',
    '8:30 AM',
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
    '6:30 PM',
    '7:00 PM',
    '7:30 PM',
    '8:00 PM',
    '8:30 PM',
    '9:00 PM',
    '9:30 PM',
    '10:00 PM',
    '10:30 PM',
    '11:00 PM',
    '11:30 PM']
export const timeInterval = [
    '00:00:00',
    '00:30:00',
    '01:00:00',
    '01:30:00',
    '02:00:00',
    '02:30:00',
    '03:00:00',
    '03:30:00',
    '04:00:00',
    '04:30:00',
    '05:00:00',
    '05:30:00',
    '06:00:00',
    '06:30:00',
    '07:00:00',
    '7:30:00',
    '08:00:00',
    '08:30:00',
    '09:00:00',
    '09:30:00',
    '10:00:00',
    '10:30:00',
    '11:00:00',
    '11:30:00',
    '12:00:00',
    '12:30:00',
    '13:00:00',
    '13:30:00',
    '14:00:00',
    '14:30:00',
    '15:00:00',
    '15:30:00',
    '16:00:00',
    '16:30:00',
    '17:00:00',
    '17:30:00',
    '18:00:00',
    '18:30:00',
    '19:00:00',
    '19:30:00',
    '20:00:00',
    '20:30:00',
    '21:00:00',
    '21:30:00',
    '22:00:00',
    '22:30:00',
    '23:00:00',
    '23:30:00']

export const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

interface room {
    room_no: number,
    projector: boolean,
    addition_info: string,
    available: boolean
}
export const roomsData: room[] = [
    {
        room_no: 401,
        projector: true,
        addition_info: "mic and speaker",
        available: true
    },
    {
        room_no: 402,
        projector: true,
        addition_info: 'mic and speaker',
        available: false
    },
    {
        room_no: 403,
        projector: true,
        addition_info: 'mic and speaker',
        available: true
    },
    {
        room_no: 404,
        projector: true,
        addition_info: 'mic and speaker',
        available: true
    },
    {
        room_no: 405,
        projector: false,
        addition_info: 'mic and speaker',
        available: true
    },



]


export default EmployData;
