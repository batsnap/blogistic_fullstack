import React from "react";
import jwtDecode from "jwt-decode";
const axios = require('axios');
class OrdersProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: [],
		};
	}
	componentDidMount() {
		if (Math.round(new Date().getTime() / 1000.0) < jwtDecode(localStorage.token)['exp']) {
			console.log(11);
			axios.get("http://localhost:8000/api/Orders_client/" +jwtDecode(localStorage.token).user_id+ '/',
				{

					'method': 'get',
					'headers': {
						'Authorization': "Bearer " + localStorage.token
					}
				})
				.then(res => {
					this.setState({ orders: res.data })
				})
		}
		else {

			axios.post('http://localhost:8000/api/token/refresh', { 'refresh': localStorage.refresh })
				.then(res => {
					localStorage.setItem('token', res.data.access);
				});
			window.location.replace('/MyOrders');
		}
	}
	render() {
		return (
			
			<div>
				<link rel="stylesheet" href="css/Заказы-пользователя.css" media="screen"></link>
				<div className="row">
				<div className="col-sm-2"></div>
				<div className="col-sm-8 text-center text-black ">
				<table className="table">
					<tr>
						<th>Номер заказа</th>
						<th>Данные заказа</th>
						<th></th>
					</tr>
					{this.state.orders.map(order=>

					<tr>
						<td>
						{order.id_order}
						</td>
						<td>
							<li>Статус заказа -&nbsp;&nbsp;&nbsp;&nbsp;{order.status_order}</li> <br/>
							<li>Дата доставки -&nbsp;&nbsp;&nbsp;&nbsp;{order.date}</li><br/>
							<li>Адресс доставки -&nbsp;&nbsp;&nbsp;&nbsp;{order.addressPV}</li><br/>
						</td>
						<td>
						<a href={'MyOrders/'+order.id_order} class="u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius-50 u-btn-1">Подробнее о заказе</a>
						</td>
					</tr>	
					)}
				</table>
				</div>
				</div>
				
			</div>
		);
	}



};
export default OrdersProfile;


