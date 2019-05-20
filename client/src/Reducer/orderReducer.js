export default (state = [], action) => {
  switch (action.type) {
    case "GET_ORDERS":
      return [...state, ...action.payload];
    default:
      return state;
  }
};
