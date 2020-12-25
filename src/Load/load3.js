import React, { useEffect, useState } from "react";
import XLSX from "xlsx";
import { getExcel, getScoreStandard } from "../api/api";

function Load() {
  const [data, setData] = useState({});
  useEffect(async () => {
    const result = await getScoreStandard();
    const criteria = result.data.criteria;

    const data = {};
    getExcel().then((res) => {
      const _data = res.data;
      const all_user_list = Object.keys(_data);
      all_user_list.forEach((username) => {
        data[username] = [];
        const user_item = _data[username];
        const user_rank_list = Object.keys(user_item);
        user_rank_list.forEach((rank_name) => {
          data[username].push({
            local: rank_name,
            score1: user_item[rank_name][criteria[0].title],
            score2: user_item[rank_name][criteria[1].title],
            score3: user_item[rank_name][criteria[2].title],
            score4: user_item[rank_name][criteria[3].title],
            sumScore:
              Number(user_item[rank_name][criteria[0].title]) +
              Number(user_item[rank_name][criteria[1].title]) +
              Number(user_item[rank_name][criteria[2].title]) +
              Number(user_item[rank_name][criteria[3].title]),
          });
        });
      });
      setData(data);
    });
  }, []);

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
        { wpx: 50 },
      ];
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
                  <th colSpan="4">得分</th>
                  <th rowSpan="2">总分</th>
                </tr>
                <tr>
                  <th colSpan="1">平台网站基础工作</th>
                  <th colSpan="1">"信易贷"创新应用</th>
                  <th colSpan="1">重点工作成效</th>
                  <th colSpan="1">创新应用</th>
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
