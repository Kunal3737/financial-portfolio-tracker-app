(this["webpackJsonpfinancial-portfolio-tracker-app"]=this["webpackJsonpfinancial-portfolio-tracker-app"]||[]).push([[0],{21:function(e,t,n){e.exports=n(49)},26:function(e,t,n){},27:function(e,t,n){},28:function(e,t,n){},30:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(20),r=n.n(c),l=(n(26),n(27),n(3)),s=n(4),i=n(6),u=n(5),m=n(7),h=(n(28),n(2)),d=n(8),f=n.n(d),p=n(9),y=(n(30),n(11).default),k=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(i.a)(this,Object(u.a)(t).call(this,e))).stopTrackingButtonClicked=function(e,t,a){console.log("ID:",e),y.delete("https://financial-portfolio-trac-40940.firebaseio.com/stocksInTable/".concat(e,".json")).then((function(e){console.log(e.data)})).catch((function(e){console.log(e)})),y.post("https://financial-portfolio-trac-40940.firebaseio.com/mystocks.json",{symbol:t,name:a}).then((function(e){console.log(e.data)})).catch((function(e){console.log(e)})),n.setState({isStopTracking:!0}),n.props.fromChild(!0)},n.state={resp:[],isStopTracking:!1},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;y.get("https://financial-portfolio-trac-40940.firebaseio.com/stocksInTable.json").then((function(t){var n=[];for(var a in t.data)n.push(Object(h.a)({},t.data[a],{id:a}));e.setState({resp:n}),console.log("Response: ",e.state.resp)})).catch((function(e){console.log(e)}))}},{key:"componentDidUpdate",value:function(){var e=this;(this.props.isButtonClicked||this.state.isStopTracking)&&y.get("https://financial-portfolio-trac-40940.firebaseio.com/stocksInTable.json").then((function(t){var n=[];for(var a in t.data)n.push(Object(h.a)({},t.data[a],{id:a}));e.setState({resp:n}),console.log("Response: ",e.state.resp.length),e.setState({isStopTracking:!1})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this;return console.log(this.props.items),o.a.createElement("tbody",null,this.state.resp.map((function(t){return o.a.createElement("tr",{key:t.id},o.a.createElement("td",null,t.symbol),o.a.createElement("td",null,t.name),o.a.createElement("td",null,t.noOfShares),o.a.createElement("td",null,t.buyPrice),o.a.createElement("td",null,t.currentPrice),o.a.createElement("td",null,t.profitLoss),o.a.createElement("td",null,o.a.createElement("button",{className:"StopTrackingBtn",onClick:function(n,a,o){e.stopTrackingButtonClicked(t.id,t.symbol,t.name)}},"x")))})))}}]),t}(a.Component),b=(n(48),n(11).default),g=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(i.a)(this,Object(u.a)(t).call(this,e))).addStockBtn=function(e,t,a){n.setState({IdOfStock:a}),b.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=".concat(e,"&apikey=HYM09DQLAGWQMN62")).then((function(a){var o=a.data,c=new Date,r=c.getDate(),l=c.getMonth()+1;r<10&&(r="0"+r),l<10&&(l="0"+l);var s=c.getFullYear()+"-"+l+"-"+r;console.log(s);var i=c.getDay();if(6===i){s=c.getFullYear()+"-"+l+"-"+(r-1);var u=o["Time Series (Daily)"][s]["1. open"]}0===i&&(s=c.getFullYear()+"-"+l+"-"+(r-2),u=o["Time Series (Daily)"][s]["1. open"]),u=o["Time Series (Daily)"][s]["1. open"],console.log(u),n.setState({currentStockName:t,currentStockSymbol:e,todaysDate:s,currentPrice:u})})),document.querySelector(".outerModal").style.display="block",document.querySelector("#closeSymbol").addEventListener("click",(function(){document.querySelector(".outerModal").style.display="none"}))},n.fromChild=function(){var e=Object(p.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState({countChild:t});case 2:console.log("Count Child:",n.state.countChild);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.state={resp:[],currentStockName:"",currentStockSymbol:"",todaysDate:"",no_Of_Shares:"",buyingPrice:"",errorMessage:"",currentPrice:"",profitLoss:"",isButtonClicked:!1,IdOfStock:"",countChild:!0,responseFromStocksInTable:[]},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;b.get("https://financial-portfolio-trac-40940.firebaseio.com/mystocks.json").then((function(t){var n=[];for(var a in t.data)n.push(Object(h.a)({},t.data[a],{id:a}));e.setState({resp:n}),console.log(e.state.resp)})).catch((function(e){console.log(e)}))}},{key:"componentDidUpdate",value:function(){var e=this;(this.state.isButtonClicked||this.state.countChild)&&(this.setState({countChild:!1}),b.get("https://financial-portfolio-trac-40940.firebaseio.com/mystocks.json").then((function(t){var n=[];for(var a in t.data)n.push(Object(h.a)({},t.data[a],{id:a}));e.setState({resp:n}),console.log(e.state.resp)})).catch((function(e){console.log(e)})),this.setState({isButtonClicked:!1}),b.get("https://financial-portfolio-trac-40940.firebaseio.com/stocksInTable.json").then((function(t){var n=[];for(var a in t.data)n.push(Object(h.a)({},t.data[a],{id:a}));e.setState({responseFromStocksInTable:n}),console.log("Response: ",e.state.responseFromStocksInTable.length)})).catch((function(e){console.log(e)})))}},{key:"addBtnClicked",value:function(){var e=Object(p.a)(f.a.mark((function e(){var t,n,a,o,c=this;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=document.querySelector("#noShares").value,console.log(t),n=document.querySelector("#buyPrice").value,console.log(n),a=(this.state.currentPrice-n)*t,console.log(a),!(t>0&&n>0)){e.next=17;break}return e.next=9,this.setState({no_Of_Shares:t,buyingPrice:n,profitLoss:a,errorMessage:""});case 9:document.querySelector(".outerModal").style.display="none",t=document.querySelector("#noShares").value="",n=document.querySelector("#buyPrice").value="",b.delete("https://financial-portfolio-trac-40940.firebaseio.com/mystocks/".concat(this.state.IdOfStock,".json"),{params:{name:this.state.currentStockName,symbol:this.state.currentStockSymbol}}).then((function(e){console.log(e.data),c.setState({isButtonClicked:!0})})).catch((function(e){console.log(e)})),o={symbol:this.state.currentStockSymbol,name:this.state.currentStockName,noOfShares:this.state.no_Of_Shares,buyPrice:this.state.buyingPrice,currentPrice:this.state.currentPrice,profitLoss:this.state.profitLoss},b.post("https://financial-portfolio-trac-40940.firebaseio.com/stocksInTable.json",o).then((function(e){console.log("Response: ",e)})).catch((function(e){console.log(e)})),e.next=18;break;case 17:this.setState({errorMessage:"Please fill all the inputs"});case 18:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"AddStocksTitle"},0===this.state.responseFromStocksInTable.length?o.a.createElement("h1",{className:"noStock"},"No stocks have been selected"):o.a.createElement("table",{className:"MyStocksTable"},o.a.createElement(k,{isButtonClicked:this.state.isButtonClicked,fromChild:this.fromChild})),o.a.createElement("div",{className:"outerModal"},o.a.createElement("div",{className:"mainModal"},o.a.createElement("strong",{id:"closeSymbol",style:{float:"right"}},"+"),o.a.createElement("br",null),o.a.createElement("h1",{style:{textAlign:"center"}},"Add ",this.state.currentStockName," to My Stocks"),o.a.createElement("h4",{style:{textAlign:"center",color:"red"}},this.state.errorMessage),o.a.createElement("strong",{style:{textAlign:"left",marginBottom:"1%"}},"Company Name: "),o.a.createElement("span",{style:{float:"right"}},this.state.currentStockName),o.a.createElement("br",null),o.a.createElement("strong",{style:{textAlign:"left",marginBottom:"1%"}},"No. of Shares: "),o.a.createElement("input",{style:{float:"right"},type:"number",min:"1",placeholder:"No. of Shares",id:"noShares"}),o.a.createElement("br",null),o.a.createElement("strong",{style:{textAlign:"left",marginBottom:"1%"}},"Buy Price: "),o.a.createElement("input",{style:{float:"right"},type:"number",min:"1",placeholder:"Buying Price",id:"buyPrice"}),o.a.createElement("br",null),o.a.createElement("strong",{style:{textAlign:"left",marginBottom:"1%"}},"Buy Date: "),o.a.createElement("input",{id:"buyDate",style:{float:"right"},type:"date",value:this.state.todaysDate}),o.a.createElement("br",null),o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement("button",{id:"addBtn",type:"submit",className:"AddButton",style:{width:"10%"},onClick:this.addBtnClicked.bind(this)},"Add")))),o.a.createElement("hr",null),o.a.createElement("div",null,o.a.createElement("h3",null,"Add Stocks to my Stocks"),o.a.createElement("ul",null,this.state.resp.map((function(t){return o.a.createElement("li",{key:t.id},o.a.createElement("button",{style:{width:"100px"},className:"StockButton",onClick:function(n,a,o){return e.addStockBtn(t.symbol,t.name,t.id)}},t.symbol)," ",t.name)})))))}}]),t}(o.a.Component),S=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"MyStocks"},o.a.createElement("h3",null,"My Stocks"),o.a.createElement("table",{className:"MyStocksTable"},o.a.createElement("thead",null,o.a.createElement("tr",{className:"stockHeader"},o.a.createElement("th",null,"Stock symbol"),o.a.createElement("th",null,"Stock name"),o.a.createElement("th",null,"No.of shares"),o.a.createElement("th",null,"Buy price"),o.a.createElement("th",null,"Current price"),o.a.createElement("th",null,"Profit/Loss"),o.a.createElement("th",null,"Stop Tracking")))),o.a.createElement(g,null))}}]),t}(a.Component);var E=function(){return o.a.createElement("div",{className:"App"},o.a.createElement("div",{className:"header"},o.a.createElement("strong",null,"FInancial Portfolio Tracker")),o.a.createElement(S,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[21,1,2]]]);
//# sourceMappingURL=main.a0efa97e.chunk.js.map