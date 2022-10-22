import React from "react";

class Main extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  };
	}

	render() {
			return (
                <section className="u-clearfix u-section-1" id="sec-f50d">
                <title>Главная</title>
                <div className="u-clearfix u-sheet u-valign-top u-sheet-1">
                    <div className="u-carousel u-expanded-width u-gallery u-gallery-slider u-layout-carousel u-lightbox u-no-transition u-show-text-on-hover u-gallery-1"
                        data-interval="5000" data-u-ride="carousel" id="carousel-083d">
                        <ol className="u-absolute-hcenter u-carousel-indicators u-carousel-indicators-1">
                            <li data-u-target="#carousel-083d" data-u-slide-to="0" className="u-active u-grey-70 u-shape-circle"
                                style={{width: '10px', height: '10px'}}></li>
                            <li data-u-target="#carousel-083d" data-u-slide-to="1" className="u-grey-70 u-shape-circle"
                                style={{width: '10px', height: '10px'}}></li>
                        </ol>
                        <div className="u-carousel-inner u-gallery-inner" role="listbox">
                            <div className="u-active u-carousel-item u-effect-fade u-gallery-item u-carousel-item-1">
                                <div className="u-back-slide" data-image-width="1180" data-image-height="740">
                                    <img className="u-back-image u-expanded" src="images/log1.jpg" alt="descri"></img>
                                </div>
                                <div className="u-align-center u-over-slide u-shading u-valign-bottom u-over-slide-1">
                                </div>
                            </div>
                            <div className="u-carousel-item u-effect-fade u-gallery-item u-carousel-item-2">
                                <div className="u-back-slide" data-image-width="1080" data-image-height="500">
                                    <img className="u-back-image u-expanded" src="images/log2.jpg" alt=""></img>
                                </div>
                                <div className="u-align-center u-over-slide u-shading u-valign-bottom u-over-slide-2">
                                </div>
                            </div>
                        </div>
                        <a className="u-absolute-vcenter u-carousel-control u-carousel-control-prev u-grey-70 u-icon-circle u-opacity u-opacity-70 u-spacing-10 u-text-white u-carousel-control-1"
                            href="#carousel-083d" role="button" data-u-slide="prev">
                            <span aria-hidden="true">
                                <svg viewBox="0 0 451.847 451.847">
                                    <path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0
        c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744
        c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"></path>
                                </svg>
                            </span>
                            <span className="sr-only">
                                <svg viewBox="0 0 451.847 451.847">
                                    <path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0
        c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744
        c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"></path>
                                </svg>
                            </span>
                        </a>
                        <a className="u-absolute-vcenter u-carousel-control u-carousel-control-next u-grey-70 u-icon-circle u-opacity u-opacity-70 u-spacing-10 u-text-white u-carousel-control-2"
                            href="#carousel-083d" role="button" data-u-slide="next">
                            <span aria-hidden="true">
                                <svg viewBox="0 0 451.846 451.847">
                                    <path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744
        L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284
        c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"></path>
                                </svg>
                            </span>
                            <span className="sr-only">
                                <svg viewBox="0 0 451.846 451.847">
                                    <path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744
        L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284
        c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"></path>
                                </svg>
                            </span>
                        </a>
                    </div>
                    <h2 className="u-align-center u-text u-text-1">Отследить заказ<br></br>
                    </h2>
                    <div className="u-expanded-width-xs u-form u-form-1">
                        <form action="//publish.nicepage.com/Form/Process" method="POST"
                            className="u-clearfix u-form-horizontal u-form-spacing-15 u-inner-form" style={{padding: '15px'}}
                            source="email">
                            <div className="u-form-group u-form-name u-label-none">
                                <label for="name-ef64" className="u-label">Name</label>
                                <input type="text" placeholder="Номер заказа" id="name-ef64" name="name"
                                    className="u-border-1 u-border-grey-30 u-input u-input-rectangle" required=""></input>
                            </div>
                            <div className="u-form-group u-form-submit">
                                <a href="/search" className="u-btn u-btn-round u-btn-submit u-button-style u-radius-15">Найти</a>
                                <input type="submit" value="submit" className="u-form-control-hidden"></input>
                            </div>
                            <div className="u-form-send-message u-form-send-success">#FormSendSuccess</div>
                            <div className="u-form-send-error u-form-send-message">#FormSendError</div>
                            <input type="hidden" value="" name="recaptchaResponse"></input>
                        </form>
                    </div>
                </div>
            </section>
        
            
			);
	}
	};
export default Main;

