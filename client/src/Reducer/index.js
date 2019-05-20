import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import orderReducer from "./orderReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  orders: orderReducer
});
