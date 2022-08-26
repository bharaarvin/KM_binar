import { Image } from 'react-bootstrap';
const OurService = () => {
    return (
        <div>
            <section id="OurServices">
                <div class="inContentServices row">
                    <div class="col-12 col-lg-6">
                        <div class="oursImgUp">
                            <img class="oursImg" src="/assets/model1.png" alt="Our Services" />
                        </div>
                    </div>
                    <div class="col-12 col-lg-6">
                        <h2>Best Car Rental for any kind of trip in Bali!</h2>
                        <p>Sewa mobil di (Lokasimu) bersama Binar Car Rental jaminan harga lebih murah dibandingkan yang lain, kondisi
                            mobil baru, serta kualitas pelayanan terbaik untuk perjalanan wisata, bisnis, wedding, meeting, dll.</p>
                        <ul>
                            <li>
                                <img class="icon24" src="/assets/icon_checklist.svg" alt="check" />
                                <p>Sewa Mobil Dengan Supir di Bali 12 Jam</p>
                            </li>
                            <li>
                                <img class="icon24" src="/assets/icon_checklist.svg" alt="check" />
                                <p>Sewa Mobil Lepas Kunci di Bali 24 Jam</p>
                            </li>
                            <li>
                                <img class="icon24" src="/assets/icon_checklist.svg" alt="check" />
                                <p>Sewa Mobil Jangka Panjang Bulanan</p>
                            </li>
                            <li>
                                <img class="icon24" src="/assets/icon_checklist.svg" alt="check" />
                                <p>Gratis Antar - Jemput Mobil di Bandara</p>
                            </li>
                            <li>
                                <img class="icon24" src="/assets/icon_checklist.svg" alt="check" />
                                <p>Layanan Airport Transfer / Drop In Out</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default OurService;