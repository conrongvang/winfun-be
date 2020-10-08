import express, { Request, Response } from "express";
import { fetchAllFeature, insertFeature, updateFeature } from "../db/services/features-services";
import { Feature } from "../models/ModelDeclare";

const router = express.Router();

router.post("/insert_feature", async (req: Request, res: Response) => {
  try {
    const { title, image, descriptions, show, sequence } = req.body;
    const feature: Feature = {
      title,
      image,
      descriptions,
      show,
      sequence,
    };
    const data = await insertFeature(feature);
    res.status(200).json({ code: 0, data });
  } catch (err) {
    res.status(200).json({ code: 1, message: err });
  }
});

router.put("/update_feature", async (req: Request, res: Response) => {
  try {
    const { title, image, descriptions, show, sequence, featureId } = req.body;
    const feature: Feature = {
      title,
      image,
      descriptions,
      show,
      sequence,
    };
    const data = await updateFeature(featureId, feature);
    res.status(200).json({ code: 0, data });
  } catch (err) {
    res.status(200).json({ code: 1, message: err });
  }
});

router.get("/all_features", async (_req: Request, res: Response) => {
    try {
      const data = await fetchAllFeature();
      res.status(200).json({ code: 0, data });
    } catch (err) {
      res.status(200).json({ code: 1, message: err });
    }
  });

export const FeaturesAPIs = router;
