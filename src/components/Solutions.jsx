function Solutions() {
  const solutions = [
    {
      number: '01',
      title: 'Cybersecurity',
      description:
        'Protect your business with security-focused infrastructure, access controls, monitoring, and proactive risk management.',
      points: [
        'Security monitoring',
        'Identity & access management',
        'Endpoint protection',
      ],
      className: 'solution-security',
    },
    {
      number: '02',
      title: 'Cloud Solutions',
      description:
        'Build flexible cloud environments that improve accessibility, scalability, collaboration, and operational efficiency.',
      points: [
        'Cloud infrastructure',
        'Cloud migration',
        'Scalable environments',
      ],
      className: 'solution-cloud',
    },
    {
      number: '03',
      title: 'IT Infrastructure',
      description:
        'Create a stable technology foundation with reliable networks, systems, devices, and infrastructure management.',
      points: [
        'Network management',
        'Server & systems support',
        'Infrastructure monitoring',
      ],
      className: 'solution-infrastructure',
    },
  ];

  return (
   <section className="solutions-section" id="solutions">

      <div className="container">

        {/* Header */}
        <div className="row align-items-end">

          <div className="col-lg-7">

            <div className="section-label">
              TECHNOLOGY SOLUTIONS
            </div>

            <h2 className="solutions-title">
              Build a stronger
              <span> technology foundation.</span>
            </h2>

          </div>

          <div className="col-lg-5">

            <p className="solutions-description">
              SecureHub brings infrastructure, security, and cloud
              technologies together to create a reliable environment
              for modern businesses.
            </p>

          </div>

        </div>


        {/* Solution Cards */}
        <div className="row g-4 mt-4">

          {solutions.map((solution) => (

            <div
              className="col-lg-4"
              key={solution.number}
            >

              <div
                className={`solution-card ${solution.className}`}
              >

                <div className="solution-card-header">

                  <span className="solution-number">
                    {solution.number}
                  </span>

                  <span className="solution-status">
                    ● ACTIVE
                  </span>

                </div>


                {/* Visual */}
                <div className="solution-visual">

                  <div className="solution-ring solution-ring-one"></div>

                  <div className="solution-ring solution-ring-two"></div>

                  <div className="solution-core">
                    <span>
                      {solution.number}
                    </span>
                  </div>

                </div>


                <h3>
                  {solution.title}
                </h3>

                <p>
                  {solution.description}
                </p>


                <div className="solution-points">

                  {solution.points.map((point) => (

                    <div
                      className="solution-point"
                      key={point}
                    >

                      <span className="point-check">
                        ✓
                      </span>

                      {point}

                    </div>

                  ))}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Solutions;