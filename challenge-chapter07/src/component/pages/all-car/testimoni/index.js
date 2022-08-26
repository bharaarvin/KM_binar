const Testimoni = () => {
    return (
        <>
            <div style={{textAlign: "center"}}>
                <h2>Testimonial</h2>
                <p>Berbagai review positif dari para pelanggan kami</p>
                <div className="owl-carousel" style={{height: "max-content"}}>
                    <div className="testiCard bgblue d-flex flex-column flex-md-row">
                        <div>
                            <img className="img80" src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="profilepic1" />
                        </div>
                        <div style={{textAlign: "start"}}>
                            <div className="starTesti">
                                <img src="/assets/Star.svg" alt="star" />
                                <img src="/assets/Star.svg" alt="star" />
                                <img src="/assets/Star.svg" alt="star" />
                                <img src="/assets/Star.svg" alt="star" />
                                <img src="/assets/Star.svg" alt="star" />
                            </div>
                            <p style={{maxWidth: "410px"}}>
                                If you're considering a car rental in Bali, you should give us a call. Binar Car Rental is the most reliable and affordable rental service in the area, with a variety of cars to choose from to suit your needs.
                            </p>
                            <p style={{fontWeight: "600"}}>Sebastian Dough</p>
                        </div>
                    </div>
                    <div className="testiCard bgblue d-flex flex-column flex-md-row">
                        <div>
                            <img className="img80" src="https://images.unsplash.com/photo-1584999734482-0361aecad844?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="profilepic1" />
                        </div>
                        <div style={{textAlign: "start"}}>
                            <div className="starTesti">
                                <img src="/assets/Star.svg" alt="star" />
                                <img src="/assets/Star.svg" alt="star" />
                                <img src="/assets/Star.svg" alt="star" />
                                <img src="/assets/Star.svg" alt="star" />
                                <img src="/assets/Star.svg" alt="star" />
                            </div>
                            <p style={{maxWidth: "410px"}}>
                                Don't let the distance stop you from exploring Bali. Rent a car with us and enjoy a liberating vacation without worrying about public transport. We have cars in your budget, from small to big, to suit your needs. We offer quality
                                cars with competitive rates that are guaranteed to make your holiday the best it can be. Valid for both return and one-way rentals.
                            </p>
                            <p style={{fontWeight: "600"}}>Steve Freeman</p>
                        </div>
                    </div>
                    <div className="testiCard bgblue d-flex flex-column flex-md-row">
                        <div>
                            <img className="img80" src="https://images.unsplash.com/photo-1518577915332-c2a19f149a75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=562&q=80" alt="profilepic1" />
                        </div>
                        <div style={{textAlign: "start"}}>
                            <div className="starTesti">
                                <img src="/assets/Star.svg" alt="star" />
                                <img src="/assets/Star.svg" alt="star" />
                                <img src="/assets/Star.svg" alt="star" />
                                <img src="/assets/Star.svg" alt="star" />
                                <img src="/assets/Star.svg" alt="star" />
                            </div>
                            <p style={{maxWidth: "410px"}}>
                                You can leave your car rental worries behind. Binar Car Rental takes care of every single detail so you can enjoy your vacation. We offer affordable prices, worry-free insurance, and flexible terms. You don't have to worry about a
                                thing, because we'll do the worrying for you!
                            </p>
                            <p style={{fontWeight: "600"}}>Angeline Carla</p>
                        </div>
                    </div>
                    <div className="testiCard bgblue d-flex flex-column flex-md-row">
                        <div>
                            <img className="img80" src="https://images.unsplash.com/photo-1486302913014-862923f5fd48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="profilepic1" />
                        </div>
                        <div style={{textAlign: "start"}}>
                            <div className="starTesti">
                                <img src="/assets/Star.svg" alt="star" />
                                <img src="/assets/Star.svg" alt="star" />
                                <img src="/assets/Star.svg" alt="star" />
                                <img src="/assets/Star.svg" alt="star" />
                                <img src="/assets/Star.svg" alt="star" />
                            </div>
                            <p style={{maxWidth: "410px"}}>
                                Binar Car Rental is known for its excellence and reliability in car rental services. The team's dedication and commitment to delivering the best customer experience possible has turned Binar into a trusted and reliable option for
                                car rental in Indonesia.
                            </p>
                            <p style={{fontWeight: 600}}>Diana Maria</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Testimoni;