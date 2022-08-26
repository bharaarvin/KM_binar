import React, {useEffect} from 'react';
import {Image } from 'react-bootstrap';
const Banner = () => {

    return (
        <div>
            {/* <!-- Navigation Bar --> */}
            <nav className="full bgblue">
                <div className="inContent">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid ">
                            <a href="#/" className="navbar-brand">
                                <div className="logo"></div>
                            </a>
                            <button className="navbar-toggler navbar-toggler-icon" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#navbarNavAltMarkup" style={{border: 0}}></button>
                            <div className="offcanvas offcanvas-end" id="navbarNavAltMarkup">
                                <div className="offcanvas-header">
                                    <h5 id="offcanvasRightLabel"><b>BCR</b></h5>
                                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                                        aria-label="Close"></button>
                                </div>
                                <div className="navbar-nav" style={{columnGap: "32px", rowGap: "16px"}}>
                                    <a className="nav-link active" href="#OurServices">Our Services</a>
                                    <a className="nav-link active" href="#WhyUs">Why Us</a>
                                    <a className="nav-link active" href="#Testimonial">Testimonial</a>
                                    <a className="nav-link active" href="#FAQ">FAQ</a>
                                    <button className="nav-link btnRegister" id="btn">Register</button>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </nav>

            {/* <!-- Main --> */}

            <section>
                <div className="full bgblue">
                    <div className="main row">
                        <div className="col-12 col-lg-6 " style={{marginTop: "auto", marginBottom: "auto"}}>
                            <div className="mainText ">
                                <h1 style={{maxWidth: "568px"}}>Sewa & Rental Mobil Terbaik di kawasan Bali</h1>
                                <p style={{maxWidth: "460px"}}>Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas terbaik
                                    dengan harga terjangkau. Selalu
                                    siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.</p>
                                <a href="/sewa">
                                    <button id="btn">Mulai Sewa Mobil</button>
                                </a>
                            </div>
                        </div>
                        <img className="carImage" src="/assets/img_car.png" alt="" />
                    </div>
                    <div className="blueBackground vw48 "></div>
                    <div className="blueBackground vw90"></div>
                </div>
            </section>

        </div>
    );
}

export default Banner;