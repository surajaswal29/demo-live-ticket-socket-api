import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
  liveagent_user: String,
  liveagent_ticket: String,
  text: String,
  created_at: { type: Date, default: Date.now },
});

const notificationModel = mongoose.model(
  "Notification",
  notificationSchema,
  "Notification"
);

export default notificationModel;
