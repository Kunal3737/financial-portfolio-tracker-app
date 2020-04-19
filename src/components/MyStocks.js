import React, { Component } from 'react'
import './MyStocks.css';
import AddStocks from './AddStocks'

class MyStocks extends Component {
    render() {
        return (
            <div className="MyStocks">
                <h3>My Stocks</h3>
                <table className="MyStocksTable">
                    <thead>
                        <tr className="stockHeader">
                            <th>Stock symbol</th>
                            <th>Stock name</th>
                            <th>No.of shares</th>
                            <th>Buy price</th>
                            <th>Current price</th>
                            <th>Profit/Loss</th>
                            <th>Stop Tracking</th>
                        </tr>
                    </thead>
                </table>
                <AddStocks/>
            </div>
        )
    }
}

export default MyStocks
