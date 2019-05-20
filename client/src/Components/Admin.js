import React, { Component } from "react";
import "../Style/admin.scss";
import { connect } from "react-redux";
import { getOrders, closeOrder } from "../Actions/orderActions";
class Admin extends Component {
  state = {};
  componentDidMount() {
    this.props.getOrders();
  }
  onClick = e => {
    console.log("clicked");
    if (this.state[e.target.id] === null) {
      this.setState({ [e.target.id]: true });
    } else {
      this.setState({ [e.target.id]: !this.state[e.target.id] });
    }
  };
  handleOrder = async e => {
    e.preventDefault();
    let orders = [];
    for (var key in this.state) {
      if (this.state[key] === true) {
        orders.push(key);
      }
    }
    let closeOrder = {
      orders: [...orders]
    };
    await this.props.closeOrder(closeOrder);
    document.location.reload();
  };
  render() {
    const orders = this.props.orders;
    let renderedOrders = orders.map(iter => {
      return (
        <li key={iter._id}>
          <input type="checkbox" id={iter._id} onClick={this.onClick} />
          <label htmlFor={iter._id}>
            <h3>{iter.tableName}</h3>
            <p>{iter.order.join(",")} Bekliyor</p>
          </label>
        </li>
      );
    });
    return (
      <div className="admin">
        <header>
          <h1>Közcü Burak</h1>
          <p>Masa numarasın tıklayarak seçebilirsiniz</p>
        </header>
        <main>
          <ul>{renderedOrders}</ul>
        </main>
        <footer>
          <button type="button" onClick={this.handleOrder}>
            YOLLANDI
          </button>
        </footer>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  orders: state.orders
});
export default connect(
  mapStateToProps,
  { getOrders, closeOrder }
)(Admin);
