import '../../../../sass/main.scss';
import {
  NAME_KEY,
  NATURE_OF_VISIT_KEY,
  PASS_EXPIRE_TIME_WITH_DATE,
  RISK_STATUS_KEY,
  // SECURITY_ROLE,
  STATUS_KEY
} from "../../../common/constants/constants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { ExpiredPassesActions } from '../../store/actions/ExpiredPassesAction';
import ModalCheckout from '../PremiseHeadCountDetail/modalCheckout';
import { StatusChangeActions } from "../../store/actions/StatusChangeAction";
import TabularData from '../../../common/components/TabularData/tabularData';
import { expiredList, expiredListLoading } from "../../store/reducers/ExpiredPassesReducer";
import getColumnsData from "../../../common/constants/columnsData";
import { dashboardStatusChange } from "../../../common/store/dashboardStatus/dashboardStatusReducer";
import { useParams } from "react-router-dom";

export default function ExpiredPassesDetails(props: any) {
  const dispatch = useDispatch();
  const { view }:any = useParams();
  const locationState = props.location.state;

  // States
  const [epassId, setEpassId] = useState('');
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Selectors
  const dashboardStatus = useSelector(dashboardStatusChange);
  let expiredPassesData: any = useSelector(expiredList);

  let expireParam = {};
  if (locationState?.expireType && locationState?.hours) {
    expireParam = { [locationState.expireType]: locationState.hours };
  }

  let locationParam = [] as any;
  if (view === "hr") {
    locationParam = [
      { site_ids: [dashboardStatus?.site?.id] },
      { unit_ids: [dashboardStatus?.unit?.id] },
    ];
  }

  useEffect(() => {
    dispatch(ExpiredPassesActions.getExpiredPassesRequest({
      dynamicQueryParams: [...locationParam,
      { status: 'expire,checkout_out,not_allowed' },
      { user_view: view === "hr" ? "HR" : view[0].toUpperCase() + view.substring(1) },
        expireParam
      ]
    }));
  }, [dashboardStatus]);


  useEffect(() => {
    setCheckoutModalOpen(props.value);
  }, [props.value, props.id]);

  function handleChange(row: any) {
    closePopUp();
    setEpassId(row.id);
    setCheckoutName(row.name);
  }

  function closePopUp() {
    setCheckoutModalOpen(!checkoutModalOpen);
  }

  function handleSubmit() {
    dispatch(StatusChangeActions.statusChangeRequest({
      path: { dynamicRoute: [epassId] },
      payload: { requested_state: 'checked_out' }
    }));
    closePopUp();
  }

  const mapper: any = {
    not_allowed: "Denied Entry",
    checked_in: "Checked In",
    checked_out: "Checked Out",
    expire: "Expired",
  };

  let data: any = expiredPassesData?.data?.data;
  let expectedVisitorDetail: any = [];
  if (data && data.length > 0) {
    data.forEach((obj: any) => {
      expectedVisitorDetail.push({
        id: obj.id,
        name: obj?.name,
        phone_number: obj?.user?.phone_number,
        nature_of_visit: obj?.nature_of_visit,
        risk_status: obj?.risk_status,
        bluetooth_status: obj?.bluetooth_status,
        pass_expiring_time_with_date: obj?.expiry_time,
        status: (obj?.status && mapper[obj.status]) ?? "-"
      });
    });
  }


  const columnsData = getColumnsData([NAME_KEY, NATURE_OF_VISIT_KEY, RISK_STATUS_KEY, PASS_EXPIRE_TIME_WITH_DATE, STATUS_KEY]);
  const loading: any = useSelector(expiredListLoading);

  return (
    <div className="layout-container">
      <TabularData
        loading={loading}
        parent={locationState?.parent}
        dataSource={expectedVisitorDetail}
        columnsData={columnsData}
        expired_in_24={expiredPassesData?.data?.expired_in_24}
        expired_passes_current_location={expiredPassesData?.data?.expired_passes_current_location}
        title={locationState?.title}
        checkout={true}
        showCounts={locationState?.showCounts}
        setCheckoutModalOpen={handleChange}
      />
      {checkoutModalOpen &&
        <ModalCheckout
          name={checkoutName}
          handleSubmit={handleSubmit}
          closePopUp={closePopUp}
          message={`Do you want to record exit for ${checkoutName}`}
        />
      }
    </div>
  );
}


