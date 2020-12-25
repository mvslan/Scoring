import React, { useEffect, useState } from "react";
import "./index.scss";
import { getGroup } from "../api/api";
import { Select, message } from "antd";

const { Option } = Select;

function Rank() {
  const [p_list, setPList] = useState([]);
  const [city_list, setCityList] = useState([]);

  useEffect(() => {
    getGroupData(1);
  }, []);
  const getGroupData = (num) => {
    getGroup(num).then((res) => {
      console.log(res);
      if (res.data.code == -1) {
        message.warning("暂无数据");
      } else if (res.data.code == 0) {
        const _list = res.data.data;
        const p_list = [];
        const city_list = [];
        _list.forEach((item) => {
          item.is_province ? p_list.push(item) : city_list.push(item);
        });
        setPList(p_list);
        setCityList(city_list);
      }
    });
  };

  function handleChange(value) {
    getGroupData(value);
  }

  return (
    <div className="content rank-content">
      <div className="rank-wrap">
        <div className="rank-title">
          全国各级信用信息共享平台和信用门户网站建设观摩培训活动。
        </div>
        <div className="ranks">
          {p_list.length !== 0 && (
            <div className="rank">
              <h3>省级</h3>
              <ul>
                {p_list.map((item) => (
                  <li>
                    {item.name}:{item.avg_score.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {city_list.length !== 0 && (
            <div className="rank">
              <h3>市级</h3>
              <ul>
                {city_list.map((item) => (
                  <li>
                    {item.name}:{item.avg_score.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="change">
        <Select
          defaultValue="1"
          style={{ width: "5rem" }}
          onChange={handleChange}
        >
          <Option value="1">省级队伍排名</Option>
          <Option value="2">市级第一轮排名</Option>
          <Option value="3">市级第二轮排名</Option>
          <Option value="0">总排名</Option>
        </Select>
      </div>
    </div>
  );
}

export default Rank;
