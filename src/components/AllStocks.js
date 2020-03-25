import React, { Component } from 'react'
import AddStocks from './AddStocks'
import axios from 'axios'
import './AllStocks.css'

class AllStocks extends Component {

    constructor(props) {
        super(props);
    }
    
    stopTrackingButtonClicked = (event) => {
        let index = 0;
        index = this.props.items.findIndex( x => x.itemsStockSymbol === event.target.value);
        this.setState({
            isClicked : true
        })
        this.props.items.splice(index,1);  
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

                            <td><button className="StopTrackingBtn" onClick= {(event) => {this.stopTrackingButtonClicked(event)}}>x</button></td>
                        </tr>
                    );
                })}
            </tbody>   
        )
    }
}

export default AllStocks
