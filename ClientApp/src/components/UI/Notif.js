import {  notification } from 'antd';

export const openNotification = props => {
  notification[props.type]({
    message: props.message,
    description:
      props.description
  });
};