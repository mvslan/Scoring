import React from "react";
import "./index.scss";

function Rank() {
  return (
    <div className="content rank-content">
      <div className="rank-wrap">
        <div className="rank-title">
          全国各级信用信息共享平台和信用门户网站建设观摩培训活动。
        </div>
        <div className="ranks">
          <div className="rank">
            <h3>省级</h3>
            <ul>
              <li>省队1</li>
              <li>省队1</li>
              <li>省队1</li>
              <li>省队1</li>
            </ul>
          </div>
          <div className="rank">
            <h3>市级</h3>
            <ul>
              <li>市队1</li>
              <li>市队1</li>
              <li>市队1</li>
              <li>市队1</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rank;
