import React, { useRef } from "react";
import "../../../sass/main.scss";
import {
  COLOR_MAPPING,
  RISK_STATUS_MAPPER_FUNC,
  BLUETOOTH_STATUS,
  R2W_INDEX,
  STATUS_KEY,
} from "./constants";
import { Tag, Space, Button, Input } from "antd";
import { Capitalize, prettifyKeys } from "../helpers/utils";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";

export default function ColumnsData(keys: string[]) {
  let searchInput = useRef<any>(null);

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined
        style={{ color: filtered ? "#1890ff" : "#5d5d61", fontSize: "14px" }}
      />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.current?.focus());
      }
    },
  });

  const handleSearch = (confirm: any) => {
    confirm();
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
  };

  const data = [
    {
      title: "S.No",
      dataIndex: "serial_number",
      key: "serial_number",
      render: (text: any, record: any, index: any) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "Organiser",
      dataIndex: "organiser",
      key: "organiser",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      render: (organiser: string) => organiser,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      render: (name: string) => name,
      ...getColumnSearchProps("name"),
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      sorter: (a: any, b: any) => a.first_name.localeCompare(b.first_name),
      render: (first_name: string) => first_name,
      ...getColumnSearchProps("first_name"),
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      sorter: (a: any, b: any) => a.last_name.localeCompare(b.last_name),
      render: (last_name: string) => last_name,
      ...getColumnSearchProps("last_name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: any, b: any) => a.email.localeCompare(b.email),
      render: (email: string) => email,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      render: (phone_number: string) => phone_number,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string) => title,
    },
    {
      title: "Room no.",
      dataIndex: "room_number",
      key: "room_number",
      render: (room_number: number) => room_number,
    },
    {
      title: "Conference Room no.",
      dataIndex: "conference_room_number",
      key: "conference_room_number",
      render: (conference_room_number: number) => conference_room_number,
    },
    {
      title: "Starting time",
      dataIndex: "starting_time",
      key: "starting_time",
      render: (starting_time: string) => starting_time,
    },
    {
      title: "Ending time",
      dataIndex: "ending_time",
      key: "ending_time",
      render: (ending_time: string) => ending_time,
    },
    {
      title: "Floor",
      dataIndex: "floor",
      key: "floor",
      render: (floor: number) => floor,
    },
    {
      title: "Nature of Visit",
      dataIndex: "type",
      key: "type",
      sorter: (a: any, b: any) =>
        prettifyKeys(a.name).localeCompare(prettifyKeys(b.name)),
      render: (type: string) => prettifyKeys(type),
    },
    {
      title: "Nature of Visit",
      dataIndex: "nature_of_visit",
      key: "nature_of_visit",
      sorter: (a: any, b: any) =>
        a.nature_of_visit.localeCompare(b.nature_of_visit),
    },
    // for lunch seat allocation table

    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      sorter: (a: any, b: any) => a.username.localeCompare(b.username),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: any, b: any) => a.email.localeCompare(b.email),
      render: (type: string) => <span style={{ wordBreak: "break-word" }}>{type}</span>,
    },
    {
      title: "Poornata ID",
      dataIndex: "poornata_id",
      key: "poornata_id",
      sorter: (a: any, b: any) => a.poornata_id.localeCompare(b.poornata_id),
    },
    {
      title: "Unit-Business",
      dataIndex: "unit_business",
      key: "unit_business",
      sorter: (a: any, b: any) => a.poornata_id.localeCompare(b.poornata_id),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      // sorter: (a: any, b: any) => a.date - b.date,
      // defaultSortOrder: "descend",
      render: (date: number) => (
        <span>{moment.unix(date).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      sorter: (a: any, b: any) => a.time - b.time,
      render: (date: number) => (
        <span>{moment.unix(date).subtract(1, "day").format("hh:mm A")}</span>
      ),
    },
    {
      title: "Booked Slot",
      dataIndex: "slot",
      key: "slot",
      sorter: (a: any, b: any) => a.slot.localeCompare(b.slot),
    },
    {
      title: "Cafeteria Name",
      dataIndex: "cafeteria_name",
      key: "cafeteria_name",
      sorter: (a: any, b: any) =>
        a.cafeteria_name.localeCompare(b.cafeteria_name),
    },
    {
      title: "Site",
      dataIndex: "site_name",
      key: "site_name",
      sorter: (a: any, b: any) => a.site_name.localeCompare(b.site_name),
    },
    {
      title: "Total Capacity",
      dataIndex: "available_seats",
      key: "available_seats",
      sorter: (a: any, b: any) => a.available_seats - b.available_seats,
    },
    {
      title: "Area Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (is_active: any) => (
        <span style={is_active === "Inactive" ? { color: "red" } : {}}>
          {is_active}
        </span>
      ),
    },
    // for hot desking table

    // {
    //   title: "Name",
    //   dataIndex: "employee_name",
    //   key: "employee_name",
    //   sorter: (a: any, b: any) =>
    //     a.employee_name.localeCompare(b.employee_name),
    // },
    {
      title: "Department",
      dataIndex: "unit_name",
      key: "unit_name",
      sorter: (a: any, b: any) => a.unit_name.localeCompare(b.unit_name),
    },
    {
      title: "Nature of Visit",
      dataIndex: "employee_nature_of_visit",
      key: "employee_nature_of_visit",
      sorter: (a: any, b: any) =>
        a.employee_nature_of_visit.localeCompare(b.employee_nature_of_visit),
      render: (type: string) => Capitalize(prettifyKeys(type)),
    },
    {
      title: "ePass Status",
      dataIndex: "epass_status",
      key: "epass_status",
      sorter: (a: any, b: any) => a.epass_status.localeCompare(b.epass_status),
      render: (type: string) => Capitalize(prettifyKeys(type)),
    },
    {
      title: "Roaster Status",
      dataIndex: "roaster_status",
      key: "roaster_status",
      sorter: (a: any, b: any) =>
        a.roaster_status.localeCompare(b.roaster_status),
    },
    {
      title: "Alloted Seat",
      dataIndex: "alloted_seat",
      key: "alloted_seat",
      sorter: (a: any, b: any) => a.alloted_seat.localeCompare(b.alloted_seat),
    },
    {
      title: "Seat",
      dataIndex: "seat",
      key: "seat",
      sorter: (a: any, b: any) => a.seat.localeCompare(b.seat),
    },
    {
      title: "Seat Cluster",
      dataIndex: "seat_cluster",
      key: "seat_cluster",
      sorter: (a: any, b: any) => a.seat_cluster.localeCompare(b.seat_cluster),
    },
    {
      title: "Seat Type",
      dataIndex: "seat_type",
      key: "seat_type",
      sorter: (a: any, b: any) => a.seat_type.localeCompare(b.seat_type),
    },
    {
      title: "Added By",
      dataIndex: "added_by",
      key: "added_by",
      sorter: (a: any, b: any) => a.added_by.localeCompare(b.added_by),
    },
    {
      title: "Nature of Employment",
      dataIndex: "nature_of_employment",
      key: "nature_of_employment",
      sorter: (a: any, b: any) =>
        a.nature_of_visit.localeCompare(b.nature_of_visit),
    },
    {
      title: "Nature of Approval",
      dataIndex: "nature_of_visit",
      key: "nature_of_approval",
      sorter: (a: any, b: any) =>
        a.nature_of_visit.localeCompare(b.nature_of_visit),
    },
    {
      title: "Site",
      dataIndex: "site",
      key: "site",
      sorter: (a: any, b: any) => a.site.localeCompare(b.site),
    },
    {
      title: R2W_INDEX,
      dataIndex: "risk_status",
      key: "risk_status",
      sorter: (a: any, b: any) =>
        Capitalize(RISK_STATUS_MAPPER_FUNC(a.risk_status)).localeCompare(
          Capitalize(RISK_STATUS_MAPPER_FUNC(b.risk_status))
        ),
      render: (riskStatus: "low" | "high" | "medium") => (
        <span className={`${COLOR_MAPPING[riskStatus]}-font`}>
          {Capitalize(RISK_STATUS_MAPPER_FUNC(riskStatus))}
        </span>
      ),
    },
    {
      title: "Time to Pass Expiry",
      dataIndex: "pass_expiring_time",
      key: "pass_expiring_time",
      defaultSortOrder: "descend",
      sorter: (a: any, b: any) => a.pass_expiring_time - b.pass_expiring_time,
      render: (expiryTime: number) => (
        <span>{moment.unix(expiryTime).format("hh:mm A")}</span>
      ),
    },
    {
      title: "Time of Pass Expiry",
      dataIndex: "pass_expiring_time_with_date",
      key: "pass_expiring_time_with_date",
      defaultSortOrder: "descend",
      sorter: (a: any, b: any) =>
        a.pass_expiring_time_with_date - b.pass_expiring_time_with_date,
      render: (expiryTime: number) => (
        <span>{moment.unix(expiryTime).format("MMM DD, hh:mm A")}</span>
      ),
    },
    {
      title: BLUETOOTH_STATUS,
      dataIndex: "bluetooth_status",
      key: "bluetooth_status",
      sorter: (a: any, b: any) =>
        a.bluetooth_status.localeCompare(b.bluetooth_status),
      render: (bluetoothStatus: boolean) => (
        <span>
          <Tag
            className="tag-bluetooth"
            color={`${bluetoothStatus ? "#6abf69" : ""}`}
          >
            {bluetoothStatus ? "ON" : "OFF"}
          </Tag>
        </span>
      ),
    },
    {
      title: Capitalize(STATUS_KEY),
      dataIndex: "status",
      key: "status",
      sorter: (a: any, b: any) => a.status.localeCompare(b.status),
    },
    {
      title: "Approval Status",
      dataIndex: "status",
      key: "approval_status",
      sorter: (a: any, b: any) => a.status.localeCompare(b.status),
    },
    {
      title: "Roster Status",
      dataIndex: "roster_status",
      key: "roster_status",
      sorter: (a: any, b: any) =>
        a.roster_status.localeCompare(b.roster_status),
      render: (rosterStatus: "Green" | "Grey") => (
        <span
          className={`${rosterStatus === "Green" ? "green-font" : "grey-font"}`}
        >
          {rosterStatus}
        </span>
      ),
    },
    {
      title: "Inside Premises",
      dataIndex: "inside_premise",
      key: "inside_premise",
      sorter: (a: any, b: any) =>
        a.inside_premise.localeCompare(b.inside_premise),
      render: (premiseStatus: "Yes" | "No") => (
        <span
          className={`${premiseStatus === "Yes" ? "green-font" : "grey-font"}`}
        >
          {Capitalize(premiseStatus)}
        </span>
      ),
    },
    {
      title: "Contact instances",
      dataIndex: "total_contacts",
      key: "total_contacts",
      sorter: (a: any, b: any) => a.total_contacts - b.total_contacts,
    },
  ];

  return data.filter((obj: any) => keys.includes(obj.key));
}

// export default columnsData;
