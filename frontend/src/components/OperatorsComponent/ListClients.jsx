import React from "react";
import check_token from "../../utils.js/check_toke";
import Fuse from 'fuse.js'
class ListClients extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clients_list1: [],
			clients_list2: [],
			search_words:'',
			type_search:'',
		};
		this.sorting_id = this.sorting_id.bind(this);
		this.search_in_orders=this.search_in_orders.bind(this);
      	this.onChange=this.onChange.bind(this);
	  	this.onChange_type_search=this.onChange_type_search.bind(this);
	}
	sorting_id() {
		this.setState({ post: this.state.post.sort((a, b) => a.id_client > b.id_client ? 1 : -1) });
	}
	onChange(e){
        this.setState({search_words:e.target.value})
    }
	onChange_type_search(e)
	{
		this.setState({type_search:e.target.value})
	}
	search_in_orders()
    {
        const option={
            includeScore: true,
            keys:[this.state.type_search]
        }
        const fuse= new Fuse(this.state.clients_list2,option);
        let content=[]
        for (let buf of fuse.search(this.state.search_words))
        {
            if (buf.score<0.25)
            {
                
                content.push(buf.item)
            }
        }
        this.setState({clients_list1:content})
    }
	componentDidMount() {
		check_token()
		setTimeout(()=>
		{
			fetch("http://localhost:8000/api/Clients/",
			{
				'method': 'get',
				'headers': {
					'Authorization': "Bearer " + localStorage.token
				}
			})
			.then(res => res.json())
			.then((result) => 
			{
				this.setState(
				{
					clients_list1: result.sort((a, b) => a.id_client > b.id_client ? 1:-1),
					clients_list2: result.sort((a, b) => a.id_client > b.id_client ? 1:-1)
				});
			})
		},400)

			
	}
	render() {
		return (
			<div className="row">
				<div className="col-sm-2"></div>
				<div className="col-sm-8 text-center bg-light text-black ">
					<input type="text"  value={this.state.search_words} onChange={this.onChange}/>
                    <button className="btn" onClick={this.search_in_orders}>Поиск</button>
					<select name='type_search' onChange={this.onChange_type_search}>
						<option></option>
						<option value="id_client">Номер клиента</option>
						<option value="Full_name">Фио</option>
						<option value="username">Имя пользователя</option>
						<option value="phone_number">Номер телефона</option>
						<option value="series_number_passport">Серия и номер паспорта</option>
						<option value="email">Электронная почта</option>
					</select>
					<table className="table table-sm table-responsive small text-center  table-striped table-hover bg-light text-black">
						<thead>
							<tr>
								<th><button className="btn btn-light" onClick={this.sorting_id}>        Номер клиента</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_name}>      ФИО</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_birthday}>  Имя пользователя</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_card}>      Дата рождения</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_email}>      Номер телефона</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_email}>      Серия и номер паспорта</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_email}>      Электронная почта</button></th>
							</tr>
						</thead>
						<tbody>
							{this.state.clients_list1.map(client =>
								<tr>
									<td><a href={"ListClients/" + client.user} className="text-black">{client.id_client}</a></td>
									<td>{client.Full_name}</td>
									<td>{client.username}</td>
									<td>{client.birthday}</td>
									<td>{client.phone_number}</td>
									<td>{client.series_number_passport}</td>
									<td>{client.email}</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				<div className="col-sm-2"></div>
			</div>
		);
	}
};
export default ListClients;	