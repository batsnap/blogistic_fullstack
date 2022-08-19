import axios from "axios";

export function refresh_token(token)
{
	axios.post('http://localhost:8000/api/token/refresh',{'refresh':token})
	.then(res=>
	{
		return res.data.access
	});
}