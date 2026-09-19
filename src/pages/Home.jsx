import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustStats from '../components/TrustStats';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';

function Home() {
  return (
    <>
      <Navbar />

      <main>

        <Hero />

        <TrustStats />

        <Services />

        <WhyChooseUs/>

      </main>
    </>
  );
}

export default Home;