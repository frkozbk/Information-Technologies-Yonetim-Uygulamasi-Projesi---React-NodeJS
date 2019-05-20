import instance from "../instance";

export const makeOrder = order => dispatch => {
  instance
    .post("/api/customer/makeorder", order)
    .then(() => console.log("Success"))
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};
export const getOrders = () => dispatch => {
  instance
    .get("/api/admin/getOrder")
    .then(res =>
      dispatch({
        type: "GET_ORDERS",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};
export const closeOrder = orders => dispatch => {
  instance
    .post("/api/admin/closeOrder", orders)
    .then(() => console.log("Ok!"))
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};
