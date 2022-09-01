import axios from "axios";
import { getConfig } from "../users/logout/services";

const root = process.env.NEXT_PUBLIC_ROOT;

const handelSendNotificationToken = async (
  token: string,
  notificationToken: string
) => {
  try {
    const res = await axios.post(
      `${root}/user/save-token`,
      {
        token: notificationToken,
      },
      getConfig(token)
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default handelSendNotificationToken;
