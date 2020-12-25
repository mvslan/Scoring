import React, { useEffect, useState } from "react";
import "./index.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Modal } from "antd";
import { getData, getGroup, getAllHasRanked } from "../api/api";
import { axiosGetData, getHasRankedList } from "../store/actions";

function Home(props) {
  const { list, hasRankedList } = props.data;
  const { changeRank, getAllRank, getAllHasRankedList } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    getAllRank();

    getAllHasRankedList();
  }, []);

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
      current_rank: item,
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
              {list.province_ranks.length !== 0 &&
                list.province_ranks.map((item) => {
                  return (
                    <li key={item.name}>
                      <Button
                        onClick={() => showModal(item)}
                        type="primary"
                        disabled={item.disabled}
                      >
                        {item.name}
                      </Button>
                      {hasRankedList.includes(item.id) && (
                        <span style={{ color: "red" }}> 已打分</span>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="rank">
            <h2>市级</h2>
            <ul>
              {list.city_ranks.length !== 0 &&
                list.city_ranks.map((item) => {
                  return (
                    <li key={item.name}>
                      <Button
                        disabled={item.disabled}
                        onClick={() => showModal(item)}
                        type="primary"
                      >
                        {item.name}
                      </Button>
                      {hasRankedList.includes(item.id) && (
                        <span style={{ color: "red" }}> 已打分</span>
                      )}
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

const mapStateToProps = (state) => ({
  data: state.home,
});

const mapDispatchToProps = (dispatch) => ({
  changeRank(obj) {
    dispatch({
      type: "save",
      payload: {
        ...obj,
      },
    });
  },
  getAllRank() {
    dispatch(axiosGetData());
  },
  getAllHasRankedList() {
    dispatch(getHasRankedList());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
