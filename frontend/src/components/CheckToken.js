import React from "react";
import axios from "axios";

export default function CheckToken(token)
{
	// var устаревший. Используй const / let
    var status;
	axios.get('http://localhost:8000/api/CheckToken',
    {
        'method':'get',
        'headers':{
        'Authorization':"Bearer "+localStorage.token}})
	.then(res=>
	{
        if (res.status===200)
        {
            this.status=res.status;
        }
        else
        {
            this.status=res.status;
        };
	});
    console.log(status)
}
if (res.status===200)
			{
				console.log(11);
				axios.get("http://localhost:8000/api/Clients/"+jwtDecode(localStorage.token).user_id+'/',
				{
				'method':'get',
				'headers':{
				'Authorization':"Bearer "+localStorage.token}
				})
				.then(res =>
				{
					this.setState
					({
						profile: res.data,
						Authorization:true
					});
				})
			}
			if (err.status===401)
			{
				console.log(12);
				axios.post('http://localhost:8000/api/token/refresh',{'refresh':localStorage.refresh})
				.then(res=>
				{
					localStorage.setItem('token',res.data.access);
				});
				axios.get("http://localhost:8000/api/Clients/"+jwtDecode(localStorage.token).user_id+'/',
				{
					'method':'get',
					'headers':{
					'Authorization':"Bearer "+localStorage.token}
				})
				.then(res =>
				{
					this.setState
					({
						profile: res.data,
						Authorization:true
					});
				})
			}