import React from "react";
import jwtDecode from "jwt-decode";
import ClientsProfile from "../ClientComponent/ClientsProfile";
import OperatorProfile from "../OperatorsComponent/OperatorProfile";
import WorkerProfile from "../WorkerComponent/WorkerProfile";
import check_token from "../../utils.js/check_toke";
const axios = require('axios');


class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			grouper: "",
			id:jwtDecode(localStorage.token).user_id
		};
	}


	componentDidMount() {
		check_token()
		setTimeout(() => 
		{
			axios.get("http://localhost:8000/api/Users/" + this.state.id + '/',
			{
				'method': 'get',
				'headers': {
					'Authorization': "Bearer " + localStorage.token
				}
			})
			.then(les => 
			{
				this.setState({grouper:les.data.groups})
			}
			)	
		}, 400);
		
	}

	render() {
        if (this.state.grouper==='Clients')
			return (
				<div>
					<title>О нас</title>
					<ClientsProfile id={this.state.id}></ClientsProfile>
				</div>
			);
        if (this.state.grouper==='Operators')
			return (
			<div>
				<title>Профиль</title>
				<OperatorProfile id={this.state.id}></OperatorProfile>
			</div>
			);
		if (this.state.grouper==='Workers')
			return (
			<div>
				<title>Профиль</title>
				<WorkerProfile id={this.state.id}></WorkerProfile>
			</div>
			);
			


	}
};
export default Profile;


