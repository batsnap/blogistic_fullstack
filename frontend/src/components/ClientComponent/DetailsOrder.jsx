import React from "react";
import check_token from "../../utils.js/check_toke";
const axios = require('axios');
class DetailsOrder extends React.Component {
	constructor(props) {
	  super(props);
	  
	  this.state = {
		profile: {},
		user:'',
		Authorization:false
	  };
	  this.onClickPay=this.onClickPay.bind(this)  
	}
	

	componentDidMount()
	{
		check_token();
		setTimeout(()=>
		{
			axios.get("http://localhost:8000/api/Orders/"+window.location.pathname.split('/')[2]+'/',
			{
			
			'method':'get',
			'headers':{
			'Authorization':"Bearer "+localStorage.token}
			})
			.then(res =>
			{
				this.setState(
				{
					profile: res.data,
					Authorization:true
				});
			})
		},400)
			
	}
	onClickPay()
	{
		axios.post('http://localhost:8000/api/ChangeStatusPay/',
		{
			'id_order':this.state.profile.id_order,
			'status_pay':'Оплачено'
		})
		setTimeout(() => {
			window.location.reload()
		}, 400);
	}

	render() {

	  return (
			<div className="row">
			<div className="col-sm-4"> </div>
		  <div className="col-sm-4 text-center bg-light text-dark ">
			<center>
			  <h3>Order</h3>
			</center>
			  <table className="table ">
				<tr>
					<td className="float-left">Номер заказа</td>
					<td>{this.state.profile.id_order}</td>
				</tr>
				<tr>
				  <td className="float-left">Заказчик</td>
				  <td>{this.state.profile.name_client}</td>
				</tr>
				<tr>
				  <td className="float-left">Водитель</td>
				  <td>{this.state.profile.name_worker}</td>
				</tr>
                <tr>
				  <td className="float-left">Адресс забора груза</td>
				  <td>{this.state.profile.addressPV}</td>
				</tr>
                <tr>
				  <td className="float-left">Конечный адресс</td>
				  <td>{this.state.profile.addressPD}</td>
				</tr>
                <tr>
				  <td className="float-left">Дата выполнения заказа</td>
				  <td>{this.state.profile.date}</td>
				</tr>
                <tr>
				  <td className="float-left">Время начала заказа</td>
				  <td>{this.state.profile.time_in}</td>
				</tr>
                <tr>
				  <td className="float-left">Вес груза</td>
				  <td>{this.state.profile.weight}</td>
				</tr>
                <tr>
				  <td className="float-left">Тип перевозимого груза</td>
				  <td>{this.state.profile.type_thing}</td>
				</tr>
                <tr>
				  <td className="float-left">Статус подтверждения груза</td>
				  <td>{this.state.profile.confirmation_order}</td>
				</tr>
                <tr>
				  <td className="float-left">Цена</td>
				  <td>{this.state.profile.price}</td>
				</tr>
                <tr>
				  <td className="float-left">Тип оплаты</td>
				  <td>{this.state.profile.type_pay}</td>
				</tr>
				<tr>
				  <td className="float-left">Статус оплаты</td>
				  <td>{this.state.profile.status_pay==='Не оплачено' ? (<button onClick={this.onClickPay} className="btn btn-primary">Оплатить</button>) : (this.state.profile.status_pay)} <br></br>
						
				  </td>
				</tr>
                <tr>
				  <td className="float-left">Статус заказа</td>
				  <td>{this.state.profile.status_order}</td>
				</tr>

			  </table>
		    </div>
			</div>
		);

	}
	};
export default DetailsOrder;