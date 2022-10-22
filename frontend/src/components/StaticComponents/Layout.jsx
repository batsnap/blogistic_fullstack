import { Outlet } from 'react-router-dom';
import React from "react";
const logout=()=>
{
	window.localStorage.clear();
}
const Layout = () => {
	if (localStorage.token === undefined) {
		console.log('не выполен вход')
		return (
			<>
				
					<header className="u-clearfix u-header u-sticky u-sticky-c8ea u-white u-header" id="sec-a202">
						<div className="u-clearfix u-sheet u-sheet-1">
							<a href="/" data-page-id="243706343" className="u-align-left u-image u-logo u-image-1"
								title="Blogistic" data-image-width="330" data-image-height="150">
								<img src="/images/horizontal_on_white_by_logaster.png" className="u-logo-image u-logo-image-1" alt='logo'/>
							</a>
							<nav className="u-menu u-menu-one-level u-offcanvas u-menu-1">
								<div className="menu-collapse" style={{'fontSize':'1rem','letterSpacing':'0px'}}>
									<a className="u-button-style u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
										href="/">
									</a>
								</div>
								<div className="u-custom-menu u-nav-container">
									<ul className="u-nav u-unstyled u-nav-1">
										<li className="u-nav-item"><a
											className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
											href="/" style={{padding: "10px 20px"}}>Главная</a>
										</li>
										<li className="u-nav-item"><a
											className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
											href="/AboutUs" style={{padding: "10px 20px"}}>О нас</a>
										</li>
										<li className="u-nav-item"><a
											className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
											href="/Contacts"style={{padding: "10px 20px"}}>Контакты</a>
										</li>
										<li className="u-nav-item"><a
											className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
											href="/Registration" style={{padding: "10px 20px"}}>Регистрация</a>
										</li>
										<li className="u-nav-item"><a
											className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
											href="/Profile" style={{padding: "10px 20px"}}>Профиль</a>
										</li>
										<li className="u-nav-item"><a
											className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
											href="/Login" style={{padding: "10px 20px"}}>Вход</a>
										</li>
									</ul>
								</div>
								<div className="u-custom-menu u-nav-container-collapse">
									<div className="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
										<div className="u-inner-container-layout u-sidenav-overflow">
											<div className="u-menu-close"></div>
											<ul className="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2">
												<li className="u-nav-item"><a className="u-button-style u-nav-link"
													href="Главная.html">Главная</a>
												</li>
												<li className="u-nav-item"><a className="u-button-style u-nav-link" href="О-нас.html">О нас</a>
												</li>
												<li className="u-nav-item"><a className="u-button-style u-nav-link"
													href="Регистрация.html">Регистрация</a>
												</li>
												<li className="u-nav-item"><a className="u-button-style u-nav-link" href="Вход.html">Вход</a>
												</li>
											</ul>
										</div>
									</div>
									<div className="u-black u-menu-overlay u-opacity u-opacity-70"></div>
								</div>
							</nav>
							<div className="u-list u-list-1">
								<div className="u-repeater u-repeater-1">
									<div className="u-container-style u-list-item u-repeater-item">
										<div className="u-container-layout u-similar-container u-valign-middle u-container-layout-1">
											<a href="https://nicepage.com/website-design"
												className="u-border-none u-btn u-button-style u-custom-font u-font-roboto-slab u-hover-black u-none u-text-hover-white u-btn-1">услуги</a>
										</div>
									</div>
									<div className="u-container-style u-list-item u-repeater-item">
										<div className="u-container-layout u-similar-container u-valign-middle u-container-layout-2">
											<a href="https://nicepage.com/website-design"
												className="u-border-none u-btn u-button-style u-custom-font u-font-roboto-slab u-hover-black u-none u-text-hover-white u-btn-2">цены</a>
										</div>
									</div>
									<div className="u-container-style u-list-item u-repeater-item">
										<div className="u-container-layout u-similar-container u-valign-middle u-container-layout-3">
											<a href="https://nicepage.com/website-design"
												className="u-border-none u-btn u-button-style u-custom-font u-font-roboto-slab u-hover-black u-none u-text-hover-white u-btn-3">Акции</a>
										</div>
									</div>
									<div className="u-container-style u-list-item u-repeater-item">
										<div className="u-container-layout u-similar-container u-valign-middle u-container-layout-4">
											<a href="Автопарк.html"
												className="u-border-none u-btn u-button-style u-custom-font u-font-roboto-slab u-hover-black u-none u-text-hover-white u-btn-4">Автопарк</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</header>
	
					<Outlet/>
					
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
	else
	{
		return (
			<>

					<header className="u-clearfix u-header u-sticky u-sticky-c8ea u-white u-header" id="sec-a202">
						<div className="u-clearfix u-sheet u-sheet-1">
							<a href="/" data-page-id="243706343" className="u-align-left u-image u-logo u-image-1"
								title="Blogistic" data-image-width="330" data-image-height="150">
								<img src="/images/horizontal_on_white_by_logaster.png" className="u-logo-image u-logo-image-1" alt='logo'/>
							</a>
							<nav className="u-menu u-menu-one-level u-offcanvas u-menu-1">
								<div className="menu-collapse" style={{'fontSize':'1rem','letterSpacing':'0px'}}>
									<a className="u-button-style u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
										href="/">
									</a>
								</div>
								<div className="u-custom-menu u-nav-container">
									<ul className="u-nav u-unstyled u-nav-1">
										<li className="u-nav-item"><a
											className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
											href="/" style={{padding: "10px 20px"}}>Главная</a>
										</li>
										<li className="u-nav-item"><a
											className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
											href="/AboutUs" style={{padding: "10px 20px"}}>О нас</a>
										</li>
										<li className="u-nav-item"><a
											className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
											href="/Contacts"style={{padding: "10px 20px"}}>Контакты</a>
										</li>
										<li className="u-nav-item"><a
											className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
											href="/Registration" style={{padding: "10px 20px"}}>Регистрация</a>
										</li>
										<li className="u-nav-item"><a
											className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
											href="/Profile" style={{padding: "10px 20px"}}>Профиль</a>
										</li>
										<li className="u-nav-item"><a
											className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
											href="/" onClick={logout} style={{padding: "10px 20px"}}>Выход</a>
										</li>
									</ul>
								</div>
								<div className="u-custom-menu u-nav-container-collapse">
									<div className="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
										<div className="u-inner-container-layout u-sidenav-overflow">
											<div className="u-menu-close"></div>
											<ul className="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2">
												<li className="u-nav-item"><a className="u-button-style u-nav-link"
													href="Главная.html">Главная</a>
												</li>
												<li className="u-nav-item"><a className="u-button-style u-nav-link" href="О-нас.html">О нас</a>
												</li>
												<li className="u-nav-item"><a className="u-button-style u-nav-link"
													href="Регистрация.html">Регистрация</a>
												</li>
												<li className="u-nav-item"><a className="u-button-style u-nav-link" href="/" onClick={logout}>Выход</a>
												</li>
											</ul>
										</div>
									</div>
									<div className="u-black u-menu-overlay u-opacity u-opacity-70"></div>
								</div>
							</nav>
							<div className="u-list u-list-1">
								<div className="u-repeater u-repeater-1">
									<div className="u-container-style u-list-item u-repeater-item">
										<div className="u-container-layout u-similar-container u-valign-middle u-container-layout-1">
											<a href="https://nicepage.com/website-design"
												className="u-border-none u-btn u-button-style u-custom-font u-font-roboto-slab u-hover-black u-none u-text-hover-white u-btn-1">услуги</a>
										</div>
									</div>
									<div className="u-container-style u-list-item u-repeater-item">
										<div className="u-container-layout u-similar-container u-valign-middle u-container-layout-2">
											<a href="https://nicepage.com/website-design"
												className="u-border-none u-btn u-button-style u-custom-font u-font-roboto-slab u-hover-black u-none u-text-hover-white u-btn-2">цены</a>
										</div>
									</div>
									<div className="u-container-style u-list-item u-repeater-item">
										<div className="u-container-layout u-similar-container u-valign-middle u-container-layout-3">
											<a href="https://nicepage.com/website-design"
												className="u-border-none u-btn u-button-style u-custom-font u-font-roboto-slab u-hover-black u-none u-text-hover-white u-btn-3">Акции</a>
										</div>
									</div>
									<div className="u-container-style u-list-item u-repeater-item">
										<div className="u-container-layout u-similar-container u-valign-middle u-container-layout-4">
											<a href="Автопарк.html"
												className="u-border-none u-btn u-button-style u-custom-font u-font-roboto-slab u-hover-black u-none u-text-hover-white u-btn-4">Автопарк</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</header>
	
					<Outlet/>
					
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