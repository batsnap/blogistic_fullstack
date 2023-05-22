import React from "react";

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<div className="container">

				<h2 className="u-align-center u-text u-text-1">Отследить заказ<br></br>
				</h2>
				<div className="container">
					<img src={require('./log1.jpg')} alt="s" className="img-fluid" style={{width:'1180px',height:'500px'}}/>
				</div>
				<div className="container">
					<center>
					<input type="text" placeholder="Номер заказа" ></input>
					<a href="/search" className="u-btn u-btn-round u-btn-submit u-button-style u-radius-15">Найти</a>
					</center>
				</div>


			</div>

		);
	}
};
export default Main;

