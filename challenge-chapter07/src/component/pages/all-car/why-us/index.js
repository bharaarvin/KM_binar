const WhyUs = () => {
    return (
        <div>
            <div class="inContent">
                <div class="text-center text-lg-start mb-4">
                    <h2>Why Us?</h2>
                    <p>Mengapa harus pilih Binar Car Rental?</p>
            </div>
            <div class="row" style={{rowGap: "16px"}}>
                <div class="col-12 col-md-3">
                    <div class="card whyUsCard col">
                        <img class="icon32" src="/assets/icon_complete.svg" alt="complete icon" />
                            <h3>Mobil Lengkap</h3>
                            <p>Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan terawat</p>
                    </div>
                </div>
                <div class="col-12 col-md-3">
                    <div class="card whyUsCard col">
                        <img class="icon32" src="/assets/icon_price.svg" alt="complete icon" />
                            <h3>Harga Murah</h3>
                            <p>Harga murah dan bersaing, bisa bandingkan harga kami dengan rental mobil lain</p>
                    </div>
                </div>
                <div class="col-12 col-md-3">
                    <div class="card whyUsCard col">
                        <img class="icon32" src="/assets/icon_24hrs.svg" alt="complete icon" />
                            <h3>Layanan 24 Jam</h3>
                            <p>Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami juga tersedia di akhir minggu</p>
                    </div>
                </div>
                <div class="col-12 col-md-3">
                    <div class="card whyUsCard col">
                        <img class="icon32" src="/assets/icon_professional.svg" alt="complete icon" />
                            <h3>Sopir Profesional</h3>
                            <p>Sopir yang profesional, berpengalaman, jujur, ramah dan selalu tepat waktu</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default WhyUs;