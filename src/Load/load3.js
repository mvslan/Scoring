import React from "react";
// import * as XLSX from "xlsx-style";
import "./xlsx.style.js";

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
console.log(data);
function Load() {
  // 将workbook装化成blob对象
  function workbook2blob(workbook) {
    // 生成excel的配置项
    var wopts = {
      // 要生成的文件类型
      bookType: "xlsx",
      // // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      bookSST: false,
      type: "binary",
    };
    var wbout = XLSX.write(workbook, wopts);
    // 将字符串转ArrayBuffer
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
    var blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    });
    return blob;
  }

  // 将blob对象创建bloburl，然后用a标签实现弹出下载框
  function openDownloadDialog(blob, fileName) {
    if (typeof blob == "object" && blob instanceof Blob) {
      blob = URL.createObjectURL(blob); // 创建blob地址
    }
    var aLink = document.createElement("a");
    aLink.href = blob;
    // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
    aLink.download = fileName || "";
    var event;
    if (window.MouseEvent) event = new MouseEvent("click");
    //   移动端
    else {
      event = document.createEvent("MouseEvents");
      event.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
    }
    aLink.dispatchEvent(event);
  }
  const tableToExcel = () => {
    var workbook = XLSX.utils.book_new();

    /* convert table 'table1' to worksheet named "Sheet1" */
    Object.keys(data).forEach((table, index) => {
      let ws = XLSX.utils.table_to_sheet(
        document.getElementById("table" + index)
      );
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
      console.log(ws);
      XLSX.utils.book_append_sheet(workbook, ws, table);
    });
    const workbookBlob = workbook2blob(workbook);
    openDownloadDialog(workbookBlob, `打分统计.xlsx`);
  };

  return (
    <div className="content">
      <button
        onClick={() => tableToExcel()}
        style={{ width: "5rem", height: "2.5rem", fontSize: "1rem" }}
      >
        导出
      </button>
      <div style={{ display: "none" }}>
        {Object.keys(data).map((key, index) => {
          const id = "table" + index;
          return (
            <table id={id} align="center" key={key}>
              <thead width="1600px">
                <tr>
                  <th rowSpan="2">序号</th>
                  <th rowSpan="2">省市名称</th>
                  <th colSpan="5">得分</th>
                  <th rowSpan="2">总分</th>
                </tr>
                <tr>
                  <th colSpan="1">平台网站总体情况</th>
                  <th colSpan="1">合同履约方面情况</th>
                  <th colSpan="1">信用承诺方面情况</th>
                  <th colSpan="1">自然人信用建设情况</th>
                  <th colSpan="1">平台网站创新或特色应用</th>
                </tr>
              </thead>
              <tbody>
                {data[key].map((item, i) => (
                  <tr key={item.local}>
                    <td>{i + 1}</td>
                    <td>{item.local}</td>
                    <td>{item.score1}</td>
                    <td>{item.score2}</td>
                    <td>{item.score3}</td>
                    <td>{item.score4}</td>
                    <td>{item.score5}</td>
                    <td>{item.sumScore}</td>
                  </tr>
                ))}

                <tr>
                  <td colSpan="8">专家签名：</td>
                </tr>
              </tbody>
            </table>
          );
        })}
      </div>
    </div>
  );
}

export default Load;
