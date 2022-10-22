import React from "react";
import OperatorMakeOrderNewUser from "./OperatorMakeOrderNewUser";
import OperatorMakeOrderExistUser from "./OperatorMakeOrderExistUser";

class OperatorMakeOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			a:''

		};
		this.onChange1=this.onChange1.bind(this);
        this.onChange2=this.onChange2.bind(this);
	}
	onChange1(e)
    {
        this.setState({a:<OperatorMakeOrderExistUser></OperatorMakeOrderExistUser>}) 
    }
    onChange2(e)
    {
        this.setState({a:<OperatorMakeOrderNewUser></OperatorMakeOrderNewUser>}) 
    }

	render(){
		 
		return(
			<div>
                <center>
                <button onClick={this.onChange1}>Существующий пользователь</button>
                <button onClick={this.onChange2}>Новый пользователь</button>
                {this.state.a}
                </center>
			</div>
		)
	}
}


export default OperatorMakeOrder;
