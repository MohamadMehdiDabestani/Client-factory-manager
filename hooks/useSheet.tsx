import {  readSheetResult } from "@/types/public";
import * as XLSX from "xlsx";


const useSheet = () => {
  const make_cols = (refstr: any) => {
    let o = [],
      C = XLSX.utils.decode_range(refstr).e.c + 1;
    for (var i = 0; i < C; ++i)
      o[i] = { name: XLSX.utils.encode_col(i), key: i };
    return o;
  };

  const readSheet = async (file: File): Promise<readSheetResult> => {
    return new Promise((resolver) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target != null) {
          const ab = e.target.result;
          const wb = XLSX.read(ab, { type: "array" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[];
          resolver({
            cols: make_cols(ws["!ref"]),
            rows: data,
          } as readSheetResult);
        }
      };
      reader.readAsArrayBuffer(file);
    });
    // let result: readSheetResult = { cols: [], rows: [] };
    // return result;
  };
  return { readSheet };
};

export default useSheet;
