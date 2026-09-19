function WhyChooseUs() {
  const benefits = [
    {
      number: '01',
      title: 'Proactive IT Management',
      description:
        'Identify technology issues early and keep your systems running reliably.',
    },
    {
      number: '02',
      title: 'Security First',
      description:
        'Build security into your infrastructure, applications, devices, and everyday operations.',
    },
    {
      number: '03',
      title: 'Responsive Support',
      description:
        'Get practical technical assistance when your team needs help solving IT problems.',
    },
    {
      number: '04',
      title: 'Business-Focused Solutions',
      description:
        'Technology recommendations designed around your business goals, users, and growth.',
    },
  ];

  return (
    <section className="why-section" id="about">

      <div className="container">

        <div className="row align-items-center g-5">

          {/* Left Visual */}
          <div className="col-lg-5">

            <div className="why-visual">

              <div className="why-grid"></div>

              <div className="why-center">

                <div className="why-shield">
                  SH
                </div>

                <div className="why-center-title">
                  SECUREHUB
                </div>

                <div className="why-center-subtitle">
                  IT SOLUTIONS
                </div>

              </div>


              <div className="why-orbit why-orbit-one"></div>
              <div className="why-orbit why-orbit-two"></div>

              <div className="why-status-card">

                <span className="status-dot"></span>

                <div>
                  <strong>IT Environment</strong>
                  <small>Actively protected</small>
                </div>

              </div>

            </div>

          </div>


          {/* Right Content */}
          <div className="col-lg-7">

            <div className="section-label">
              WHY SECUREHUB
            </div>

            <h2 className="why-title">
              More than IT support.
              <br />
              <span>A technology partner.</span>
            </h2>

            <p className="why-description">
              Your technology should help your business move forward,
              not slow it down. SecureHub combines reliable IT support,
              security, and modern infrastructure to create a stronger
              technology foundation for your organization.
            </p>


            <div className="benefits-list">

              {benefits.map((benefit) => (

                <div
                  className="benefit-item"
                  key={benefit.number}
                >

                  <div className="benefit-number">
                    {benefit.number}
                  </div>

                  <div className="benefit-content">

                    <h3>
                      {benefit.title}
                    </h3>

                    <p>
                      {benefit.description}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;