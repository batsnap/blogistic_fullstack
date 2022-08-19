import React from "react";
import jwtDecode from "jwt-decode";	
const axios = require('axios');
class ClientsList extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		post: [],
	  };
	  this.sorting_id=this.sorting_id.bind(this);
	  this.sorting_birthday=this.sorting_birthday.bind(this);
	  this.sorting_name=this.sorting_name.bind(this);
	  this.sorting_card=this.sorting_card.bind(this);
	  this.sorting_email=this.sorting_email.bind(this);
	}
	sorting_id(){
	  this.setState({post:this.state.post.sort((a, b) => a.id_client > b.id_client ? 1:-1)});
	}
	sorting_name(){
	  this.setState({post:this.state.post.sort((a, b) => a.Full_name > b.Full_name ? 1:-1)});
	}
	sorting_birthday(){
	  this.setState({post:this.state.post.sort((a, b) => a.birthday > b.birthday ? 1:-1)});
	}
	sorting_card(){
	  this.setState({post:this.state.post.sort((a, b) => a.Card_number > b.Card_number ? 1:-1)});
	}
	sorting_email(){
	  this.setState({post:this.state.post.sort((a, b) => a.email > b.email ? 1:-1)});
	}

	componentDidMount() 
	{
	if (Math.round(new Date().getTime()/1000.0)<jwtDecode(localStorage.token)['exp'])
	  	{
				
			fetch("http://localhost:8000/api/Clients/",
			{
			'method':'get',
			'headers':{
			'Authorization':"Bearer "+localStorage.token}
			})
			.then(res =>res.json())
			.then(
				(result) => 
				{
					this.setState({
					post: result
					});
				})
		}
		else
		{
			axios.post('http://localhost:8000/api/token/refresh',{'refresh':localStorage.refresh})
			.then(res=>
			{
			localStorage.setItem('token',res.data.access);
			});
			console.log(10);
			window.location.replace('/clients');
		}
	}
	render() {
	  if (this.state.post.code==="token_not_valid"){
		return(
		  <div className="col-sm-8 text-center">
			<h3>Yo are not log in</h3>
		  </div>
		)
	  }
	  else{
	  return (
		
		  <div className="col-sm-8 text-center bg-info text-light ">
		  <table className="table">
			<thead>
			  <tr>
				<th><button className="btn btn-info" onClick={this.sorting_id}>        id</button></th>
				<th><button className="btn btn-info" onClick={this.sorting_name}>      Full name</button></th>
				<th><button className="btn btn-info" onClick={this.sorting_birthday}>  birthday</button></th>
				<th><button className="btn btn-info" onClick={this.sorting_card}>      Card_number</button></th>
				<th><button className="btn btn-info" onClick={this.sorting_email}>      Email</button></th>
			  </tr>
			</thead>
			<tbody>
			  {this.state.post.map(posts=>
				  <tr>
					<td><a href={"clients/"+posts.id_client} key={posts.id_client} className="text-light">{posts.id_client}</a></td>
					<td>{posts.Full_name}</td>
					<td>{posts.birthday}</td>
					<td>{posts.Card_number}</td>
					<td>{posts.email}</td>
				  </tr>
			  )}
			</tbody>
		  </table>
		  </div>
		  
		);
	  }
	}
	};
export default ClientsList;