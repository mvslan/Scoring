import { getData } from "../api/api";
import { getAllHasRanked } from "../api/api";

export const axiosGetData = () => {
  return (dispatch) => {
    return getData().then((res) => {
      const list = {
        city_ranks: res.data.city_rank,
        province_ranks: res.data.province_rank,
      };
      dispatch({
        type: "save",
        payload: {
          list,
        },
      });
    });
  };
};

export const getHasRankedList = () => {
  return (dispatch) => {
    return getAllHasRanked().then((res) => {
      const data = res.data.data;
      let list = [];
      data.forEach((item) => {
        list.push(item.rank_id);
      });
      dispatch({
        type: "save",
        payload: {
          hasRankedList: list,
        },
      });
    });
  };
};
