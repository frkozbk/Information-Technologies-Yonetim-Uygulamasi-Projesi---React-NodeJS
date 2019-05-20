import instance from "../instance";
import setAuthToken from "../Utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Login User
export const loginUser = user => dispatch => {
  console.log(user);
  instance
    .post("/api/user/login", user)
    .then(res => {
      debugger;
      // Token ı al
      console.log(res);
      const token = res.data.token;
      // Token ı local a kayıt et
      localStorage.setItem("jwtToken", token);
      // token ı instance'un headerına kayıt et
      setAuthToken(token);
      // Kullanıcının bilgisini almak için token ı ayrıştır
      const decoded = jwt_decode(token);

      // User ı React store a koy
      dispatch(setCurrentUser(decoded));
      debugger;
    })
    .catch(err => {
      console.log(err);
      debugger;
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

// KULLANICIYI REACT STORE'A KAYIT ET
export const setCurrentUser = decoded => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded
  };
};
// Kullanıcıyı logout yaptıktan sonra token ı gönderilecek olan isteklerin
// headerından kaldır
export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
