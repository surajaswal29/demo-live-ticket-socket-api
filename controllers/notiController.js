import Notification from "../model/notificationModel.js";
import { getIO, getUser, getActiveUsers } from "../config/socketConfig.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort("created_at");

    if (notifications.length == 0) {
      res.json({
        status: "failure",
        error: "No notifications found",
      });
    } else {
      res.json({
        success: "success",
        data: notifications,
      });
    }
  } catch (error) {
    res.json({
      success: "failure",
      error: error.message,
    });
  }
};

export const sendNotification = async (req, res) => {
  try {
    console.log("data is", req.body);
    const notification = await Notification.create(req.body);
    await notification.save();
    // ticketAssigned
    // ticket_id
    // user_id
    // text

    if (notification) {
      const io = getIO();
      const activeUsers = getActiveUsers();

      activeUsers.forEach((u) => {
        console.log(`line 42: ${u}`);
      });

      const notified_user = getUser(req.body.liveagent_user);

      console.log(`line 47: ${notified_user}`);

      notified_user &&
        io.to(notified_user.socketId).emit("sendNotification", notification);

      res.status(201).json({
        status: "success",
        msg: "Notification sent!", //testing
        data: notification, //testing
      });
    } else {
      res.status(404).json({ error: "could not sent notification" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
