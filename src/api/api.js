import axios from "./axios";

export const registerPost = (formData) => {
  return axios.post("/api/register/", formData, {
    "Content-Type": "multipart/form-data",
  });
};

export const loginPost = (formData) => {
  return axios.post("/api/login/", formData, {
    "Content-Type": "multipart/form-data",
  });
};

export const getData = () => {
  return axios.get("/api/ranks/");
};

export const getScoreStandard = () => {
  return axios.get("/api/score-criteria/");
};

export const postScore = ({ rank_id, criteria_score_list }) => {
  return axios.post("/api/score-criteria/", {
    rank_id,
    criteria_score_list,
  });
};

//1:省， 2：市1,   3：市2,    0：全部
export const getGroup = (num) => {
  return axios.get(`/api/charts/group/${num}/`);
};

export const getExcel = () => {
  return axios.get("/api/excel-data/");
};

export const getUpdateScore = (num) => {
  return axios.get(`/api/update_score/${num}/`);
};

export const postUpdateScore = ({ num, rank_id, criteria_score_list }) => {
  return axios.post(`/api/update_score/${num}/`, {
    rank_id,
    criteria_score_list,
  });
};

// 获取所有打分状态
export const getAllHasRanked = () => {
  return axios.get("/api/scored-ranks/");
};
