import { PoolConnection } from "mysql2/promise";
import { Response } from "../../framework/biz/Response";
import fs from "fs";
import config from "config";
import { FileInfo } from "../dto/FileInfo";

const uploadDir = config.get<string>("up.dir");

export class FileService {
  connection!: PoolConnection;

  async saveFile(fileName: string, buffer: Buffer, mimetype: string): Promise<Response<FileInfo>> {
    console.log(fileName, buffer.length, mimetype);
    const savePath = `${uploadDir}${fileName}`;
    fs.writeFileSync(savePath, buffer, { mode: 0o666 });
    const fileInfo = new FileInfo();
    fileInfo.dir = uploadDir;
    fileInfo.name = fileName;
    fileInfo.length = buffer.length;
    return new Response<FileInfo>(fileInfo);
  }
}
