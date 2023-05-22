import { Link, Outlet } from 'react-router-dom';
import React from "react";
const logout = () => {
	window.localStorage.clear();
}
const Layout = () => {
	if (localStorage.token === undefined) {
		console.log('не выполен вход')
		return (
			<>
				<header>
					<div className='row'>

						<div className='col-sm-7'>
							<a href='/'><img src="/images/horizontal_on_white_by_logaster.png" alt='logo' style={{ padding: '40px' }} /></a>
						</div>
						<div className='col-sm-5'>
							<div style={{ height: '100px', paddingTop: '40px' }} >
								<div className="h-100 d-inline-block" style={{ width: '25%' }}><span className='align-middle'><h4><Link to='/' className='text-dark'>Главная</Link></h4></span></div>
								<div className="h-100 d-inline-block" style={{ width: '20%' }}><span className='align-middle'><h4><Link to='/AboutUS' className='text-dark'>О нас</Link></h4></span></div>
								<div className="h-100 d-inline-block" style={{ width: '30%' }}><span className='align-middle'><h4><Link to='/Registration' className='text-dark'>Регистрация</Link></h4></span></div>
								<div className="h-100 d-inline-block" style={{ width: '25%' }}><span className='align-middle'><h4><Link to='/Login' className='text-dark'>Вход</Link></h4></span></div>
							</div>
						</div>
					</div>

				</header>

				<Outlet />

				<footer className="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-4373">
					<div className="u-align-left u-clearfix u-sheet u-sheet-1"></div>
				</footer>
				<section className="u-backlink u-clearfix u-grey-80">
					<a className="u-link" href="/" target="_blank">
						<span>Website</span>
					</a>
					<p className="u-text">
						<span>created by</span>
					</p>
					<a className="u-link" href="https://vk.com/batyr11">
						<span>Batyr Kurbanov</span>
					</a>.
				</section>


			</>
		)
	}
	else {
		return (
			<>

				<header>
					<div className='row'>

						<div className='col-sm-7'>
							<a href='/'><img src="/images/horizontal_on_white_by_logaster.png" alt='logo' style={{ padding: '40px' }} /></a>
						</div>
						<div className='col-sm-5 '>
							<div style={{ height: '100px', paddingTop: '40px' }} >
								<div className="h-100 d-inline-block" style={{ width: '20%' }}><span className='align-middle'><h4><Link to='/' className='text-dark'>Главная</Link></h4></span></div>
								<div className="h-100 d-inline-block" style={{ width: '15%' }}><span className='align-middle'><h4><Link to='/AboutUS' className='text-dark'>О нас</Link></h4></span></div>
								<div className="h-100 d-inline-block" style={{ width: '25%' }}><span className='align-middle'><h4><Link to='/Registration' className='text-dark'>Регистрация</Link></h4></span></div>
								<div className="h-100 d-inline-block" style={{ width: '20%' }}><span className='align-middle'><h4><Link to='/Profile' className='text-dark'>Профиль</Link></h4></span></div>
								<div className="h-100 d-inline-block" style={{ width: '20%' }}><span className='align-middle'><h4><Link to='/Logout' onClick={logout} className='text-dark'>Выход</Link></h4></span></div>
							</div>
						</div>
					</div>

				</header>

				<Outlet />

				<footer className="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-4373">
					<div className="u-align-left u-clearfix u-sheet u-sheet-1"></div>
				</footer>
				<section className="u-backlink u-clearfix u-grey-80">
					<a className="u-link" href="/" target="_blank">
						<span>Website</span>
					</a>
					<p className="u-text">
						<span>created by</span>
					</p>
					<a className="u-link" href="https://vk.com/batyr11">
						<span>Batyr Kurbanov</span>
					</a>.
				</section>
			</>
		)
	}
}

export { Layout }