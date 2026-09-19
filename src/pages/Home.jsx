import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustStats from '../components/TrustStats';
import Services from '../components/Services';

function Home() {
  return (
    <>
      <Navbar />

      <main>

        <Hero />

        <TrustStats />

        <Services />

      </main>
    </>
  );
}

export default Home;