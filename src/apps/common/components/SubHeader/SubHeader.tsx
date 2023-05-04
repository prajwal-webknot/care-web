import "./styles.scss";
import * as React from "react";
import { MANAGER_TYPES, STATUS_TYPES } from "../../constants/constants";
import { Button, PageHeader, Select } from "antd";
import { Redirect } from "react-router-dom";
import back from "../../../common/assets/images/back.png";

const { Option } = Select;

interface Props {
  title: string;
  visitorPopUpOpen?: () => any;
  approvalDropDowns?: boolean;
  noExport?: boolean;
  saveButton?: boolean;
  parent: string;
  handleRosterSave?: () => void;
  disableComponents?: boolean;
  handleEdit?: () => void;
  handleCancelClick?: () => void;
  isEditable?: boolean;
  isRoster?: boolean;
  availableSeats?: number;
  bufferSeats?: number;
}

export default function SubHeader(props: Props) {
  const { approvalDropDowns, isEditable, isRoster, availableSeats, bufferSeats } = props;
  function handleDropdownChange(value: any) { }

  const [parent, setParent] = React.useState("");
  React.useEffect(() => {
    setParent(parent);
  }, []);

  function handleBack() {
    setParent(props.parent);
  }
  if (parent) {
    return (
      <Redirect
        to={{ pathname: props.parent, state: { headerNotFound: true } }}
      />
    );
  }
  return (
    <PageHeader
      backIcon={<img src={back} alt="" />}
      title={<div className="grey-font table-header">{props.title}</div>}
      onBack={() => handleBack()}
      style={{ padding: "10px 0" }}
      extra={
        <div className="flex flex-row end" style={{ alignItems: "flex-end" }}>
          {props.visitorPopUpOpen && (
            <Button type="default" onClick={props.visitorPopUpOpen}>
              + Temporary Visitor
            </Button>
          )}
          {/* {approvalDropDowns && (
            <div className="flex flex-row end">
              <div className="padding-right">
                <Select
                  className="header-dropdown"
                  placeholder="Manager"
                  onChange={handleDropdownChange}
                >
                  {MANAGER_TYPES.map((option: any) => {
                    return (
                      <Option
                        disabled
                        className="dropdown-options"
                        key={option}
                        value={option}
                      >
                        {option}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              <div className="padding-right">
                <Select
                  className="header-dropdown"
                  placeholder="Pass Status"
                  onChange={handleDropdownChange}
                >
                  {STATUS_TYPES.map((option: any) => {
                    return (
                      <Option
                        disabled
                        className="dropdown-options"
                        key={option}
                        value={option}
                      >
                        {option}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </div>
          )} */}
          {/* {!props.noExport &&
            <Button className="export-button" type="primary" danger icon={<DownloadOutlined />} size={'middle'}>
              Export
            </Button>
          } */}
          {
            isRoster && (
              <>
                <div className="seat-available">
                  <p>Preferred Seats Available</p>
                  <div>
                    {availableSeats ? availableSeats : "0"}
                  </div>
                </div>
                <div className="seat-available">
                  <p>Buffer Seats Available</p>
                  <div>
                    {bufferSeats ? bufferSeats : "0"}
                  </div>
                </div>
              </>
            )
          }
          {props.saveButton &&
            (props.disableComponents && isEditable ? (
              <Button
                className="save-cancel-button"
                type="primary"
                onClick={props.handleEdit}
              >
                Edit
              </Button>
            ) : (
              !props.disableComponents &&
              isEditable && (
                <div className="">
                  <Button
                    className="save-cancel-button"
                    disabled={props.disableComponents}
                    type="primary"
                    onClick={props.handleCancelClick}
                  >
                    Cancel
                  </Button>

                  <Button
                    className="save-cancel-button"
                    disabled={props.disableComponents}
                    type="primary"
                    onClick={props.handleRosterSave}
                  >
                    Save
                  </Button>
                </div>
              )
            ))}
        </div>
      }
    />
  );
}
