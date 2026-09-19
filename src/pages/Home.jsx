import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustStats from '../components/TrustStats';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Process from '../components/Process';
import Solutions from '../components/Solutions';
import FAQ from '../components/FAQ';
import ContactCTA from '../components/ContactCTA';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <Navbar />

      <main>

        <Hero />

        <TrustStats />

        <Services />

        <WhyChooseUs />

        <Process />

        <Solutions />

        <FAQ />

        <ContactCTA />

      </main>

      <Footer />

    </>
  );
}

export default Home;