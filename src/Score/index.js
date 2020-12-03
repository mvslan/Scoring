import React, { useState } from "react";
import "./index.scss";
import { Table, Button, Input, message, Popconfirm } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

function isNumber(val) {
  var regPos = /^\d+(\.\d+)?$/; //非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true;
  } else {
    return false;
  }
}

function Score(props) {
  const { current_rank } = props.data;

  const [scores, setScores] = useState({});
  const [sum, setSum] = useState(0);

  const columns = [
    {
      title: "序号",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "标准",
      dataIndex: "standard",
      key: "standard",
    },
    {
      title: "分值",
      dataIndex: "value",
      key: "value",
    },

    {
      title: "评分",
      key: "score",
      render: (text, record) => (
        <Input onChange={(e) => handleChange(text, record, e)} />
      ),
    },
  ];

  const data = [
    {
      key: "1",
      id: 1,
      standard: "平台网站总体情况",
      value: 20,
    },
    {
      key: "2",
      id: 2,
      standard: "合同履约方面情况",
      value: 20,
    },
    {
      key: "3",
      id: 3,
      standard: "信用承诺方面情况",
      value: 20,
    },
    {
      key: "4",
      id: 4,
      standard: "自然人信用建设情况",
      value: 20,
    },
    {
      key: "5",
      id: 5,
      standard: "平台网站创新或特色应用",
      value: 20,
    },
  ];

  const handleChange = function (text, record, e) {
    const value = e.target.value;
    if (isNumber(value)) {
      if (Number(value) < 0) {
        message.warning("分数应该大于0");
      } else {
        const scores_clone = scores;
        let sum_clone = 0;
        scores_clone[record.key] = Number(value);
        Object.keys(scores_clone).forEach((key) => {
          sum_clone += scores_clone[key];
        });
        setScores(scores_clone);
        setSum(sum_clone);
      }
    } else {
      message.error("非法字符");
    }
  };
  function confirm(e) {
    if (current_rank == "") {
      message.warning("未选择队伍，请返回首页选择队伍");
      return;
    }
    if (Object.keys(scores).length < 5) {
      message.warning("打分未完成");
    } else {
      message.success("提交成功");
      setTimeout(() => {
        props.history.push("/");
      }, 300);
    }
  }
  function cancel(e) {}
  return (
    <div className="content">
      <h2 className="rank-name">
        队伍名称：<span style={{ color: "red" }}>{current_rank}</span>
      </h2>
      <Table columns={columns} dataSource={data} pagination={false} />
      <div className="submit">
        <span>总分：{sum}</span>{" "}
        <Popconfirm
          title={`队伍：${current_rank}   总分：${sum}  确认提交？`}
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" value="small">
            提交
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
}

const mapPropsToState = (state) => ({
  data: state.home,
});

const mapDispatchToState = (dispatch) => ({});

export default withRouter(connect(mapPropsToState, mapDispatchToState)(Score));
