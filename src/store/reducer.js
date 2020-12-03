const defaultState = {
  list: {
    province_ranks: [
      { name: "北京市", disabled: false },
      { name: "福建省", disabled: false },
      { name: "江西省", disabled: false },
      { name: "山东省", disabled: false },
      { name: "河南省", disabled: false },
      { name: "湖北省", disabled: false },
      { name: "重庆市", disabled: false },
    ],
    city_ranks: [
      { name: "大连市", disabled: false },
      { name: "哈尔滨市", disabled: false },
      { name: "盐城市", disabled: false },
      { name: "常州市", disabled: false },
      { name: "芜湖市", disabled: false },
      { name: "福州市", disabled: false },
      { name: "济南市", disabled: false },
      { name: "濮阳市", disabled: false },
      { name: "广州市", disabled: false },
      { name: "南宁市", disabled: false },
    ],
  },
  current_rank: "",
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "save":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
