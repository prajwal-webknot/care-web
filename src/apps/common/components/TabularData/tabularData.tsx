import * as React from "react";
import { useEffect, useState } from "react";
import "./styles.scss";
import "../../../../sass/main.scss";

import { Card, Table, Input, Row, Select, Button, Typography } from "antd";
import { Capitalize, prettifyKeys } from "../../helpers/utils";
import SubHeader from "../SubHeader/SubHeader";
import approveIcon from "../../assets/images/approve.png";
import checkoutImg from "../../../common/assets/images/checkout.svg";
import rejectIcon from "../../assets/images/reject.svg";
import CButton from "../Button/button";
import { REVOKE_DAY_PASS, REVOKE_ACCESS, SECURITY_ROLE, ROSTER, CONFERENCE, BUFFER, GUEST } from "../../constants/constants";
import EditIcon from "../../assets/images/EditIcon.png";
import ExpandIcon from "../../assets/images/ExpandIcon.png";
import { SearchOutlined, FileExcelOutlined } from "@ant-design/icons";
import moment from "moment";
import { CSVLink } from "react-csv";
const { Search } = Input;
const { Option } = Select;
interface data {
  key?: string;
  name?: string;
  nature_of_visit?: string;
  risk_status?: string;
  pass_expiring_time?: string;
  bluetooth_status?: boolean;
  epass?: string;
  arogya_setu_status?: boolean;
  arrived?: string;
  body_temp?: string;
  inside_premise?: string;
  total_contacts?: number;
}

interface columnsData {
  title: string;
  dataIndex: string;
  key: string;
}
interface Props {
  dataSource: data[];
  columnsData: columnsData[];
  title: string;
  loading: boolean;
  parent: string;
  visitorPopUpOpen?: () => any;
  expectedVisitorType?: any;
  handleVisitorSelect?: any;
  filterOnChange?: any;
  departmentOnChange?: any;
  filterOnSearch?: any;
  dateOnChange?: any;
  setCheckoutModalOpen?: any | undefined;
  checkout?: boolean;
  expectedVisitor?: boolean;
  approvalDropDowns?: boolean;
  approval?: boolean;
  setApproveOpen?: any | undefined;
  handleApproval?: any | undefined;
  showCounts?: boolean;
  expired_in_24?: any;
  expired_passes_current_location?: number;
  approvalTitle?: string;
  revokeOnly?: boolean;
  handleButtonClick?: any | undefined;
  persona?: string;
  actionButtonText?: string;
  editCafe?: boolean;
  seatSummary?: boolean;
  editHotDesk?: boolean;
  conferenceRoomDetails?: boolean;
  openConferenceRoomModalToggle?: () => any;
  cafeView?: boolean;
  roasterReport?: boolean;
  setEditCafeteriaModalOpen?: any | undefined;
  filterArray?: any;
  departmentArray?: any;
  dateArray?: any;
  dateValue?: any;
  filterValue?: any;
  searchValue?: any;
  departmentValue?: any;
  openCafeView?: any | undefined;
  totalSeats?: number;
}

