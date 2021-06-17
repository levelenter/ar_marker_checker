import { ErrorType } from "./ErrorType";
import { MaybeError } from "./MaybeError";
import { messageResource } from "../util/MessageResource";
/**
 * Responseステータスを含むエラー
 */
export class ErrorResult extends Error implements MaybeError {
  public status?: ErrorType; // クライアントにメッセージを返したい場合はOKにした上でhasErrorをtrueにする
  public hasError?: boolean;
  public description?: string;
  public errorExpandedData?: any;
  static getSystemError(obj: any, cause: string) {
    return new ErrorResult(
      messageResource.SOMETHING_BROKEN + `:${obj} ${cause}`
    );
  }
  constructor(
    message: string,
    status: ErrorType = ErrorType.OK, // OKとしてhasErrorを返す
    hasError = true,
    errorExpandedData: any = {}
  ) {
    super(message);
    this.description = message;
    this.status = status;
    this.hasError = hasError;
    this.errorExpandedData = errorExpandedData;
  }
}
