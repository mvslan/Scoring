import React, { useEffect, useState } from "react";
import "./index.scss";
import { Table, Button, Input, message, Popconfirm } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getScoreStandard,
  postScore,
  getUpdateScore,
  postUpdateScore,
} from "../api/api";

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
  const [oldScores, setOldScores] = useState({});
  const [sum, setSum] = useState(0);
  const [oldSum, setOldSum] = useState(-1);
  const [isUpdate, setUpdate] = useState(false);

  useEffect(() => {
    getScoreStandard().then((res) => {});
    const id = props.data.current_rank.id;
    if (id) {
      getUpdateScore(id).then((res) => {
        console.log(res);
        // 数据是来更新的
        if (res.data.code == 0) {
          const scores_obj = {};
          const data = res.data.data;
          let sum = 0;
          data.forEach((item) => {
            scores_obj[item.score_criteria_id] = item.score;
            sum += item.score;
          });
          setUpdate(true);
          setOldSum(sum);
          setOldScores(scores_obj);
        }
      });
    }
  }, []);

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
        <Input
          placeholder={oldScores[record.key]}
          onChange={(e) => {
            const value = e.target.value;
            debounce(() => changeData(record, value), 300);
          }}
        />
      ),
    },
  ];

  const data = [
    {
      key: "1",
      id: 1,
      standard: "平台网站基础工作",
      value: 20,
    },
    {
      key: "2",
      id: 2,
      standard: '"信易贷"创新应用',
      value: 30,
    },
    {
      key: "3",
      id: 3,
      standard: "重点工作成效",
      value: 40,
    },
    {
      key: "4",
      id: 4,
      standard: "创新应用",
      value: 10,
    },
  ];

  const changeData = function (record, value) {
    // if (value === "") {
    //   value = 0;
    // }
    if (isNumber(value)) {
      if (Number(value) < 0 || value > record.value) {
        message.warning("分数值有误，请重新输入");
      } else {
        const scores_clone = scores;
        let sum_clone = 0;
        scores_clone[record.key] = Number(value);
        Object.keys(scores_clone).forEach((key) => {
          sum_clone = (sum_clone * 10000 + scores_clone[key] * 10000) / 10000;
        });
        setScores(scores_clone);
        setSum(sum_clone);
      }
    } else {
      message.error("非法字符");
    }
  };
  //防抖函数
  const debounce = (function () {
    let timer = null;
    return function (fn, delay) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn();
        clearTimeout(timer);
        timer = null;
      }, delay);
    };
  })();

  function confirm(e) {
    if (!current_rank.name) {
      message.warning("未选择队伍，请返回首页选择队伍");
      return;
    }
    if (Object.keys(scores).length < 4) {
      message.warning("打分未完成");
    } else {
      const rank_id = current_rank.id;
      const criteria_score_list = [];
      Object.keys(scores).forEach((key) => {
        criteria_score_list.push({
          criteria_id: key,
          score: scores[key],
        });
      });
      if (isUpdate) {
        const id = props.data.current_rank.id;
        postUpdateScore({ num: id, rank_id, criteria_score_list }).then(
          (res) => {
            if (res.data.code == 0) {
              message.success("更新成功");
              setTimeout(() => {
                props.history.push("/");
              }, 300);
            } else if (res.data.code == -2) {
              message.warning("非法更新");
            }
          }
        );
      } else {
        postScore({ rank_id, criteria_score_list })
          .then((res) => {
            if (res.data.code == 0) {
              message.success("提交成功");
              setTimeout(() => {
                props.history.push("/");
              }, 300);
            } else if (res.data.code == -2) {
              message.warning("提交失败");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
  function cancel(e) {}
  return (
    <div className="content">
      <h2 className="rank-name">
        队伍名称：<span style={{ color: "red" }}>{current_rank.name}</span>
      </h2>
      <Table columns={columns} dataSource={data} pagination={false} />
      {oldSum !== -1 && (
        <div style={{ marginTop: "0.2rem" }}>上次打分：{oldSum}</div>
      )}
      <div className="submit">
        <span>总分：{sum}</span>
        <Popconfirm
          title={`队伍：${current_rank.name}   总分：${sum}  确认提交？`}
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" value="small">
            {isUpdate ? "更新" : "提交"}
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
