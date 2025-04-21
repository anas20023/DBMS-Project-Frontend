import Footer from "../components/Footer"
import HomeContent from "../components/HomeContent"
import Navbar from "../components/Navbar"

const Home = () => {
    return (
    <section className="w-full min-h-screen h-full dark:bg-slate-800" >
        <Navbar className />
        <HomeContent/>
        <Footer/>
    </section>)
}
export default Home