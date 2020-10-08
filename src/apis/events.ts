import express, { Request, Response } from "express";
import { fetchAllEvent, insertEvent, updateEvent, fetchEventById, deleteEvent } from "../db/services/event-sevices";
import { WinfunEvent } from "../models/ModelDeclare";
import moment from "moment";

const router = express.Router();

router.post("/add_event", async (req: Request, res: Response) => {
  try {
    const {
      location,
      beginDatetime,
      detailLink,
      endDatetime,
      descriptions,
      sequence,
      show = true,
      eventName,
      imageURI,
    } = req.body;

    const event: WinfunEvent = {
      eventName,
      location,
      beginDatetime,
      detailLink,
      endDatetime,
      createdDate: moment().utc().format(),
      descriptions,
      sequence,
      show,
      imageURI,
    };
    const data = await insertEvent(event);
    res.status(200).json({ code: 0, data });
  } catch (err) {
    res.status(200).json({ code: 1, message: err });
  }
});

router.get("/all_events", async (req: Request, res: Response) => {
  try {
    const {} = req.query;
    const data = await fetchAllEvent();
    res.status(200).json({ code: 0, data });
  } catch (err) {
    res.status(200).json({ code: 1, message: err });
  }
});

router.put("/update_event", async (req: Request, res: Response) => {
  try {
    const {
      location,
      eventName,
      beginDatetime,
      endDatetime,
      detailLink,
      descriptions,
      show,
      sequence,
      eventId,
      imageURI
    } = req.body;
    const event: WinfunEvent = {
      eventName,
      location,
      beginDatetime,
      detailLink,
      endDatetime,
      descriptions,
      sequence,
      show,
      imageURI
    };

    const data = await updateEvent(eventId, event);
    res.status(200).json({ code: 0, data });
  } catch (err) {
    res.status(200).json({ code: 1, message: err });
  }
});

router.get("/get_event_by_id", async (req: Request, res: Response) => {
  try {
    const { eventId } = req.query;
    if (typeof eventId == "string") {
      const data = await fetchEventById(Number(eventId));
      res.status(200).json({ code: 0, data: data });
    }
  } catch (err) {
    res.status(200).json({ code: 1, message: err });
  }
});

router.put("/delete_event", async (req: Request, res: Response) => {
  try {
    const { eventId } = req.query;
    if (typeof eventId == "string") {
      const data = await deleteEvent(Number(eventId));
      res.status(200).json({ code: 0, data: data });
    }
  } catch (err) {
    res.status(200).json({ code: 1, message: err });
  }
});

export const EventAPIs = router;
