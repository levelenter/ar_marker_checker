/**
 * テーブルのカラム
 */
export class TableColumn {
  /** カラムのヘッダに表示する文字列（必須） */
  label!: string;
  /** rowsのJsonのキー値(type=noneなら必須) */
  name?: string;
  width?: string;
  type?: "seq" | "button" | "renderfunc" | "date" | "currency" | "none"; // default none
  /**
   * 関数の戻り値HTMLを使ってTD内を作成する
   */
  representedAs?: (row: any) => string;
  /**
   *
   */
  formatFunc?: (value: any) => string;
  /**
   * type=buttonの時、ボタンに設定するcss class
   */
  btnClass?: any;
  /**
   * TDに設定するcss class (align-middle:縦方向中央寄せは必ず入る)
   */
  tdClass?: any;
  /**
   * セル内の横位置デフォルトはmiddle
   */
  align?: "middle" | "left" | "right";
  /**
   * type=buttonのときのクリック時処理
   */
  onclick?: (row: any, event: Event) => void;

  /**
   * マウスオーバー
   */
  onmouseover?: (row: any, col: any, event: Event) => void;

  /**
   * ソートのために利用する項目
   */
  sortitem?: string;

  /**
   * テーブルヘッダに設定するcss class
   */
  headerClass?: string;
  /**
   * ソート昇順
   */
  up?: boolean;
  /**
   * ソート降順
   */
  down?: boolean;
}
