import React from "react";
import './App.css'
import ClientsList from "./components/list_clients";
import OperatorsList from "./components/list_operators";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import Registration from "./components/Registration";
import Client from "./components/client";
import WorkersList from "./components/list_wokers";
import OrderList from "./components/list_orders";
import Order from "./components/Order";
import ClientOrder from "./components/client_orders";
import {Route, BrowserRouter,Routes} from 'react-router-dom';

// Тут все ок
// minors:
// обычно компоненты, у которых нет child-ов коллапсятся <Component></Component> => <Component />
// Также лично я предпочел бы оставлять в App только одну компоненту, а все роуты вынести в отдельный компонент
// AppRoutes или типо того
export default function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>			
					<Route path="/clients/:UserId" element={<Client></Client>}></Route>
					<Route path="/clients" element={<ClientsList></ClientsList>}></Route>
					<Route path="/operators" element={<OperatorsList></OperatorsList>}> </Route>
					<Route path="/workers" element={<WorkersList></WorkersList>}> </Route>
					<Route path="/login" element={<Login></Login>}></Route>
					<Route path="/logout" element={<Logout></Logout>}></Route>
					<Route path="/registration" element={<Registration></Registration>}></Route>
					<Route path="/profile" element={<Profile></Profile>}></Route>
					<Route path="/orders" element={<OrderList></OrderList>}></Route>
					<Route path="/orders/:OrderId" element={<Order></Order>}></Route>
					<Route path="/my_orders" element={<ClientOrder></ClientOrder>}></Route>
				</Routes>
			</BrowserRouter>
		</div>	
	);
}

