function Footer() {
  const services = [
    'Managed IT Services',
    'Cybersecurity',
    'Cloud Solutions',
    'IT Infrastructure',
    'Backup & Disaster Recovery',
  ];

  return (
    <footer className="site-footer">

      <div className="container">

        <div className="row g-5">

          {/* Company */}
          <div className="col-lg-4 col-md-6">

            <a href="#home" className="footer-logo-link">

              <img
                src="/img/securehub-white-logo.png"
                alt="SecureHub IT Solutions"
                className="footer-logo"
              />

            </a>

            <p className="footer-description">
              SecureHub IT Solutions helps businesses build secure,
              reliable, and scalable technology environments through
              managed IT, cybersecurity, cloud, and infrastructure
              solutions.
            </p>

            <div className="footer-status">

              <span className="footer-status-dot"></span>

              Technology you can rely on.

            </div>

          </div>


          {/* Quick Links */}
          <div className="col-6 col-lg-2 col-md-3">

            <h3 className="footer-heading">
              Quick Links
            </h3>

            <ul className="footer-links">

              <li>
                <a href="#home">Home</a>
              </li>

              <li>
                <a href="#services">Services</a>
              </li>

              <li>
                <a href="#solutions">Solutions</a>
              </li>

              <li>
                <a href="#about">About Us</a>
              </li>

              <li>
                <a href="#faq">FAQ</a>
              </li>

            </ul>

          </div>


          {/* Services */}
          <div className="col-6 col-lg-3 col-md-3">

            <h3 className="footer-heading">
              Services
            </h3>

            <ul className="footer-links">

              {services.map((service) => (

                <li key={service}>
                  <a href="#services">
                    {service}
                  </a>
                </li>

              ))}

            </ul>

          </div>


          {/* Contact */}
          <div className="col-lg-3 col-md-6">

            <h3 className="footer-heading">
              Get in Touch
            </h3>

            <div className="footer-contact">

              <div className="footer-contact-item">

                <span className="footer-contact-label">
                  Email
                </span>

                <a href="mailto:info@securehubitsolutions.com">
                  info@securehubitsolutions.com
                </a>

              </div>


              <div className="footer-contact-item">

                <span className="footer-contact-label">
                  Phone
                </span>

                <a href="tel:+910000000000">
                  +91 00000 00000
                </a>

              </div>


              <div className="footer-contact-item">

                <span className="footer-contact-label">
                  Availability
                </span>

                <span>
                  Remote IT Support
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* Bottom */}
        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} SecureHub IT Solutions.
            All rights reserved.
          </p>

          <div className="footer-bottom-links">

            <a href="#home">
              Privacy Policy
            </a>

            <a href="#home">
              Terms of Service
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;