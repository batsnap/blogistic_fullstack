import React from "react";
import check_token from "../../utils.js/check_toke";
import { Form,Button } from "react-bootstrap";
import jwtDecode from "jwt-decode";
const axios = require('axios')
class ChangePassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			new_password:'',
			new_password_2:'',
			new_password_confirmation:'',
			
		};
		this.onChange=this.onChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
		
	}
	
    componentDidMount()
    {
        check_token()
    }
    
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleSubmit(event) {
		if(this.state.new_password===this.state.new_password_2)
		{
			this.setState({new_password_confirmation:'Пароль изменен успешно'})
			axios.post('http://localhost:8000/api/CheckPass/',
			{
				id_user:jwtDecode(localStorage.token)['user_id'],
				password:this.state.new_password
			})
			setTimeout(()=>
			{
				window.location.replace('/Profile')
			},2000)
		}
		else
		{
			this.setState({new_password_confirmation:'Пароли не совпадают'})
		}
		
		
	}
    render()
    {
        return(
            <div>
                <center>
                <Form className="d-flex flex-column align-items-center">

					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Новый пароль</Form.Label>
						<Form.Control 
							type="password" 
							value={this.state.new_password} 
							name="new_password" 
							onChange={this.onChange}/>
					</Form.Group>
					
					<Form.Group style={{ width: '500px' }}>
						<Form.Label>Повторите новый пароль</Form.Label>
						<Form.Control 
							type="password" 
							value={this.state.new_password_2} 
							name="new_password_2" 
							onChange={this.onChange}/>           
					</Form.Group>
					<h3>{this.state.new_password_confirmation}</h3>
					<Button variant="primary" onClick={this.handleSubmit} className="btn-block" style={{ maxWidth: '500px' }}>
						Submit
					</Button>
					
				</Form>
                </center>
            </div>
        )
    }
}


export default ChangePassword;