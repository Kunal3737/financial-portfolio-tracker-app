import React, { Component } from 'react'
import AllStocks from './AllStocks'
import './AddStocks.css'
import axios from 'axios'
import MyStocks from './MyStocks'


class AddStocks extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                resp : [],
                currentStockName : '',
                currentStockSymbol : '',
                todaysDate: '',
                no_Of_Shares : '',
                buyingPrice : '',
                errorMessage : '',
                currentPrice : '',
                profitLoss : '',
                items: [],
            }    
        }

    componentDidMount() {
        axios.get(`https://financial-portfolio-trac-40940.firebaseio.com/.json`)
            .then(res => {
                const resp = res.data; 
                this.setState({resp})
            });
    } 

    addStockBtn = (symbol, name) => {
        axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=HYM09DQLAGWQMN62`)
            .then(res => {
                const resp = res.data;
/*                 console.log(resp);
                console.log(resp['Meta Data']);
 */                var today = new Date();
                var date = today.getDate();
                var month = today.getMonth() + 1;
                if (date < 10)  {
                    date = "0" + (date);
                }
/*                 console.log(date);
 */
                if (month < 10)  {
                    month = "0" + (month);
                }
/*                 console.log(month);
 */

                var wholeDate = today.getFullYear() + '-' + (month) + '-' + (date - 3);
                console.log(wholeDate);
                var day = today.getDay();
/*                 console.log(day);
 */             

                // For Saturday
                if (day === 6) {
                    var wholeDate = today.getFullYear() + '-' + (month) + '-' + (date - 1);
                }

                // For Sunday
                if (day === 0) {
                    var wholeDate = today.getFullYear() + '-' + (month) + '-' + (date - 2);
                }

                var current_Price = resp['Time Series (Daily)'][wholeDate]['1. open'];
                console.log(current_Price);
 
                 this.setState({
                    currentStockName : name,
                    currentStockSymbol : symbol,
                    todaysDate: wholeDate,
                    currentPrice : current_Price
                })

                
                if (day === 6) {
                    day = day - 1;
                    date -= 1;
                    console.log(wholeDate);
                    console.log(resp['Time Series (Daily)'][wholeDate]);
                    console.log(day);
                }
                else if (day === 0) {
                    day = day + 5;
                    date -= 2;
                    console.log(date);
                    console.log(resp['Time Series (Daily)'][wholeDate]);
                    console.log(resp['Time Series (Daily)'][wholeDate]['1. open']);
                    console.log(day);
                }
                else {
                    console.log(date);
                    console.log(resp['Time Series (Daily)']);
                    console.log(resp['Time Series (Daily)'][wholeDate]);
                    console.log(resp['Time Series (Daily)'][wholeDate]['1. open']);
                    console.log(day);
                }
            })
            
            document.querySelector(".outerModal").style.display="block";

            document.querySelector("#closeSymbol").addEventListener('click', () => {
                document.querySelector(".outerModal").style.display="none";    
            })
    }

    async addBtnClicked(){
        let items = [...this.state.items];

        var noShares = document.querySelector("#noShares").value
        console.log(noShares);

        var buyPrice = document.querySelector("#buyPrice").value
        console.log(buyPrice);
        
        // (current price – buy price) * no. of shares. 

        var profitloss = (this.state.currentPrice - buyPrice) * noShares;
        console.log(profitloss);

        if (noShares > 0 && buyPrice > 0) {            
            await this.setState ({
                no_Of_Shares : noShares,
                buyingPrice : buyPrice,
                profitLoss : profitloss,
                errorMessage: ''
            });
            console.log(this.state.no_Of_Shares);
            console.log(this.state.buyingPrice);
            console.log(this.state.profitLoss);    



            items.push({
                itemsStockSymbol: this.state.currentStockSymbol,
                itemsStockName: this.state.currentStockName,
                itemsNoOfShares: this.state.no_Of_Shares,
                itemsBuyPrice: this.state.buyingPrice,
                itemsCurrentPrice: this.state.currentPrice,
                itemsProfitloss: this.state.profitLoss
              });

            this.setState({
                items
            });

            document.querySelector(".outerModal").style.display="none"; 
            noShares = document.querySelector("#noShares").value = '';
            buyPrice = document.querySelector("#buyPrice").value = '';
        }
        else {
            this.setState({errorMessage : "Please fill all the inputs"})
        }
       
    }

    render() {
        return (
            <div className="AddStocksTitle">
                <table className="MyStocksTable">
                <AllStocks
                    items={ this.state.items} 
                 />
                </table>
                <div className="outerModal">
                    <div className="mainModal">
                        <strong id="closeSymbol" style = {{float: "right"}}>+</strong><br></br>
                        <h1 style = {{textAlign: "center"}}>Add {this.state.currentStockName} to My Stocks</h1>
                        <h4 style = {{textAlign: "center", color: "red"}}>{this.state.errorMessage}</h4>
                        <strong style = {{textAlign: "left", marginBottom:'1%'}}>Company Name: </strong><span style = {{float: "right" }}>{this.state.currentStockName}</span><br></br>

                        <strong style = {{textAlign: "left", marginBottom:'1%'}}>No. of Shares: </strong><input style = {{float: "right"}} type="number" min="1" placeholder="No. of Shares" id="noShares"/><br></br>

                        <strong style = {{textAlign: "left", marginBottom:'1%'}}>Buy Price: </strong><input style = {{float: "right"}} type="number" min="1" placeholder="Buying Price" id="buyPrice"/><br></br>

                        <strong style = {{textAlign: "left", marginBottom:'1%'}}>Buy Date: </strong><input id="buyDate" style = {{float: "right"}} type="date" value={this.state.todaysDate} /><br></br>

                        <div style = {{textAlign: "center"}}><button id="addBtn" type="submit" className="AddButton" style = {{width: "10%"}} onClick={this.addBtnClicked.bind(this)}>Add</button></div>
                    </div>
                </div>
                <div>
                    <h3>Add Stocks to my Stocks</h3>
                </div>
                    <ul>
                        {this.state.resp.map((names) => <li key={names.symbol}><button style={{"width":"100px"}} className="StockButton"
                        onClick={(symbol, name) => this.addStockBtn(names.symbol, names.name)}>{names.symbol}</button> {names.name}</li>)}
                   </ul>  
            </div>
        )
    }
}

export default AddStocks