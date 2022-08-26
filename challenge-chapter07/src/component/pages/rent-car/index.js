import React, { useEffect, useState } from 'react';
import Banner from "../../shared/banner";
import axios from 'axios';
import moment from 'moment';

const RentCar = () => {
    const [cars, setCars] = useState([]);
    const [filterCar, setFilterCar] = useState({
        driver: '',
        tanggal: '',
        waktu: '',
        penumpang: 0
    });

    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json')
            .then(response => {
                setCars(response.data);
            }).catch(err => {
                console.error(err);
            });
    }, []);


    const getDriverType = (event) => {
        setFilterCar({
            driver: event.target.value
        });
    }

    const getDateRent = (event) => {
        setFilterCar((prevState) => ({
            ...prevState,
            tanggal: event.target.value
        }));
    }

    const getTimeRent = (event) => {
        setFilterCar((prevState) => ({
            ...prevState,
            waktu: event.target.value
        }));
    }

    const getPassengerCount = (event) => {
        setFilterCar((prevState) => ({
            ...prevState,
            penumpang: parseInt(event.target.value)
        }));
    }

    const doFilterCars = () => {
        const filteredCarsData = cars.filter((item) => item.capacity === filterCar.penumpang && moment(item.availableAt).format("L") == moment(filterCar.tanggal).format("L"));

        console.info(filteredCarsData);

        setCars(filteredCarsData);

        cars.forEach(val => {
            console.info("PARSED DATE ITEM : ", moment(val.availableAt).format("L"));
            console.info("PARSED DATE FILTER PARAM : ", moment(filterCar.tanggal).format("L"));
        })
    }

    return (
        <div>
            <Banner />
            {/* TODO: Filter data cars */}
            <div class="full bgblue">
                <div class="main row">
                    <div class="col-12 col-lg-6 "
                        style={{ marginTop: "auto", marginBottom: "auto" }}>
                        <div class="mainText ">
                            <h1 style={{ maxWidth: "568px" }}>Sewa & Rental Mobil Terbaik di kawasan Bali</h1>
                            <p style={{ maxWidth: "460px" }}>Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.</p>
                        </div>
                    </div>
                    <img class="carImage" src="/assets/mobil.png" alt="" />
                </div>
                <div class="blueBackground vw48 "></div>
                <div class="blueBackground vw90"></div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <label>Pilih tipe driper</label>
                    <select id="driver" onClick={event => getDriverType(event)}>
                        <option value="supir">Supir</option>
                        <option value="lepas_konci">Lepas konci</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label>Pilih tanggal pesan</label>
                    <input id="pesan" type="date" onChange={event => getDateRent(event)} />
                </div>
                <div class="col-md-3">
                    <label>Pilih waktu</label>
                    <select id="waktu" onClick={event => getTimeRent(event)}>
                        <option value="08.00">08.00 WIB</option>
                        <option value="09.00">09.00 WIB</option>
                        <option value="10.00">10.00 WIB</option>
                        <option value="11.00">11.00 WIB</option>
                        <option value="12.00">12.00 WIB</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label>Jumlah penumpang</label>
                    <input id="penumpang" type="number" onChange={event => getPassengerCount(event)} />
                </div>
            </div>
            <button type='button' class="btn btn-success" onClick={() => doFilterCars()}>Cari mobil</button>
            {/* Content */}
            <div id="kentang" class="kentang">
                {cars.map((value, index) => {
                    return <>
                        <div class="container">
                            <div class="col-md-4">
                                <div class="card" style={{ width: "18rem" }}>
                                    <img src="..." class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{value.model}/{value.type}</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                })}
            </div>

        </div>
    )
};

export default RentCar;