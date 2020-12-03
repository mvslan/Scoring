import React, { useState } from "react";
import "./index.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Modal } from "antd";

function Home(props) {
  const list = props.data.list;
  const { changeRank } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [item, setItem] = useState({});

  const showModal = (item) => {
    setIsModalVisible(true);
    setItem(item);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    handleClick(item);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleClick = function (item) {
    const _list = list;
    Object.keys(_list).forEach((key) => {
      for (let _item of list[key]) {
        if (_item.name == item.name) {
          _item.disabled = true;
        }
      }
    });
    changeRank({
      list: _list,
      current_rank: item.name,
    });
    props.history.push("/score");
  };
  return (
    <div>
      <Modal
        title="请确认"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          您当前所选的队伍是：
          <span style={{ color: "red", fontSize: "1rem" }}>{item.name}</span>
          ，是否确认选择？
        </p>
      </Modal>

      <div className="content">
        <div className="ranks">
          <div className="rank">
            <h2>省级</h2>
            <ul>
              {list.province_ranks.map((item) => {
                return (
                  <li key={item.name}>
                    <Button
                      disabled={item.disabled}
                      onClick={() => showModal(item)}
                      type="primary"
                    >
                      {item.name}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="rank">
            <h2>市级</h2>
            <ul>
              {list.city_ranks.map((item) => {
                return (
                  <li key={item.name}>
                    <Button
                      disabled={item.disabled}
                      onClick={() => showModal(item)}
                      type="primary"
                    >
                      {item.name}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapPropsToState = (state) => ({
  data: state.home,
});

const mapDispatchToState = (dispatch) => ({
  changeRank(obj) {
    dispatch({
      type: "save",
      payload: {
        ...obj,
      },
    });
  },
});

export default withRouter(connect(mapPropsToState, mapDispatchToState)(Home));
