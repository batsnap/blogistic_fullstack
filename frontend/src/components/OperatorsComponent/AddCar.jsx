import React from "react";
import check_token from "../../utils.js/check_toke";
const axios = require('axios');
class AddCar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			type_car:'',
            price:'',
            car_number:'',
            worker:'',
		};
		this.onChange=this.onChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}


	componentDidMount() 
	{
		check_token();
	}
	handleSubmit(event)
	{
		axios.post('http://localhost:8000/api/AddCar/',
        {
            'type_car':this.state.type_car,
            'price':this.state.price,
            'car_number':this.state.car_number,
        })
	}
	onChange = (e) => {
		this.setState({[e.target.name]:e.target.value})
		if (e.target.name==='type_car')
		{
			axios.post('http://localhost:8000/api/get_car_price',
			{'type_car':e.target.value})
			.then(res=>
			{
				this.setState({price:res.data.price})
			})
		}
	}

	render() {

		return (
			<div className="row">
				<div className="col-sm-4"></div>
				<div className="col-sm-4 bg-ligth text-black ">
					<table className="table">
						<tbody>
						<tr>
							<td>Тип машины</td>
							<td>
                                <select style={{width:'400px'}} name='type_car' value={this.state.type_car} onChange={this.onChange}>
                                    <option value=""></option>
                                    <option value='Tent low 3 meters'>Тент низкий 3 метра</option>
                                    <option value='Van 3 meters'>Фургон 3 метра</option>
                                    <option value='Van high 3 meters'>Фургон высокий 3 метра</option>
                                    <option value='Tent low 4 meters'>Тент низкий 4 метра</option>
                                    <option value='Van 4 meters'>Фургон 4 метра</option>
                                    <option value='Van high 4 meters'>Фургон высокий 4 метра</option>
                                    <option value='Heel'>Каблук</option>
                                    <option value='Tent 3 tons'>Тент 3 тонны</option>
                                    <option value='Van 3 tons'>Фургон 3 тонны</option>
                                    <option value='Board 3 tons'>Борт 3 тонны</option>
                                    <option value='Refrigerator 3 tons'>Рефрижератор 3 тонны</option>
                                    <option value='Board 5 meters 5 tons'>Борт 5 метров 5 тонн</option>
                                    <option value='Van 5 meters 5 tons'>Фургон 5 метров 5тонн</option>
                                    <option value='Tent 5 meters 5 tons'>Тент 5 метров 5 тонн</option>
                                    <option value='Refrigerator 5 meters 5 tons'>Рефрижератор 5 метров 5 тонн</option>
                                    <option value='Tent 6 meters 10 tons'>Тент 6 метров 10 тонн</option>
                                    <option value='Van 6 meters 10 tons'>Фургон 6 метров 10 тонн</option>
                                    <option value='Board 6 meters 10 tons'>Борт 6 метров 10 тонн</option>
                                    <option value='Refrigerator 6 meters 10 tons'>Рефрижератор 6 метров 10 тонн</option>
                                    <option value='Tent 20 tons'>Тент 20 тонн</option>
                                    <option value='Van 20 tons'>Фургон 20 тонн</option>
                                    <option value='Board 20 tons'>Борт 20 тонн</option>
                                    <option value='Refrigerator 20 tons'>Рефрижератор 20 тонн</option>
                                </select>
                            </td>
						</tr>
						<tr>
							<td>Цена</td>
							<td>{this.state.price}</td>
						</tr>
						<tr>
							<td>Номер машины</td>
							<td><input style={{width:'400px'}} type="text" name='car_number' value={this.state.car_number} onChange={this.onChange}/></td>
						</tr>
						</tbody>
					</table>
					<center>
						<input type="button" style={{width:'200px'}} value="Нанять!" onClick={this.handleSubmit}/>
					</center>
				</div>
			</div>
		);

	}
};
export default AddCar;