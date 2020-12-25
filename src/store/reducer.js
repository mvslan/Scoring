const defaultState = {
  list: {
    province_ranks: [],
    city_ranks: [],
  },
  current_rank: {},
  hasRankedList: [],
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
