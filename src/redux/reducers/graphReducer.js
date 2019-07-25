const reducer = (
  state = { data: { male: [], female: [] }, loading: false },
  action
) => {
  switch (action.type) {
    case "REQUEST_GET_GRAPH_DATA":
      return { ...state, loading: true };
    case "GET_GRAPH_DATA_SUCCESS":
      return { ...state, loading: false, data: action.json };
    default:
      return state;
  }
};

export default reducer;
