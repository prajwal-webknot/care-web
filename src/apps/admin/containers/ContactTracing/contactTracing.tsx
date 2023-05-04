import React, { useEffect, useState } from "react";
import '../../../../sass/dashboard.scss';
import {
  NAME_KEY,
  NATURE_OF_EMPLOYMENT,
  RISK_STATUS_KEY,
  INSIDE_PREMISES,
  TOTAL_CONTACTS,
  SITE_KEY
} from "../../../common/constants/constants";
import TabularData from '../../../common/components/TabularData/tabularData';
import getColumnsData from "../../../common/constants/columnsData";
import { Select, Button } from "antd";
import { ContactTracingActions } from "../../store/actions/ContactTracingAction";
import { useDispatch, useSelector } from "react-redux";
import { contactTracingResponse, contactTracingFetching } from "../../store/reducers/ContactTracingReducer";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function ContactTracing() {
  const dispatch = useDispatch();
  const [empId, setEmpId] = useState<Number>();
  const [days, setDays] = useState<Number>();
  let contactTracingResp: any = useSelector(contactTracingResponse);
  const loading: boolean = useSelector(contactTracingFetching);

  useEffect(() => {
    dispatch(ContactTracingActions.getContactTracingRequest({}));
  }, []);

  function handleSearch() {
    dispatch(ContactTracingActions.getContactTracingRequest({
      dynamicQueryParams: [
        { id: empId },
        { days: days }
      ]
    }));
  }
  function handleDayChange(days: number) {
    setDays(days);
  }

  function handleEmpChange(empId: number) {
    setEmpId(namdIdmapper[empId]);
  }

  let namdIdmapper: any = {};
  contactTracingResp?.data?.employee_list?.forEach((obj: any) => {
    namdIdmapper[obj.value] = obj.key;
  });
  let contactTracingDetails: any = [];
  contactTracingResp?.data?.traces?.forEach((obj: any) => {
    contactTracingDetails.push({
      id: obj.id,
      name: obj?.name,
      inside_premise: obj?.inside_premise,
      nature_of_employment: obj?.nature_of_visit,
      risk_status: obj?.risk_status,
      site: obj?.site,
      total_contacts: obj?.total_contacts
    });
  });


  const employeeList: any = contactTracingResp?.data?.employee_list ?? [];
  const columnsData = getColumnsData([NAME_KEY, NATURE_OF_EMPLOYMENT, SITE_KEY, RISK_STATUS_KEY, INSIDE_PREMISES, TOTAL_CONTACTS]);
  return (
    <div className="layout-container">
      <div className="flex flex-row vertical-center">
        <p className="p-default-margin contact-tracing-labels">Contacts of</p>
        <Select
          className="ct-employee-dropdown"
          placeholder="Select an Employee"
          onChange={handleEmpChange}
          showSearch
          autoClearSearchValue
        >
          {employeeList?.map((option: any) => {
            return (
              <Option
                className="dropdown-options"
                key={option.key}
                value={option.value}
              >
                {option?.value ?? ""}
              </Option>
            );
          })
          }
        </Select>
        <p className="p-default-margin contact-tracing-labels">in the past</p>

        <Select className="header-dropdown ct-days-dropdown" placeholder={`1-${contactTracingResp?.data?.days_upper_limit ?? '30'}`} onChange={handleDayChange}>
          {Array.from(Array(contactTracingResp?.data?.days_upper_limit), (_, i) => i + 1)?.map((option: number) => {
            return (
              <Option className="dropdown-options" key={option} value={option}>
                {option}
              </Option>
            );
          })
          }
        </Select>
        <p className="p-default-margin contact-tracing-labels">days</p>
        <Button disabled={empId && days ? false : true} type="primary" className="ct-search-button" onClick={handleSearch}>
          Search <SearchOutlined />
        </Button>
      </div>
      <TabularData
        loading={loading}
        parent={'/admin'}
        dataSource={contactTracingDetails}
        columnsData={columnsData}
        title={'Contact Tracing'}
      />
    </div>
  );
}
