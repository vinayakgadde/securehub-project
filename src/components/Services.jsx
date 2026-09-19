function Services() {
  const services = [
    {
      number: '01',
      title: 'IT Infrastructure Management',
      description:
        'Keep your technology environment reliable, organized, and ready to support your business operations.',
      tag: 'INFRASTRUCTURE',
    },
    {
      number: '02',
      title: 'Cybersecurity',
      description:
        'Protect systems, applications, and business data with security-focused solutions and proactive monitoring.',
      tag: 'SECURITY',
    },
    {
      number: '03',
      title: 'Cloud Solutions',
      description:
        'Build flexible and scalable cloud environments that help your teams work efficiently from anywhere.',
      tag: 'CLOUD',
    },
    {
      number: '04',
      title: 'Backup & Disaster Recovery',
      description:
        'Protect critical business information and prepare your organization to recover quickly from unexpected disruptions.',
      tag: 'CONTINUITY',
    },
    {
      number: '05',
      title: 'IT Automation & Optimization',
      description:
        'Reduce repetitive work and improve operational efficiency through smarter technology processes.',
      tag: 'AUTOMATION',
    },
    {
      number: '06',
      title: 'Help Desk & Remote Support',
      description:
        'Get responsive technical assistance for everyday IT issues, troubleshooting, and user support.',
      tag: 'SUPPORT',
    },
  ];

  return (
    <section className="services-section" id="services">

      <div className="container">

        {/* Section Header */}
        <div className="row">

          <div className="col-lg-7">

            <div className="section-label">
              OUR SERVICES
            </div>

            <h2 className="section-title">
              Technology that works
              <span> for your business.</span>
            </h2>

          </div>

          <div className="col-lg-5">

            <p className="section-description">
              From day-to-day IT support to cybersecurity and cloud
              solutions, SecureHub helps businesses build a reliable
              technology foundation.
            </p>

          </div>

        </div>


        {/* Services Grid */}
        <div className="row g-4 mt-4">

          {services.map((service) => (

            <div
              className="col-md-6 col-lg-4"
              key={service.number}
            >

              <div className="service-card">

                <div className="service-card-top">

                  <span className="service-number">
                    {service.number}
                  </span>

                  <span className="service-tag">
                    {service.tag}
                  </span>

                </div>

                <div className="service-line"></div>

                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.description}
                </p>

                <a href="#contact" className="service-link">
                  Learn more
                  <span className="service-arrow">→</span>
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Services;