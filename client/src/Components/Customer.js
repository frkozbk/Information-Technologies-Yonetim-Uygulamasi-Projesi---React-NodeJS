import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { withRotuer } from "react-router-dom";
import { makeOrder } from "../Actions/orderActions";
import "../Style/customer.scss";
import üzüm from "../images/1.png";
import çiftelma from "../images/2.png";
import yabanmersini from "../images/3.png";
import şeftali from "../images/4.png";
import kavun from "../images/5.png";
import cappucino from "../images/6.png";
import çilek from "../images/7.png";
import karpuz from "../images/8.png";
import elma from "../images/9.png";

class Customer extends Component {
  state = {
    items: {
      üzüm: false,
      çiftelma: false,
      yabanmersini: false,
      şeftali: false,
      kavun: false,
      cappucino: false,
      çilek: false,
      karpuz: false,
      elma: false
    },
    lastOrderEmberDate: null
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/");
    }
  }
  handleOnClick = e => {
    this.setState({
      items: {
        ...this.state.items,
        [e.target.name]: !this.state.items[e.target.name]
      }
    });
  };
  giveOrder = async () => {
    let orderArray = [];
    for (var key in this.state.items) {
      if (this.state.items[key] === true) {
        orderArray.push(key);
      }
    }
    const newOrder = {
      order: orderArray,
      tableName: this.props.auth.user.name
    };
    await this.props.makeOrder(newOrder);
    document.location.reload();
  };
  orderEmber = async () => {
    var now = moment(new Date());
    var end = this.state.lastOrderEmberDate;
    var duration = moment.duration(now.diff(end));
    var minutes = duration.asMinutes();
    if (minutes < 15) return;
    console.log(minutes);
    const newOrder = {
      order: ["Köz"],
      tableName: this.props.auth.user.name
    };
    await this.props.makeOrder(newOrder);
    this.setState({ lastOrderEmberDate: moment(new Date()) });
    document.location.reload();
  };
  render() {
    let orderNumber = (() => {
      let orderArray = [];
      for (var key in this.state.items) {
        if (this.state.items[key] === true) {
          orderArray.push(key);
        }
      }
      return orderArray.length;
    })();

    console.log(orderNumber);
    return (
      <div className="customer">
        <header className="App-header">
          <h1>SHISHA LOUNGE</h1>
          <p>
            Şiparişi görsele tıklayarak seçebilsiniz. Karışımlar için birden
            fazla seçebilirsiniz
          </p>
        </header>
        <main>
          <ul>
            <li>
              <input
                type="checkbox"
                id="1"
                name="üzüm"
                onClick={this.handleOnClick}
                disabled={
                  orderNumber >= 3 && this.state.items["üzüm"] === false
                }
              />
              <label for="1">
                <h4>Üzüm</h4>
                <img src={üzüm} alt="üzüm" />
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                id="2"
                name="çiftelma"
                onClick={this.handleOnClick}
                disabled={
                  orderNumber >= 3 && this.state.items["çiftelma"] === false
                }
              />
              <label for="2">
                <h4>Çift Elma</h4>
                <img src={çiftelma} alt="Çift Elma" />
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                id="3"
                name="yabanmersini"
                onClick={this.handleOnClick}
                disabled={
                  orderNumber >= 3 && this.state.items["yabanmersini"] === false
                }
              />
              <label for="3">
                <h4>Yaban Mersini</h4>
                <img src={yabanmersini} alt="Yaban Mersini" />
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                id="4"
                name="şeftali"
                onClick={this.handleOnClick}
                disabled={
                  orderNumber >= 3 && this.state.items["şeftali"] === false
                }
              />
              <label for="4">
                <h4>şeftali</h4>
                <img src={şeftali} alt="Şeftali" />
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                id="9"
                name="kavun"
                onClick={this.handleOnClick}
                disabled={
                  orderNumber >= 3 && this.state.items["kavun"] === false
                }
              />
              <label for="9">
                <h4>Kavun</h4>
                <img src={kavun} alt="kavun" />
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                id="5"
                name="cappucino"
                onClick={this.handleOnClick}
                disabled={
                  orderNumber >= 3 && this.state.items["cappucino"] === false
                }
              />
              <label for="5">
                <h4>Cappucino</h4>
                <img src={cappucino} alt="cappucino" />
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                id="6"
                name="çilek"
                onClick={this.handleOnClick}
                disabled={
                  orderNumber >= 3 && this.state.items["çilek"] === false
                }
              />
              <label for="6">
                <h4>Çilek</h4>
                <img src={çilek} alt="çilek" />
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                id="7"
                name="karpuz"
                onClick={this.handleOnClick}
                disabled={
                  orderNumber >= 3 && this.state.items["karpuz"] === false
                }
              />
              <label for="7">
                <h4>Karpuz</h4>
                <img src={karpuz} alt="karpuz" />
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                id="8"
                name="elma"
                onClick={this.handleOnClick}
                disabled={
                  orderNumber >= 3 && this.state.items["elma"] === false
                }
              />
              <label for="8">
                <h4>Elma</h4>
                <img src={elma} alt="elma" />
              </label>
            </li>
          </ul>
        </main>
        <footer>
          <button type="button" onClick={this.orderEmber}>
            Köz talep
          </button>
          <button type="button" onClick={this.giveOrder}>
            Sipariş Ver
          </button>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { makeOrder }
)(Customer);
