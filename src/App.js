import React, { Component } from "react";
import "./App.css";
//import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/dist/solar/bootstrap.css";

import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

const CURRENCIES = [
  { name: "EURO", id: "EUR", priceId: "price_eur" },
  { name: "Great Britain Pound", id: "GBP", priceId: "price_gbp" },
  { name: "Japan Yena", id: "JPY", priceId: "price_jpy" },
  { name: "Russian Ruble", id: "RUB", priceId: "price_rub" }
];

class CurrencyDisplay extends Component {
  constructor() {
    super();
    this.state = {
      currencyData: null
    };
  }
  componentDidMount() {
    const id = this.props.id;
    const URL = "https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=" + id;
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ currencyData: json });
    });
  }
  render() {
    const currencyData = this.state.currencyData;
    if (!currencyData) return <div>Loading</div>;

    const currencyInfo = currencyData[0];
    return (
      <div>
        <p>Name: {currencyInfo.name}</p>
        <p>Symbol: {currencyInfo.symbol}</p>
        <p>Price: {currencyInfo[CURRENCIES[this.props.index].priceId] + " " + this.props.id}</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeCurrency: 0
    };
  }
  render() {
    const activeCurrency = this.state.activeCurrency;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Check Bitcoin Price
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <h3>Select the currency</h3>
            <Col md={4} sm={4}>
              <Navbar>
                <Nav bsStyle="pills"
                  stacked
                  activeKey={activeCurrency}
                  onSelect={index => {this.setState({ activeCurrency: index });
                  }}>
                  {CURRENCIES.map((currency, index) => (
                    <NavItem key={index} eventKey={index}>{currency.name + "\n"}</NavItem>
                  ))}
                </Nav>
              </Navbar>
            </Col>
            <Col md={4} sm={4}>
              <CurrencyDisplay key={activeCurrency} index={activeCurrency} id={CURRENCIES[activeCurrency].id} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
