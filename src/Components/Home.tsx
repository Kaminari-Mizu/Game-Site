
import { Box } from "@mantine/core";
import Hero from "./Hero";
import Footer from "./Footer";
import About from "./About";
import Characters from "./Characters";
import Location from "./Location";
import Download from "./Download";


const Home: React.FC = () => {
    return (
        <Box>
            <Hero/>
            <About/>
            <Characters/>
            <Location/>
            <Download/>
            <Footer/>
        </Box>
    )
}

export default Home;