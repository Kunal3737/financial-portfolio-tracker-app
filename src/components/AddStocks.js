import React from "react";
import AllStocks from "./AllStocks";
import "./AddStocks.css";
import Modal from "react-modal";

const axios = require("axios").default;
class AddStocks extends React.Component {
  constructor(props) {
    Modal.setAppElement("#root");
    super(props);
    this.state = {
      resp: [],
      currentStockName: "",
      currentStockSymbol: "",
      todaysDate: "",
      no_Of_Shares: "",
      buyingPrice: "",
      errorMessage: "",
      currentPrice: "",
      profitLoss: "",
      isButtonClicked: false,
      IdOfStock: "",
      countChild: true,
      responseFromStocksInTable: [],
      isModal: false,
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://financial-portfolio-trac-40940.firebaseio.com/mystocks.json`
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
        console.log(this.state.resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate() {
    if (this.state.isButtonClicked || this.state.countChild) {
      this.setState({ countChild: false });
      axios
        .get(
          `https://financial-portfolio-trac-40940.firebaseio.com/mystocks.json`
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
          console.log(this.state.resp);
        })
        .catch((error) => {
          console.log(error);
        });
      this.setState({ isButtonClicked: false });

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
          this.setState({ responseFromStocksInTable: fetchedResult });
          console.log(
            "Response: ",
            this.state.responseFromStocksInTable.length
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  addStockBtn = (symbol, name, id) => {
    this.setState({ IdOfStock: id });

    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=HYM09DQLAGWQMN62`
      )
      .then((res) => {
        var resp = {};
        resp = res.data["Time Series (Daily)"];
        console.log(resp[Object.keys(resp)[0]]);
        var today = new Date();
        console.log(today);
        var date = today.getDate();
        console.log(date);
        var month = today.getMonth() + 1;

        if (date < 10) {
          console.log(date);
          date = "0" + date;
        }

        if (month < 10) {
          month = "0" + month;
        }
        console.log(today.getFullYear());
        console.log(month);
        console.log(date);
        var wholeDate = today.getFullYear() + "-" + month + "-" + date;
        console.log(wholeDate);
        var day = today.getDay();
        console.log(day);

        var current_Price = resp[Object.keys(resp)[0]];
        console.log(current_Price);

        this.setState({
          currentStockName: name,
          currentStockSymbol: symbol,
          todaysDate: wholeDate,
          currentPrice: current_Price["1. open"],
          isModal: true,
        });
      });

    // document.querySelector(".outerModal").style.display = "block";

    // document.querySelector("#closeSymbol").addEventListener("click", () => {
    //   document.querySelector(".outerModal").style.display = "none";
    // });
  };

  async addBtnClicked() {
    var noShares = document.querySelector("#noShares").value;
    console.log(noShares);

    var buyPrice = document.querySelector("#buyPrice").value;
    console.log(buyPrice);

    console.log(this.state.currentPrice);
    var profitloss = (this.state.currentPrice - buyPrice) * noShares;
    console.log(profitloss);

    if (noShares > 0 && buyPrice > 0) {
      await this.setState({
        no_Of_Shares: noShares,
        buyingPrice: buyPrice,
        profitLoss: profitloss,
        errorMessage: "",
      });

      // document.querySelector(".outerModal").style.display = "none";
      noShares = document.querySelector("#noShares").value = "";
      buyPrice = document.querySelector("#buyPrice").value = "";

      axios
        .delete(
          `https://financial-portfolio-trac-40940.firebaseio.com/mystocks/${this.state.IdOfStock}.json`,
          {
            params: {
              name: this.state.currentStockName,
              symbol: this.state.currentStockSymbol,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.setState({ isButtonClicked: true });
        })
        .catch((error) => {
          console.log(error);
        });

      const data = {
        symbol: this.state.currentStockSymbol,
        name: this.state.currentStockName,
        noOfShares: this.state.no_Of_Shares,
        buyPrice: this.state.buyingPrice,
        currentPrice: this.state.currentPrice,
        profitLoss: this.state.profitLoss,
      };

      axios
        .post(
          `https://financial-portfolio-trac-40940.firebaseio.com/stocksInTable.json`,
          data
        )
        .then((response) => {
          console.log("Response: ", response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({ errorMessage: "Please fill all the inputs" });
    }
    this.setState({
      isModal: false,
    });
  }

  fromChild = () => {
    this.setState({ isButtonClicked: true });
  };

  render() {
    return (
      <div className="AddStocksTitle">
        {this.state.responseFromStocksInTable.length === 0 ? (
          <h1 className="noStock">No stocks have been selected</h1>
        ) : (
          <table className="MyStocksTable">
            {
              <AllStocks
                isButtonClicked={this.state.isButtonClicked}
                fromChild={this.fromChild}
              />
            }
          </table>
        )}
        <Modal isOpen={this.state.isModal}>
          {/* <div className="outerModal"> */}
          <div className="mainModal">
            <strong
              id="closeSymbol"
              style={{ float: "right" }}
              onClick={() => {
                this.setState({
                  isModal: false,
                });
              }}
            >
              +
            </strong>
            <br></br>
            <h1 style={{ textAlign: "center" }}>
              Add {this.state.currentStockName} to My Stocks
            </h1>
            <h4 style={{ textAlign: "center", color: "red" }}>
              {this.state.errorMessage}
            </h4>
            <strong style={{ textAlign: "left", marginBottom: "1%" }}>
              Company Name:{" "}
            </strong>
            <span style={{ float: "right" }}>
              {this.state.currentStockName}
            </span>
            <br></br>

            <strong style={{ textAlign: "left", marginBottom: "1%" }}>
              No. of Shares:{" "}
            </strong>
            <input
              style={{ float: "right" }}
              type="number"
              min="1"
              placeholder="No. of Shares"
              id="noShares"
            />
            <br></br>

            <strong style={{ textAlign: "left", marginBottom: "1%" }}>
              Buy Price:{" "}
            </strong>
            <input
              style={{ float: "right" }}
              type="number"
              min="1"
              placeholder="Buying Price"
              id="buyPrice"
            />
            <br></br>

            <strong style={{ textAlign: "left", marginBottom: "1%" }}>
              Buy Date:{" "}
            </strong>
            <input
              id="buyDate"
              style={{ float: "right" }}
              type="date"
              value={this.state.todaysDate}
              readOnly
            />
            <br></br>

            <div style={{ textAlign: "center" }}>
              <button
                id="addBtn"
                type="submit"
                className="AddButton"
                style={{ width: "10%" }}
                onClick={this.addBtnClicked.bind(this)}
              >
                Add
              </button>
            </div>
          </div>
          {/* </div> */}
        </Modal>
        <hr />
        <div>
          <h3>Add Stocks to my Stocks</h3>
          <ul>
            {this.state.resp.map((names) => (
              <li key={names.id}>
                <button
                  style={{ width: "100px" }}
                  className="StockButton"
                  onClick={(symbol, name, id) =>
                    this.addStockBtn(names.symbol, names.name, names.id)
                  }
                >
                  {names.symbol}
                </button>{" "}
                {names.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default AddStocks;
