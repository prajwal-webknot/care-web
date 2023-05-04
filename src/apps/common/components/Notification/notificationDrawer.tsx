import React, { useEffect } from "react";
import { Card, Modal, Spin } from "antd";
import "./notification.scss";
import "../../../../sass/main.scss";
import deleteIcon from "../../../common/assets/images/delete-white.svg";
import reloadIcon from "../../../common/assets/icons/restart-line.svg";
import moment from "moment";
import { notificationSelect, notificationLoading } from "../../store/notification/NotificationsReducer";
import { useDispatch, useSelector } from "react-redux";
import { NotificationsActions } from "../../store/notification/NotificationsAction";
import { markNotificationSelect } from "../../store/notification/MarkNotificationsReducer";

interface Props {
  openNotificationWithIcon: () => void;
}

/**
 * To render notification on click of notification bell
 **/
export default function NotificationDrawer(props: Props) {
  const dispatch = useDispatch();

  // Selectors
  const getNotificationFullResp = useSelector(notificationSelect);
  const notificationFetching = useSelector(notificationLoading);
  const markNotificationResp = useSelector(markNotificationSelect);

  const notifications = getNotificationFullResp?.data ?? [];

  useEffect(() => {
    dispatch(NotificationsActions.getNotificationsRequest({
      dynamicQueryParams: [
        { page: 1 },
        { page_size: 100 },
        { client: 'web' }
      ]
    }));
  }, [markNotificationResp]);

  const handleReadNotif = (id: number) => {
    dispatch(NotificationsActions.markNotificationsReadRequest({
      notification_id_list: [id]
    }));
  };

  function handleRefresh() {
    dispatch(NotificationsActions.getNotificationsRequest({
      dynamicQueryParams: [
        { page: 1 },
        { page_size: 100 },
        { client: 'web' }
      ]
    }));
  }

  return (
    <Modal
      visible
      width={"25%"}
      onCancel={props.openNotificationWithIcon}
      footer={null}
      className="notification"
      bodyStyle={{ padding: "0px" }}
      closeIcon={
        <img
          src={deleteIcon}
          className="cancel-button"
          alt=""
        />
      }
    >
      <div className="notification-header flex align-center">
        <div className="modal-header">Notifications</div>
        <img
          src={reloadIcon}
          alt="reload"
          className="refresh-notification-icon"
          onClick={handleRefresh}
        />
      </div>

      {!notificationFetching ? (
        <div className="notification-body">
          {notifications.map((data: any) => {
            return (
              <Card
                className={`li-item ${!data.is_read ? 'notification-cards' : ""}`}
                onClick={() => handleReadNotif(data.id)}
                key={data.id}>
                <div className="flex flex-column">
                  <div className="flex space-between">
                    {/* <div className="header-text">
                        {data.heading}
                      </div> */}
                  </div>
                  <div
                    key={data.id}
                    className="notification-text"
                  >
                    {data.data}
                  </div>
                  <div className="time-not">
                    {moment.unix(data.created_on).fromNow()}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
          <div className="notification-body loader-body">

            <Spin />
          </div>
        )}
    </Modal>
  );
}

