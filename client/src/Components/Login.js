import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../Actions/authActions";
import PropTypes from "prop-types";
import "../Style/login.scss";
class Login extends Component {
  state = { tableName: "", password: "" };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/admin");
    }
    //Login formunda bir hata varsa bunu state'e koy
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  handleOnChange = e => {
    console.log("onchange");
    this.setState({ [e.target.name]: e.target.value });
  };
  handleOnSubmit = e => {
    e.preventDefault();
    console.log("submit");
    const user = {
      tableName: this.state.tableName,
      password: this.state.password
    };
    this.props.loginUser(user);
  };
  render() {
    return (
      <main className="Login">
        <form onSubmit={this.handleOnSubmit}>
          <h1>Giriş Yap</h1>
          <input
            type="text"
            placeholder="Masa İsmi"
            name="tableName"
            value={this.state.table}
            onChange={this.handleOnChange}
          />
          <input
            type="text"
            placeholder="Şifre"
            name="password"
            value={this.state.password}
            onChange={this.handleOnChange}
          />
          <button type="submit">Giriş Yap</button>
        </form>
      </main>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
