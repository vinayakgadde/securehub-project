import Navbar from '../components/Navbar';

function Home() {
  return (
    <>
      <Navbar />

      <main id="home">

        <section className="py-5">
          <div className="container py-5">

            <h1 className="display-4 fw-bold">
              SecureHub IT Solutions
            </h1>

            <p className="lead mt-3">
              Managed IT Services, Cybersecurity & Cloud Solutions
            </p>

          </div>
        </section>

      </main>
    </>
  );
}

export default Home;