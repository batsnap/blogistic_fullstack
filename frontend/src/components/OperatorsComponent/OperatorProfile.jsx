import React from "react";
const axios = require('axios');
class OperatorProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			grouper: "",
			profile: {},
			Authorization: false
		};
	}


	componentDidMount() 
	{
		axios.get("http://localhost:8000/api/Operators/" + this.props.id + '/',
		{
			'method': 'get',
			'headers': {
				'Authorization': "Bearer " + localStorage.token
			}
		})
		.then(res => 
		{
			this.setState({profile: res.data,});
			
		})

	}

	render() {
			return (
				<section className="u-clearfix u-section-1" id="sec-9a73">
					<div className="u-clearfix u-sheet u-sheet-1">
						<div className="u-container-style u-group u-opacity u-opacity-85 u-palette-3-base u-radius-48 u-shape-round u-group-1">
							<div className="u-container-layout u-container-layout-1">
								<div className="u-table u-table-responsive u-table-1">
									<center><h3>Данные профиля</h3></center>
									<table className="u-table-entity">
										<colgroup>
											<col width="47%"></col>
												<col width="53%"></col>
												</colgroup>
												<tbody className="u-table-body">
													<tr style={{ height: '69px' }}>
														<td className="u-table-cell">Имя пользователя:</td>
														<td className="u-table-cell">{this.state.profile.username}</td>
													</tr>
													<tr style={{ height: '69px' }}>
														<td className="u-table-cell">Электронная почта:</td>
														<td className="u-table-cell">{this.state.profile.email}</td>
													</tr>
													<tr style={{ height: '69px' }}>
														<td className="u-table-cell">Полное имя:</td>
														<td className="u-table-cell">{this.state.profile.Full_name}</td>
													</tr>
													<tr style={{ height: '69px' }}>
														<td className="u-table-cell">Номер телефона:</td>
														<td className="u-table-cell">{this.state.profile.phone_number}</td>
													</tr>
													<tr style={{ height: '69px' }}>
														<td className="u-table-cell">Серия и номер паспорта:</td>
														<td className="u-table-cell">{this.state.profile.series_number_passport}</td>
													</tr>
													<tr style={{ height: '69px' }}>
														<td className="u-table-cell">Дата рождения:<br></br>
														</td>
														<td className="u-table-cell">{this.state.profile.birthday}</td>
													</tr>
												</tbody>
											</table>
										</div>
								</div>
							</div>
                            
							<a href="/AllOrders" className="u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius-50 u-btn-1">Все заказы</a>
							<a href="/ListOrderProcessing" className="u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius-50 u-btn-2">Заказы на обработку</a>
							<a href="/ListClients" className="u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius-50 u-btn-3">Список клиентов</a>
							<a href="/ListWorkers" className="u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius-50 u-btn-4">Список водителей</a>
							<a href="/ListCars" className="u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius-50 u-btn-4">Список машин</a>
							<a href="/OperatorMakeOrder" className="u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius-50 u-btn-4">Сделать заказ за пользователя</a>
							<a href="/AddWorker" className="u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius-50 u-btn-4">Нанять рабочего</a>
							
						</div>
				</section>
			);


	}
};
export default OperatorProfile;


