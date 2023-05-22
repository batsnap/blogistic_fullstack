import React from "react";
import './App.css'
import OperatorsList from "./components/list_operators";
import Logout from "./components/Logout";



//Импорты общие
import { Layout } from "./components/StaticComponents/Layout";
import Main from"./components/StaticComponents/Main";
import AboutUs from "./components/StaticComponents/AboutUs";
import Contacts from "./components/StaticComponents/Contacts";
import Registration from "./components/StaticComponents/Registration";
import Login from "./components/StaticComponents/Login";
import Profile from "./components/StaticComponents/Profile";

//Импорты клиентов
import OrdersProfile from "./components/ClientComponent/OrdersProfile";
import DetailsOrder from "./components/ClientComponent/DetailsOrder";
import EditProfile from "./components/ClientComponent/EditProfile";
import MakeOrder from "./components/ClientComponent/MakeOrder";
import ChangePassword from "./components/ClientComponent/ChangePassword";

//Импортры операторов
import AllOrders from "./components/OperatorsComponent/AllOrders";
import EditOrder from "./components/OperatorsComponent/EditOrder";
import OrderProcessing from "./components/OperatorsComponent/OrderProcessing";
import ListClients from "./components/OperatorsComponent/ListClients";
import EditClient from "./components/OperatorsComponent/EditClient";
import ListWorkers from "./components/OperatorsComponent/ListWorkers";
import EditWorker from "./components/OperatorsComponent/EditWorker";
import ListCars from "./components/OperatorsComponent/ListCars";
import EditCar from "./components/OperatorsComponent/EditCar";
import OperatorMakeOrder from "./components/OperatorsComponent/OperatorMakeOrder";
import AddWorker from "./components/OperatorsComponent/AddWorker";
import AddCar from "./components/OperatorsComponent/AddCar";


//Импорты рабочих
import AllOrdersWorker from "./components/WorkerComponent/AllWorkerOrders";
import TodayOrders from "./components/WorkerComponent/TodayOrders";



import {Route, BrowserRouter,Routes} from 'react-router-dom'; 

export default function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>		
					<Route path="/" element={<Layout></Layout>}>
						<Route index element={<Main></Main>}></Route>
						<Route path="/AboutUS" element={<AboutUs></AboutUs>}></Route>
						<Route path="/Contacts" element={<Contacts></Contacts>}></Route>
						<Route path="/Registration" element={<Registration></Registration>}></Route>
						<Route path="/Login" element={<Login></Login>}></Route>
						
						<Route path="/EditProfile" element={<EditProfile></EditProfile>}></Route>
						<Route path="/MakeOrder" element={<MakeOrder></MakeOrder>}></Route>
						<Route path="/MyOrders" element={<OrdersProfile></OrdersProfile>}>
							
						</Route>
						<Route path="/MyOrders/:OrderId" element={<DetailsOrder></DetailsOrder>}/>

						
						<Route path="/operators" element={<OperatorsList></OperatorsList>}> </Route>
						
						<Route path="/logout" element={<Logout></Logout>}></Route>
						
						<Route path="/profile" element={<Profile></Profile>}></Route>
						<Route path="/ChangePassword" element={<ChangePassword></ChangePassword>}></Route>

						<Route path="/AllOrders" element={<AllOrders></AllOrders>}></Route>
						<Route path="/AllOrders/:OrderId/" key={1} element={<EditOrder></EditOrder>}></Route>
						<Route path="/ListOrderProcessing" element={<OrderProcessing></OrderProcessing>}></Route>
						<Route path="/ListOrderProcessing/:OrderId/" element={<EditOrder></EditOrder>}></Route>
						<Route path="/ListClients" element={<ListClients></ListClients>}></Route>
						<Route path="/ListClients/:UserId" element={<EditClient></EditClient>}></Route>
						<Route path="/ListWorkers" element={<ListWorkers></ListWorkers>}> </Route>
						<Route path="/ListWorkers/:UserId" key={2} element={<EditWorker></EditWorker>}> </Route>
						<Route path="/ListCars" element={<ListCars></ListCars>}> </Route>
						<Route path='/ListCars/:id_car' element={<EditCar></EditCar>}></Route>
						<Route path="/OperatorMakeOrder" element={<OperatorMakeOrder></OperatorMakeOrder>}> </Route>
						<Route path="/AddWorker" element={<AddWorker></AddWorker>}> </Route>
						<Route path="/AddCar" element={<AddCar></AddCar>}> </Route>
						
						<Route path="/WorkerOrders" element={<AllOrdersWorker></AllOrdersWorker>}> </Route>
						<Route path="/TodayOrders" element={<TodayOrders></TodayOrders>}> </Route>
						
					</Route>	
				</Routes>
			</BrowserRouter>
		</div>	
	);
}