export default function TabularData(props: Props) {
  const {
    setCheckoutModalOpen,
    checkout,
    columnsData,
    dataSource,
    approval,
    expired_in_24,
    expired_passes_current_location,
    title,
    parent,
    visitorPopUpOpen,
    handleVisitorSelect,
    expectedVisitorType,
    setEditCafeteriaModalOpen,
    openCafeView,
    editCafe,
    cafeView,
    filterOnChange,
    departmentOnChange,
    filterOnSearch,
    dateOnChange,
    editHotDesk,
    conferenceRoomDetails,
    openConferenceRoomModalToggle,
    seatSummary,
    roasterReport,
    expectedVisitor,
    handleApproval,
    showCounts,
    revokeOnly,
    handleButtonClick,
    persona,
    loading,
    filterArray,
    departmentArray,
    dateArray,
    departmentValue,
    filterValue,
    searchValue,
    dateValue,
    totalSeats,
  } = props;
  // const [expectedVisitorType, setExpectedVisitorType] = useState("roster");

  const [expectedVisitorTypeLocal, setExpectedVisitorTypeLocal] = useState("roster");
  function expectedVisitorTypeChange(e: any) {
    setExpectedVisitorTypeLocal(e);
    handleVisitorSelect(e);
  }
  const [csvData, setCsvData] = useState([] as any);
  useEffect(() => {
    setCsvData(dataSource);
  }, [dataSource]);
  const columns = checkout
    ? [
      ...columnsData,
      {
        title: "",
        dataIndex: "checkout",
        key: "checkout",
        render: (data: any, row: any) => {
          if (row?.status === "checked_in") {
            return (
              <img
                src={checkoutImg}
                alt=""
                onClick={() => setCheckoutModalOpen(row)}
              />
            );
          }
        },
      },
    ]
    : approval
      ? [
        ...columnsData,
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          render: (approvalStatus: any, row: any) => (
            <div className="approve-status-container flex text-center align-center space-between">
              {persona === "hr" ? (
                <div
                  className={`approve-status ${[
                    "Approved",
                    "Checked In",
                    "Checked Out",
                    "Expired",
                    "Arrived",
                    "Denied Entry",
                  ].includes(approvalStatus) && "green-font"
                    } 
                    ${["hr_approval"].includes(approvalStatus) && "orange-font"}
                     ${["Rejected"].includes(approvalStatus) && "red-font"}`}
                >
                  {["Rejected"].includes(approvalStatus) &&
                    (row.approved_by_hr ?? row.approved_by_manager
                      ? `Rejected by ${row.approved_by_hr ?? row.approved_by_manager
                      }`
                      : approvalStatus)}
                  {[
                    "Approved",
                    "Denied Entry",
                    "Checked In",
                    "Checked Out",
                    "Expired",
                    "Arrived",
                  ].includes(approvalStatus) &&
                    (row.approved_by_hr ?? row.approved_by_manager
                      ? `Approved by ${row.approved_by_hr ?? row.approved_by_manager
                      }`
                      : approvalStatus)}
                  {["hr_approval"].includes(approvalStatus) &&
                    (row.approved_by_manager
                      ? `Approved by ${row.approved_by_manager}`
                      : approvalStatus)}
                </div>
              ) : (
                <div
                  className={`approve-status ${[
                    "Approved",
                    "hr_approval",
                    "Checked In",
                    "Checked Out",
                    "Expired",
                    "Arrived",
                  ].includes(approvalStatus) && "green-font"
                    }
                 ${["manager_approval"].includes(approvalStatus) &&
                    "orange-font"
                    }
                  ${["Rejected", "Denied Entry"].includes(approvalStatus) &&
                    "red-font"
                    }`}
                >
                  {approvalStatus === "manager_approval"
                    ? "Requested"
                    : approvalStatus === "hr_approval"
                      ? "Approved"
                      : approvalStatus}
                </div>
              )}
            </div>
          ),
        },
        {
          title: "",
          dataIndex: "status",
          key: "status",
          render: (approvalStatus: any, row: any) => (
            <div className="approve-status-container flex text-center align-center space-between">
              {["hr_approval"].includes(approvalStatus) && persona === "hr" && (
                <img
                  src={approveIcon}
                  alt=""
                  onClick={() =>
                    handleApproval(row, "approved", "approve request")
                  }
                  className="approve-icon"
                />
              )}
              {["hr_approval"].includes(approvalStatus) && persona === "hr" && (
                <img
                  src={rejectIcon}
                  alt=""
                  onClick={() =>
                    handleApproval(row, "refused", "reject request")
                  }
                  className="reject-icon"
                />
              )}
              {["manager_approval"].includes(approvalStatus) &&
                persona === "manager" && (
                  <img
                    src={approveIcon}
                    alt=""
                    onClick={() =>
                      handleApproval(row, "approved", "approve request")
                    }
                    className="approve-icon"
                  />
                )}
              {["manager_approval"].includes(approvalStatus) &&
                persona === "manager" && (
                  <img
                    src={rejectIcon}
                    alt=""
                    onClick={() =>
                      handleApproval(row, "refused", "reject request")
                    }
                    className="reject-icon"
                  />
                )}
              {["Approved", "hr_approval"].includes(approvalStatus) &&
                persona === "manager" && (
                  <CButton
                    title={REVOKE_DAY_PASS}
                    handleClick={() =>
                      handleApproval(row, "refused", "revoke day pass")
                    }
                  />
                )}
              {["Approved"].includes(approvalStatus) && persona === "hr" && (
                <CButton
                  title={REVOKE_DAY_PASS}
                  handleClick={() =>
                    handleApproval(row, "refused", "revoke day pass")
                  }
                />
              )}
            </div>
          ),
        },
      ]
      : revokeOnly
        ? [
          ...columnsData,
          {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (value: any, row: any) => (
              <CButton
                title={REVOKE_ACCESS}
                handleClick={() => handleButtonClick(row.id)}
              />
            ),
          },
        ]
        : editCafe
          ? [
            ...columnsData,
            {
              title: "",
              dataIndex: "action",
              key: "action",
              render: (value: any, row: any) => (
                <img
                  title="Edit"
                  style={{ cursor: "pointer" }}
                  src={EditIcon}
                  alt="edit"
                  onClick={() => setEditCafeteriaModalOpen(row)}
                />
              ),
            },
            {
              title: "",
              dataIndex: "action",
              key: "action",
              render: (value: any, row: any) => (
                <img
                  title="Summary"
                  style={{ cursor: "pointer" }}
                  src={ExpandIcon}
                  alt="expand"
                  onClick={() => openCafeView(row)}
                />
              ),
            },
          ]
          : conferenceRoomDetails ? [
            ...columnsData,
            {
              title: "",
              dataIndex: "action",
              key: "action",
              render: (value: any, row: any) => (
                <React.Fragment>
                  <div style={{ textAlign: "center" }}>
                    <img
                      title="Edit"
                      style={{ cursor: "pointer" }}
                      src={EditIcon}
                      alt="Edit"
                      onClick={() => setEditCafeteriaModalOpen(row)}
                    />
                  </div>
                </React.Fragment>
              ),
            },

          ] : expectedVisitor
            ? [
              ...columnsData,
              {
                title: "",
                dataIndex: "action",
                key: "action",
                render: (value: any, row: any) => (
                  <React.Fragment>
                    {expectedVisitorType === CONFERENCE || persona === SECURITY_ROLE ? (
                      <></>
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        <img
                          title="Edit"
                          style={{ cursor: "pointer" }}
                          src={EditIcon}
                          alt="Edit"
                          onClick={() => setCheckoutModalOpen(row)}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ),
              },
            ]
            : editHotDesk
              ? [
                ...columnsData,
                {
                  title: "",
                  dataIndex: "action",
                  key: "action",
                  render: (value: any, row: any) => (
                    <React.Fragment>
                      {row.alloted_seat ? (
                        <div style={{ textAlign: "center" }}>
                          <img
                            title="Edit"
                            style={{ cursor: "pointer" }}
                            src={EditIcon}
                            alt="Edit"
                            onClick={() => setEditCafeteriaModalOpen(row)}
                          />
                        </div>
                      ) : (
                        <div style={{ textAlign: "center" }}>
                          <CButton
                            title={"Allot Seat"}
                            handleClick={() => setEditCafeteriaModalOpen(row)}
                            allotSeat={true}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  ),
                },
              ]
              : seatSummary && dateValue?.timeStamp === moment().startOf("day").unix()
                ? [
                  ...columnsData,
                  {
                    title: "",
                    dataIndex: "action",
                    key: "action",
                    render: (value: any, row: any) => {
                      return (
                        <React.Fragment>
                          {row.epass_status === "checked_in" && (
                            <div style={{ textAlign: "center" }}>
                              <img
                                title="Edit"
                                style={{ cursor: "pointer" }}
                                src={EditIcon}
                                alt="Edit"
                                onClick={() => setEditCafeteriaModalOpen(row)}
                              />
                            </div>
                          )}
                        </React.Fragment>
                      );
                    },
                  },
                ]
                : columnsData;

  return (
    <>
      <SubHeader
        parent={parent}
        title={title}
        approvalDropDowns={props.approvalDropDowns}
      />
      {showCounts && (
        <div className="flex flex-row w-50 count-row">
          <div className="padding-right flex flex-row">
            <div className="padding-right">
              No of users with expired passes in last 24 hours
            </div>
            <span className="number">{expired_in_24 ?? "-"}</span>
          </div>
          <div className="padding-right flex flex-row">
            <div className="padding-right">
              No of users with expired passes still in current location
            </div>
            <span className="number">
              {expired_passes_current_location ?? "-"}
            </span>
          </div>
        </div>
      )}
      {
        expectedVisitor && (
          <Row justify="space-between" align="middle">
            <Row>
              <p style={{ fontSize: "17px" }}>
                {
                  expectedVisitorType === ROSTER && ("Rostered Employees")
                }
                {
                  expectedVisitorType === CONFERENCE && ("Booked Conference Rooms")
                }
                {
                  expectedVisitorType === BUFFER && ("Buffer Seats Allocated")
                }
                {
                  expectedVisitorType === GUEST && ("Expected Guests")
                }
              </p>
            </Row>
            <Row>
              <Select
                size={"middle"}
                className={"filter-row" + " large-input"}
                // defaultValue={"roster"}
                // value={expectedVisitorTypeLocal}
                defaultValue={"Select Category"}
                style={{ marginRight: '8px' }}
                onChange={(e) => expectedVisitorTypeChange(e)}
              >

                <Option value={ROSTER} key={1}>
                  Roster
                </Option>
                <Option value={CONFERENCE} key={2}>
                  Conference Room
                </Option>
                <Option value={BUFFER} key={3}>
                  Buffer Allocation
                </Option>
                <Option value={GUEST} key={4}>
                  Guest
                </Option>

              </Select>
              <Button type="default" onClick={visitorPopUpOpen}>
                + Temporary Visitor
              </Button>
            </Row>
          </Row>
        )
      }
      {editCafe && (
        <Row justify="end" align="middle">
          <Input
            value={searchValue}
            className={"filter-row" + " large-input"}
            placeholder="Search Cafeteria"
            // enterButton="Search"
            size={"large"}
            suffix={<SearchOutlined />}
            onChange={(e) => filterOnSearch(e.target.value)}
          />
          <Select
            size={"large"}
            className={"filter-row" + " large-input"}
            defaultValue={filterValue}
            onChange={(val) => filterOnChange(val)}
          >
            {filterArray.map((val: any, index: any) => (
              <Option value={val} key={index}>
                {val}
              </Option>
            ))}
          </Select>
        </Row>
      )}
      {cafeView && (
        <>
          <Row justify="end" align="middle">
            {csvData.length > 0 && (
              <CSVLink
                className={"filter-row"}
                filename={"CafeView.csv"}
                headers={columns
                  ?.map((col: any) => {
                    return { label: col.title, key: col.key };
                  })
                  .filter((data: any) => data.key !== "serial_number")}
                data={csvData}
              >
                <Button size={"large"}>
                  Export to csv
                  <FileExcelOutlined />
                </Button>
              </CSVLink>
            )}
            <Select
              size={"large"}
              className={"filter-row" + " large-input"}
              defaultValue={filterValue}
              onChange={(val) => filterOnChange(val)}
            >
              {filterArray.map((val: any, index: any) => (
                <Option value={val} key={index}>
                  {val}
                </Option>
              ))}
            </Select>
          </Row>
          <Row
            align="middle"
            justify="start"
            style={{
              marginBottom: "0.5rem",
              fontSize: "1.25rem",
              marginLeft: "0.5rem",
            }}
          >
            <Typography>Total Capacity:&nbsp;{totalSeats}</Typography>
          </Row>
        </>
      )}
      {editHotDesk && (
        <Row justify="end" align="middle">
          <Input
            className={"filter-row" + " large-input"}
            placeholder="Search by Employee Details"
            size={"large"}
            suffix={<SearchOutlined />}
            onChange={(e) => filterOnSearch(e.target.value)}
          />
        </Row>
      )}
      {conferenceRoomDetails && (
        <Row justify="space-between" align="middle">
          <Button type="primary" onClick={openConferenceRoomModalToggle} >Block a Conference Room</Button>
          <Input
            className={"filter-row" + " large-input"}
            placeholder="Search by Employee Details"
            size={"large"}
            suffix={<SearchOutlined />}
            onChange={(e) => filterOnSearch(e.target.value)}
          />
        </Row>
      )}
      {seatSummary && (
        <Row justify="end" align="middle">
          {csvData.length > 0 && (
            <CSVLink
              className={"filter-row"}
              filename={`SeatSummary(${dateValue?.date}).csv`}
              headers={columns
                ?.map((col: any) => {
                  return { label: col.title, key: col.key };
                })
                .filter((data: any) => data.key !== "serial_number")}
              data={csvData.map((data: any) => {
                return {
                  ...data,
                  date: moment.unix(data.date).format("DD-MM-YYYY"),
                  time: moment
                    .unix(data.time)
                    .subtract(1, "day")
                    .format("hh:mm A"),
                };
              })}
            >
              <Button size={"large"}>
                Export to csv
                <FileExcelOutlined />
              </Button>
            </CSVLink>
          )}
          <Input
            value={searchValue}
            className={"filter-row" + " large-input"}
            placeholder="Search by Employee Details"
            // enterButton="Search"
            size={"large"}
            suffix={<SearchOutlined />}
            onChange={(e) => filterOnSearch(e.target.value)}
          />
          <Select
            size={"large"}
            className={"filter-row" + " medium-input"}
            defaultValue={dateValue.timeStamp}
            onChange={(val) => dateOnChange(val)}
            listHeight={250}
          >
            {dateArray.map((val: any, index: any) => (
              <Option value={parseFloat(val.timeStamp)} key={index}>
                {val.date}
              </Option>
            ))}
          </Select>
          <Select
            size={"large"}
            className={"filter-row" + " medium-input"}
            defaultValue={departmentValue}
            onChange={(val) => departmentOnChange(val)}
            listHeight={250}
          >
            {departmentArray.map((val: any, index: any) => (
              <Option value={val.id} key={index}>
                {val.unit_bu}
              </Option>
            ))}
          </Select>
          <Select
            size={"large"}
            className={"filter-row" + " medium-input"}
            defaultValue={filterValue}
            onChange={(val) => filterOnChange(val)}
          >
            {filterArray.map((val: any, index: any) => (
              <Option value={val} key={index}>
                {Capitalize(prettifyKeys(val.toLowerCase()))}
              </Option>
            ))}
          </Select>
        </Row>
      )}
      {roasterReport && (
        <Row justify="end" align="middle">
          {csvData.length > 0 && (
            <CSVLink
              className={"filter-row"}
              filename={`RosterReport(${dateValue.date}).csv`}
              headers={columns
                ?.map((col: any) => {
                  return { label: col.title, key: col.key };
                })
                .filter((data: any) => data.key !== "serial_number")}
              data={csvData}
            >
              <Button size={"large"}>
                Export to csv
                <FileExcelOutlined />
              </Button>
            </CSVLink>
          )}
          <Input
            value={searchValue}
            className={"filter-row" + " large-input"}
            placeholder="Search by Employee Details"
            size={"large"}
            suffix={<SearchOutlined />}
            onChange={(e) => filterOnSearch(e.target.value)}
          />
          <Select
            size={"large"}
            className={"filter-row" + " medium-input"}
            defaultValue={dateValue.timeStamp}
            onChange={(val) => dateOnChange(val)}
            listHeight={250}
          >
            {dateArray.map((val: any, index: any) => (
              <Option value={parseFloat(val.timeStamp)} key={index}>
                {val.date}
              </Option>
            ))}
          </Select>
          <Select
            size={"large"}
            className={"filter-row" + " large-input"}
            defaultValue={filterValue}
            // style={{ width: 300 }}
            onChange={(val) => filterOnChange(val)}
          >
            {filterArray.map((val: any, index: any) => (
              <Option value={val} key={index}>
                {val}
              </Option>
            ))}
          </Select>
        </Row>
      )}
      <Card className="border-radius-10">
        <Table
          loading={loading}
          dataSource={dataSource}
          columns={columns}
          showSorterTooltip={true}
          pagination={{ hideOnSinglePage: true }}
        // onRow={
        //   (record: any) => {
        //     return {
        //       onClick: (event: any) => {
        //         expectedVisitor && setCheckoutModalOpen(record);
        //       },
        //     };
        //   }
        // loading={true}
        // }
        />
      </Card>
    </>
  );
}
