import React from "react";
import XLSX from "xlsx-style";

const arr = [
  "评委1",
  "评委2",
  "评委3",
  "评委4",
  "评委5",
  "评委6",
  "评委7",
  "评委8",
  "评委9",
];
const data = {};
for (let index in arr) {
  data[arr[index]] = [];
  for (var i = 0; i < 17; i++) {
    data[arr[index]].push({
      local: "队伍" + i,
      score1: 20,
      score2: 20,
      score3: 20,
      score4: 20,
      score5: 20,
      sumScore: 100,
    });
  }
}
function Load() {
  const tableToExcel = () => {
    var workbook = { SheetNames: [], Sheets: {} };

    Object.keys(data).forEach((table, index) => {
      let ws = {};
      ws["!merges"] = [
        {
          e: { r: 1, c: 0 },
          s: { r: 0, c: 0 },
        },
        {
          e: { r: 1, c: 1 },
          s: { r: 0, c: 1 },
        },
        {
          e: { r: 0, c: 6 },
          s: { r: 0, c: 2 },
        },
        {
          e: { r: 1, c: 7 },
          s: { r: 0, c: 7 },
        },
        {
          e: { r: 19, c: 7 },
          s: { r: 19, c: 0 },
        },
      ];
      ws["!ref"] = "A1:H20";
      // 设置header
      const header = {
        A1: { t: "s", v: "序号" },
        A20: { t: "s", v: "专家签名：" },
        B1: { t: "s", v: "省市名称" },
        C1: { t: "s", v: "得分" },
        C2: { t: "s", v: "平台网站总体情况" },
        D2: { t: "s", v: "合同履约方面情况" },
        E2: { t: "s", v: "信用承诺方面情况" },
        F2: { t: "s", v: "自然人信用建设情况" },
        G2: { t: "s", v: "平台网站创新或特色应用" },
        H1: { t: "s", v: "总分" },
      };
      //设置内容
      const list = data[table];
      const content = {};
      for (var i = 0; i < list.length; i++) {
        const num = i + 3;
        content["A" + num] = { t: "s", v: i + 1 };
        content["B" + num] = { t: "s", v: list[i].local };
        content["C" + num] = { t: "s", v: list[i].score1 };
        content["D" + num] = { t: "s", v: list[i].score2 };
        content["E" + num] = { t: "s", v: list[i].score3 };
        content["F" + num] = { t: "s", v: list[i].score4 };
        content["G" + num] = { t: "s", v: list[i].score5 };
        content["H" + num] = { t: "s", v: list[i].sumScore };
      }
      ws["!cols"] = [
        { wpx: 50 },
        { wpx: 50 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 140 },
        { wpx: 50 },
      ];
      ws = {
        ...ws,
        ...header,
        ...content,
      };
      //为某个单元格设置单独样式
      ws["A1"].s = {
        font: {
          sz: 20,
          bold: true,
          color: "red",
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
          wrap_text: true,
        },
      };
      workbook.SheetNames.push(table);
      workbook.Sheets[table] = ws;
    });
    console.log(workbook);
    XLSX.writeFile(workbook, "打分" + ".xlsx");
  };

  return (
    <div className="content">
      <button
        onClick={() => tableToExcel()}
        style={{ width: "5rem", height: "2.5rem", fontSize: "1rem" }}
      >
        导出
      </button>
    </div>
  );
}

export default Load;
