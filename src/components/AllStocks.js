import React, { Component } from "react";
import "./AllStocks.css";
const axios = require("axios").default;

class AllStocks extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      resp: [],
      isStopTracking: false,
      buttonClicked: this.props.isButtonClicked,
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://financial-portfolio-trac-40940.firebaseio.com/stocksInTable.json`
      )
      .then((response) => {
        const fetchedResult = [];
        for (let key in response.data) {
          fetchedResult.push({
            ...response.data[key],
            id: key,
          });
        }
        this.setState({ resp: fetchedResult });
        console.log("Response: ", this.state.resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate() {
    if (this.props.isButtonClicked || this.state.isStopTracking) {
      axios
        .get(
          `https://financial-portfolio-trac-40940.firebaseio.com/stocksInTable.json`
        )
        .then((response) => {
          const fetchedResult = [];
          for (let key in response.data) {
            fetchedResult.push({
              ...response.data[key],
              id: key,
            });
          }
          this.setState({ resp: fetchedResult });
          console.log("Response: ", this.state.resp.length);
          this.setState({ isStopTracking: false });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  stopTrackingButtonClicked = async (id, symbol, name) => {
    console.log("ID:", id);

    axios
      .post(
        `https://financial-portfolio-trac-40940.firebaseio.com/mystocks.json`,
        {
          symbol: symbol,
          name: name,
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ isStopTracking: true });
    this.setState(this.props.fromChild);

    await axios
      .delete(
        `https://financial-portfolio-trac-40940.firebaseio.com/stocksInTable/${id}.json`
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ buttonClicked: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log(this.props.items);
    return (
      <tbody>
        {this.state.resp.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.symbol}</td>
              <td>{item.name}</td>
              <td>{item.noOfShares}</td>
              <td>{item.buyPrice}</td>
              <td>{item.currentPrice}</td>
              <td>{item.profitLoss}</td>

              <td>
                <button
                  className="StopTrackingBtn"
                  onClick={(id, symbol, name) => {
                    this.stopTrackingButtonClicked(
                      item.id,
                      item.symbol,
                      item.name
                    );
                  }}
                >
                  x
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default AllStocks;
