import React from "react";
import XLSX from "xlsx";

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
    // Excel文件名称
    var filename = "write_num.xlsx";

    // 数据头
    var headers = {
      A1: { v: "2019年学生成绩表" },
      A2: { v: "编号" },
      B2: { v: "姓名" },
      C2: { v: "年龄" },
      D2: { v: "邮箱" },
    };

    // 数据正文
    var datas = {
      A3: { v: "100" },
      B3: { v: "张三" },
      C3: { v: "28" },
      D3: { v: "sanzhang@outlook.com" },

      A4: { v: "200" },
      B4: { v: "李四" },
      C4: { v: "26" },
      D4: { v: "sili@sina.com" },
    };

    // 合并 headers 和 data
    var output = Object.assign({}, headers, datas);
    // 表格范围，范围越大生成越慢
    var ref = "A1:D10";
    // 构建 workbook 对象
    var wb = {
      SheetNames: ["Sheet1", "Sheet2"],
      Sheets: {
        // Sheet1 表示工作簿名称
        Sheet1: Object.assign({}, output, {
          "!ref": ref,
          // 合并
          "!merges": [
            {
              s: {
                // s开始
                c: 0, // 开始列
                r: 0, // 开始取值范围
              },
              e: {
                // e结束
                c: 3, // 结束列
                r: 0, // 结束范围
              },
            },
          ],
        }),
        Sheet2: Object.assign({}, output, {
          "!ref": ref,
          // 合并
          "!merges": [
            {
              s: {
                // s开始
                c: 0, // 开始列
                r: 0, // 开始取值范围
              },
              e: {
                // e结束
                c: 3, // 结束列
                r: 0, // 结束范围
              },
            },
          ],
        }),
      },
    };
    console.log(wb);
    // 写出Excel工作簿
    XLSX.writeFile(wb, filename);
  };

  return (
    <div className="content">
      <button onClick={() => tableToExcel()}>导出</button>
    </div>
  );
}

export default Load;
