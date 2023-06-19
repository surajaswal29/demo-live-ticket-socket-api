import express from "express";
import {
  getNotifications,
  sendNotification,
} from "../controllers/notiController.js";

const router = express.Router();

router.route("/get_all_notifications").get(getNotifications);
router.route("/create_notification").post(sendNotification);

export default router;
