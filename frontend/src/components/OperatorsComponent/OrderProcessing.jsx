import React from "react";
import jwtDecode from "jwt-decode";	
import Fuse from 'fuse.js'
import check_token from "../../utils.js/check_toke";
const axios = require('axios');
class OrderProcessing extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
		post: [],
        post1:[],
        search_words:'',
	  };
	  this.sorting_id=this.sorting_id.bind(this);
	  this.filter_cash=this.filter_cash.bind(this);
      this.search_in_orders=this.search_in_orders.bind(this);
      this.onChange=this.onChange.bind(this);
	}
    onChange(e){
        this.setState({search_words:e.target.value})
    }
	sorting_id(){
	  this.setState({post:this.state.post.sort((a, b) => a.id_operator > b.id_operator ? 1:-1)});
	}

	filter_cash(){
		this.setState({post:this.state.post.filter(el=>el.type_pay==='card')})
	}
    search_in_orders()
    {
        const option={
            includeScore: true,
            keys:['id_order','name_client','name_worker','addressPV','addressPD','date','time_in','confirmation_order','price','type_pay','status_order','name_operator','type_thing']
        }
        const fuse= new Fuse(this.state.post1,option);
        let content=[]
        for (let buf of fuse.search(this.state.search_words))
        {
            console.log(buf)
            if (buf.score<0.35)
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
			axios.get("http://localhost:8000/api/ListOrderProcessing/?id_operator="+jwtDecode(localStorage.token)['user_id'])
			.then(res =>
			{
				console.log(res.data)
				this.setState(
				{
					post: res.data,
					post1:res.data
				});
			})
		},400)
		
	}
	render() 
	{
			return (	
                <div className="row">
                    <div className="col-sm-2"></div>
                    
                <div className="col-sm-8  ">
                <div className="row">
                    Поиск
                    <input type="text"  value={this.state.search_words} onChange={this.onChange}/>
                    <button className="btn" onClick={this.search_in_orders}>cash</button>
                </div>
                
					<table className="table table-sm table-responsive small text-center  table-striped table-hover bg-light text-black">
						<thead>
							<tr>
								<th><button className="btn btn-light" onClick={this.sorting_id}>        id_order</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_name}>      name_client</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_experience}>  name_operator</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_position}>      name_worker</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_phone_number}>      addressPV</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_phone_number}>      addressPD</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_phone_number}>      date</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_phone_number}>      time_in</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_phone_number}>      weight</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_phone_number}>      type_thing</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_phone_number}>      confirmation_order</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_phone_number}>      price</button></th>
								<th><button className="btn btn-light" onClick={this.filter_cash}>      type_pay</button></th>
								<th><button className="btn btn-light" onClick={this.sorting_phone_number}>      status_order</button></th>

							</tr>
						</thead>
						<tbody>
							{this.state.post.map(posts=>
								<tr>
									<td><a href={"ListOrderProcessing/"+posts.id_order+"/"} key={posts.id_order} className="text-black">{posts.id_order}</a></td>
									<td>{posts.name_client}</td>
									<td>{posts.name_operator}</td>
									<td>{posts.name_worker}</td>
									<td>{posts.addressPV}</td>
									<td>{posts.addressPD}</td>
									<td>{posts.date}</td>
									<td>{posts.time_in}</td>
									<td>{posts.weight}</td>
									<td>{posts.type_thing}</td>
									<td>{posts.confirmation_order}</td>
									<td>{posts.price}</td>
									<td>{posts.type_pay}</td>
									<td>{posts.status_order}</td>
								</tr>
							)}
						</tbody>
					</table>
					</div>
				</div>	
			
			);
	}
};
export default OrderProcessing;