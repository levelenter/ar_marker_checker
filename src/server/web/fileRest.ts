import express from "express";
import multer from "multer";
import { FileService } from "../biz/FileService";

const uploadMult = multer({ storage: multer.memoryStorage() }).single("userfile");

const uploadFile = (req: express.Request, res: express.Response) => {
  uploadMult(req, res, async function(error) {
    if (error) return res.status(500).end("Error uploading file.");

    const file = (req as any).file;
    console.log(req.query.file_name);
    const fileName = req.query.file_name as string;
    const response = await new FileService().saveFile(fileName, file.buffer, file.mimetype);
    res.json(response);
  });
};

export const fileRest = express.Router();
fileRest.post("/upload_file", uploadFile);
