import jwtDecode from "jwt-decode";
const axios = require('axios');
function check_token()
{
    if (Math.round(new Date().getTime() / 1000.0) > jwtDecode(localStorage.token)['exp']) 
    {
        console.log('токен не активен обновляю')
        axios.post('http://localhost:8000/api/token/refresh', { 'refresh': localStorage.refresh })
            .then(res => {
                localStorage.setItem('token', res.data.access);
            });
    }
}
export default check_token;