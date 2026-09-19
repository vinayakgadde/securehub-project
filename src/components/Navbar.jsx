function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white">
      <div className="container">

        {/* Logo */}
      <a className="navbar-brand" href="/">
  <img
    src="/img/securehub-logo1.png"
    alt="SecureHub IT Solutions"
    className="securehub-logo"
  />
</a>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation */}
        <div
          className="collapse navbar-collapse"
          id="mainNavbar"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <a className="nav-link active" href="#home">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#services">
                Services
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#solutions">
                Solutions
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#about">
                About Us
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#faq">
                FAQ
              </a>
            </li>

            <li className="nav-item ms-lg-3">
              <a
                className="btn btn-primary contact-btn"
                href="#contact"
              >
                Contact Us
              </a>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;