function Hero() {
  return (
    <section className="hero-section" id="home">

      <div className="container">
        <div className="row align-items-center">

          {/* Left Content */}
          <div className="col-lg-6">

            <div className="hero-badge">
              SMART IT. STRONGER BUSINESS.
            </div>

            <h1 className="hero-title">
              Secure IT.
              <br />
              <span>Smarter Business.</span>
            </h1>

            <p className="hero-description">
              Reliable IT solutions that keep your business secure,
              connected, and ready to grow. From managed IT support
              to cybersecurity and cloud solutions, we've got your
              technology covered.
            </p>

            <div className="hero-buttons">

              <a href="#services" className="btn hero-primary-btn">
                Explore Our Services
              </a>

              <a href="#contact" className="btn hero-secondary-btn">
                Talk to an IT Expert
              </a>

            </div>

            <div className="hero-trust">
              <span className="trust-dot"></span>
              Reliable IT support for growing businesses
            </div>

          </div>


          {/* Right Visual */}
          <div className="col-lg-6">

            <div className="hero-visual">

              {/* Main Circle */}
              <div className="hero-circle">

                <div className="hero-shield">
                  SH
                </div>

                <div className="hero-circle-text">
                  SECURE<br />
                  CONNECT<br />
                  EMPOWER
                </div>

              </div>


              {/* Cybersecurity Card */}
              <div className="floating-card floating-card-one">

                <div className="floating-icon">
                  ✓
                </div>

                <div>
                  <strong>Cybersecurity</strong>
                  <small>Protected & monitored</small>
                </div>

              </div>


              {/* Cloud Card */}
              <div className="floating-card floating-card-two">

                <div className="floating-icon">
                  ☁
                </div>

                <div>
                  <strong>Cloud Services</strong>
                  <small>Flexible & scalable</small>
                </div>

              </div>


              {/* Support Card */}
              <div className="floating-card floating-card-three">

                <div className="support-number">
                  24/7
                </div>

                <div>
                  <strong>IT Support</strong>
                  <small>When you need us</small>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}

export default Hero;