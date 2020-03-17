import React, { Component } from 'react'
import AddStocks from './AddStocks'
import axios from 'axios'
import './AllStocks.css'


class AllStocks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            array : []    
        } 
    }
    

    stopTrackingButtonClicked = (key) => {
        var index = this.props.items.indexOf(key.value);
            console.log(index);
            console.log(this.state.array);
            {this.props.items.splice(index, 1)}
    }

    render() {
        return (
            <tbody>
                {this.props.items.map(item => {
                    return (
                        <tr key = "item.itemsStockSymbol">
                            <td>{item.itemsStockSymbol}</td>
                            <td>{item.itemsStockName}</td>
                            <td>{item.itemsNoOfShares}</td>
                            <td>{item.itemsBuyPrice}</td>
                            <td>{item.itemsCurrentPrice}</td>
                            <td>{item.itemsProfitloss}</td>

                            <td><button className="StopTrackingBtn" onClick= {(key) => {this.stopTrackingButtonClicked(item.itemsStockSymbol)}}>x</button></td>
                        </tr>
                    );
                })}
            </tbody>   
        )
    }
}

export default AllStocks

/* this.state.array.push ({
    arrayStockSymbol : item.itemsStockSymbol,
    arrayStockName : item.itemsStockName,
    arrayNoOfShares : item.itemsNoOfShares,
    arrayBuyPrice : item.itemsBuyPrice,
    arrayCurrentPrice : item.itemsCurrentPrice,
    arrayProfitloss : item.itemsProfitloss
})  */

{/*                             <td>{item.itemsStockSymbol}</td>
                            <td>{item.itemsStockName}</td>
                            <td>{item.itemsNoOfShares}</td>
                            <td>{item.itemsBuyPrice}</td>
                            <td>{item.itemsCurrentPrice}</td>
                            <td>{item.itemsProfitloss}</td>
 */}    

/*                 {items.map(item => {
                    return (
                        <tr>
                        <td>{item.username}</td>
                        <td>{item.password}</td>
                        </tr>
                    );
                })}
                
 */
 
 
/*  <tr className="tableContent" >
 <td>{this.props.stockSymbol}</td>
 <td>{this.props.stockName}</td>
 <td>{this.props.noShares}</td>
 <td>{this.props.buyingPrice}</td>
 <td>{this.props.currentPrice}</td>
 <td>{this.props.profitLoss}</td>
 <td><button className="StopTrackingBtn">x</button></td>
</tr>
 */