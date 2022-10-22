import React from "react";
import check_token from "../../utils.js/check_toke";
import Fuse from 'fuse.js'
import axios from "axios";
import jwtDecode from "jwt-decode";
class TodayOrders extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
		post: [],
        post1:[],
        search_words:'',
		type_search:'',
	  };
	  this.sorting_id=this.sorting_id.bind(this);
	  this.filter_cash=this.filter_cash.bind(this);
      this.search_in_orders=this.search_in_orders.bind(this);
      this.onChange1=this.onChange1.bind(this);
	  this.onChange_option=this.onChange_option.bind(this);
	  this.onChange_type_search=this.onChange_type_search.bind(this);
	  this.onChange_worker_denied=this.onChange_worker_denied.bind(this);
	}
	onChange_type_search(e)
	{
		this.setState({type_search:e.target.value})
	}
    onChange1(e){
        this.setState({search_words:e.target.value})
    }
	sorting_id(){
	  this.setState({post:this.state.post.sort((a, b) => a.id_operator > b.id_operator ? 1:-1)});
	}

	filter_cash(){
		this.setState({post:this.state.post.filter(el=>el.type_pay==='card')})
	}
	onChange_option = (e) => {
		axios.post('http://localhost:8000/api/ChangeStatusOrder/',
		{
			'id_order':e.target.id,
			'status_order':e.target.value
		})
		setTimeout(() => {
			window.location.reload()
		}, 400);
		
	};
	onChange_worker_denied = (e) => {
		axios.post('http://localhost:8000/api/ChangeWorker/',
		{
			'id_order':e.target.value,
		})
		setTimeout(() => {
			window.location.reload()
		}, 400);
		
	};
    search_in_orders()
    {
        const option={
            includeScore: true,
            keys:[this.state.type_search]
        }
		console.log(option)
        const fuse= new Fuse(this.state.post1,option);
        let content=[]
        for (let buf of fuse.search(this.state.search_words))
        {
            console.log(buf)
            if (buf.score<0.3)
            {
                
                content.push(buf.item)
            }
        }
        console.log(content)
        this.setState({post:content})
    }

	componentDidMount() 
	{	
		check_token()
		setTimeout(()=>
		{
			axios.post("http://localhost:8000/api/TodayOrders/",
			{
			'method':'post',
			'headers':{
			'Authorization':"Bearer "+localStorage.token},
			'id_user':jwtDecode(localStorage.token).user_id,
			})
			.then(res =>
				{
					this.setState({
					post: res.data,
					post1:res.data
					});
				})
		},400)	
		
	}
	option_status_order(k)
	{
		if(k==='В обработке')
		{
			return(
			<>
			<option selected>{k}</option>
			<option>Подтвержденно водителем</option>
			<option>Водитель выехал к начальному адрессу</option>
			<option>Водитель приехал к начальному адрессу</option>
			<option>Водитель выехал к конечному адрессу</option>
			<option>Водитель приехал к конечному адрессу</option>
			<option>Заказ завершен</option>
			</>)
		}
		if(k==='Подтвержденно водителем')
		{
			return(
			<>
			<option selected>{k}</option>
			<option>Водитель выехал к начальному адрессу</option>
			<option>Водитель приехал к начальному адрессу</option>
			<option>Водитель выехал к конечному адрессу</option>
			<option>Водитель приехал к конечному адрессу</option>
			<option>Заказ завершен</option>
			</>)
		}
		if(k==='Водитель выехал к начальному адрессу')
		{
			return(
			<>
			<option selected>{k}</option>
			<option>Водитель приехал к начальному адрессу</option>
			<option>Водитель выехал к конечному адрессу</option>
			<option>Водитель приехал к конечному адрессу</option>
			<option>Заказ завершен</option>
			</>)
		}
		if(k==='Водитель приехал к начальному адрессу')
		{
			return(
			<>
			<option selected>{k}</option>
			<option>Водитель выехал к конечному адрессу</option>
			<option>Водитель приехал к конечному адрессу</option>
			<option>Заказ завершен</option>
			</>)
		}
		if(k==='Водитель выехал к конечному адрессу')
		{
			return(
			<>
			<option selected>{k}</option>
			<option>Водитель приехал к конечному адрессу</option>
			<option>Заказ завершен</option>
			</>)
		}
		if(k==='Водитель приехал к конечному адрессу')
		{
			return(
			<>
			<option selected>{k}</option>
			<option>Заказ завершен</option>
			</>)
		}
		if(k==='Заказ завершен')
		{
			return(
			<>
			<option selected>{k}</option>
			</>)
		}
	}
	onChange_status_pay(e)
	{
		axios.post('http://localhost:8000/api/ChangeStatusPay/',
		{
			'id_order':e.target.id,
			'status_pay':e.target.value
		})
		setTimeout(() => {
			window.location.reload()
		}, 400);
	}
	option_status_pay(k)
	{
		if(k==='Не оплачено')
		{
			return(
			<>
			<option selected>{k}</option>
			<option>Оплачено</option>
			</>)
		}
		if(k==='Оплачено')
		{
			return(
			<>
			<option selected>{k}</option>
			</>)
		}
	}
	render() 
	{
			return (	
                <div className="row">
                    <div className="col-sm-2"></div>
                    
                <div className="col-sm-8  ">
                <div className="row">
                    Поиск
                    <input type="text"  value={this.state.search_words} onChange={this.onChange1}/>
                    <button className="btn" onClick={this.search_in_orders}>Поиск</button>
					<select name='type_search' onChange={this.onChange_type_search}>
						<option></option>
						<option value="id_order">Номер заказа</option>
						<option value="name_client">Имя клиента</option>
						<option value="name_worker">Имя водителя</option>
						<option value="name_worker">Имя водителя</option>
					</select>
                </div>
                
					<table className="table table-sm table-responsive small text-center  table-striped table-hover bg-light text-black">
						<thead>
							<tr>
								<th><button className="btn btn-light" onClick={this.sorting_id}>        id_order</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_name}>      name_client</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_position}>      name_worker</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_experience}>  name_operator</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_phone_number}>      addressPV</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_phone_number}>      addressPD</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_phone_number}>      date</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_phone_number}>      time_in</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_phone_number}>      weight</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_phone_number}>      type_thing</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_phone_number}>      confirmation_order</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_phone_number}>      price</button></th>
								<th><button className="btn btn-light" onClick={this.filter_cash}>      type_pay</button></th>
								<th><button className="btn btn-light" onClick={this.filter_cash}>      status_pay</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_phone_number}>      status_order</button></th>

							</tr>
						</thead>
						<tbody>
							{this.state.post.map(posts=>
								<tr>
									<td><a href={"AllOrders/"+posts.id_order+"/"} key={posts.id_order} className="text-black">{posts.id_order}</a></td>
									<td><a href={'/ListClients/'+posts.id_client}>{posts.name_client}</a></td>
									<td><a href={'/ListWorkers/'+posts.user_worker}>{posts.name_worker}</a></td>
									<td>{posts.name_operator}</td>
									<td>{posts.addressPV}</td>
									<td>{posts.addressPD}</td>
									<td>{posts.date}</td>
									<td>{posts.time_in}</td>
									<td>{posts.weight}</td>
									<td>{posts.type_thing}</td>
									<td>{posts.confirmation_order}</td>
									<td>{posts.price}</td>
									<td>{posts.type_pay}</td>
									<td>
										
										<select name="status_pay" id={posts.id_order} onChange={this.onChange_status_pay}>
											{this.option_status_pay(posts.status_pay)}
										</select>
									</td>
									<td>
										<select name="status_order" onChange={this.onChange_option} id={posts.id_order}>
											{this.option_status_order(posts.status_order)}
										</select>
										
									</td>
									<td><button value={posts.id_order} onClick={this.onChange_worker_denied}>Отказаться от заказа</button></td>
								</tr>
							)}
						</tbody>
					</table>
					</div>
				</div>	
			
			);
	}
};
export default TodayOrders;