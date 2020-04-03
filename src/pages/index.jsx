import React from "react";
import App from "../App";
import Dashboard  from '../components/Dashboard/index'
import '../pages/css/App.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import {
	Container,
	Image,
	Table,
	Row
} from 'react-bootstrap';

const axios = require('axios');
var allUsers;
var allEmails = [];
var currentUser;
var numberOfCryptos = 0;

axios.get('/user/all').then(function(response){
	allUsers = response.data
	for (let i = 0; i < allUsers.length; i++) {
		allEmails.push([allUsers[i].email, allUsers[i].cryptos])
	}
	
	// console.log(allEmails);
})

function generateTable(user, numberOfCryptos) {
	var htmlAdd = "";
	console.log(numberOfCryptos);
	for (let i = 0; i < numberOfCryptos; i++) {
		htmlAdd += 
		// not sure how to add onclick to html
		// "<tr onClick={(e) => this.update_graph(e)} >" +
		"<tr>" +
			"<td data-item={'FAKEID_BTC'}>" +
				// user.symbol + 
				user.cryto_symbol +
			"</td>" +
			"<td data-item={'FAKEID_BTC'}>" +
				user.latest_crypto_price + 
			"</td>" + 
			"<td>"+ 
				user.latest_crypto_price + 
			"</td>"+
		"</tr>"
	}
	document.getElementById("generate").innerHTML += (htmlAdd);
}

class MainPage extends React.Component {
	constructor() {
        super();
        this.state = {
			selected_id: "none",
			date: ''
		}
	}
	componentDidMount(){
		var date = new Date().getDate();
		const monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
		];
		var month = monthNames[new Date().getMonth()]
		var year = new Date().getFullYear();
		this.setState({
			date:
			' ' + month + ' ' + date + ', ' + year
		});
		generateTable(currentUser, numberOfCryptos);
	}
	
	update_graph = event => {
		const id = event.target.getAttribute('data-item');
		this.setState({selected_id: id});
		Dashboard.selected_id=this.state.selected_id;
		this.setState({
			showComponenet: true
		});
	}
	
	render() {

		for (var i = 0; i < allUsers.length; i++) {
			// if (allUsers[i].email === this.props.user.email) {
			// 	console.log(allUsers[i].email);
			// 	console.log(allUsers[i].cryptos);
			// }
			if (allUsers[i].email === "fred@hotmail.com") {
				currentUser = allUsers[i].cryptos[0];
				numberOfCryptos++;
				// console.log(allUsers[i].cryptos[0])
				// console.log(allUsers[i].cryptos[0].crypto_name);
				// generateTable(allUsers[i].cryptos[0]);
			}
		}

		return (			
			<div className = "mainContent">

			{
			this.props.user ? 
			// if logged in, show all content
			// all content should be inside this div
				<div className="main">
					<center><p id="date"><Image src={this.props.user.photoURL} roundedCircle width={20}/>{this.state.date}</p></center>
					<div className="wrapper">
						<center><h4>Dashboard</h4></center>
						<Container className="users">
						<Row style={{marginTop: "10px"}}>
							<Table responsive variant="dark" className="dashboard_table">
							<thead>
								<th>Coin</th>
								<th>Price</th>
								<th>24h</th>
								<th>7d</th>
								<th>Last 7 Days</th>
							</thead>
							<tbody id = "generate">
								{/*<tr onClick={(e) => this.update_graph(e)} >
									<td data-item={"FAKEID_BTC"}>
										<Image src="https://assets.coingecko.com/coins/images/1/thumb_2x/bitcoin.png?1547033579" roundedCircle width={25}  style={{marginRight:'5px'}}/>
										BTC
									</td>
									<td data-item={"FAKEID_BTC"}>$4,673.84</td>
									<td data-item={"FAKEID_BTC"}>-39.6%</td>
									<td data-item={"FAKEID_BTC"}>-41.3%</td>
									<td data-item={"FAKEID_BTC"}>
										<Image src="https://www.coingecko.com/coins/1/sparkline" roundedCircle width={90}/>
									</td>
								</tr>
								<tr onClick={(e) => this.update_graph(e)}>
									<td data-item={"FAKEID_ETH"}>
										<Image src="https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png?1547034048" roundedCircle width={25}  style={{marginRight:'5px'}}/>
										ETH
									</td>
									<td data-item={"FAKEID_ETH"}>$4,673.84</td>
									<td data-item={"FAKEID_ETH"}>-39.6%</td>
									<td data-item={"FAKEID_ETH"}>-41.3%</td>
									<td data-item={"FAKEID_ETH"}>
										<Image src="https://www.coingecko.com/coins/325/sparkline" roundedCircle width={90}/>
									</td>
								</tr>*/}
								
							</tbody>
							</Table>
						</Row>

					</Container>
					
					{/* <Dashboard className="dashboard"/> */}
					<Dashboard selected_id={this.state.selected_id}/>

						
					</div>
				</div>
				:
				// else, redirect back to login page
				<Router>
					<Route exact path = '/' component = {App}/>
				</Router>
			}
			</div>
		);
	}

} 

export default MainPage;
