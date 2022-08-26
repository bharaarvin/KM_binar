import Banner from "../../shared/banner";
import CtaBanner from "./cta-banner";
import Faq from "./faq";
import OurService from "./our-service";
import Testimoni from "./testimoni";
import WhyUs from "./why-us";

const AllCar = () => {
    return(
        <div>
            <Banner />
            <OurService />
            <WhyUs />
            <Testimoni />
            <CtaBanner />
            <Faq />
        </div>
    )
};

export default AllCar;