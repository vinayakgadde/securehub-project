function Process() {
  const steps = [
    {
      number: '01',
      title: 'Assess',
      description:
        'We understand your current IT environment, challenges, security requirements, and business goals.',
    },
    {
      number: '02',
      title: 'Plan',
      description:
        'We create a practical technology roadmap based on your infrastructure, users, priorities, and budget.',
    },
    {
      number: '03',
      title: 'Implement',
      description:
        'Our team deploys and configures the required solutions while keeping business disruption to a minimum.',
    },
    {
      number: '04',
      title: 'Support',
      description:
        'We continuously support, monitor, maintain, and improve your technology environment as your business grows.',
    },
  ];

  return (
    <section className="process-section" id="solutions">

      <div className="container">

        {/* Header */}
        <div className="row justify-content-center text-center">

          <div className="col-lg-8">

            <div className="section-label">
              OUR APPROACH
            </div>

            <h2 className="process-title">
              Simple process.
              <span> Smarter IT.</span>
            </h2>

            <p className="process-description">
              We make IT easier to manage by following a clear,
              structured approach from the first conversation to
              ongoing support.
            </p>

          </div>

        </div>


        {/* Process Steps */}
        <div className="process-wrapper">

          <div className="process-line"></div>

          <div className="row g-4">

            {steps.map((step, index) => (

              <div
                className="col-md-6 col-lg-3"
                key={step.number}
              >

                <div className="process-card">

                  <div className="process-number">
                    {step.number}
                  </div>

                  <div className="process-dot"></div>

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.description}
                  </p>

                  {index < steps.length - 1 && (
                    <div className="process-arrow">
                      →
                    </div>
                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

export default Process;