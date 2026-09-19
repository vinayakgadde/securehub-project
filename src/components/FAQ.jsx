function FAQ() {
  const faqs = [
    {
      question: 'What does SecureHub IT Solutions provide?',
      answer:
        'SecureHub provides managed IT support, cybersecurity, cloud solutions, infrastructure management, backup and disaster recovery, automation, and remote technical support.',
    },
    {
      question: 'Can SecureHub support a small or growing business?',
      answer:
        'Yes. Our services can be structured around your current technology environment and adjusted as your users, systems, and business requirements grow.',
    },
    {
      question: 'Do you provide remote IT support?',
      answer:
        'Yes. Remote support can help troubleshoot user issues, applications, devices, connectivity, and other common IT problems without requiring an on-site visit.',
    },
    {
      question: 'How can SecureHub help improve cybersecurity?',
      answer:
        'We can help strengthen areas such as access control, endpoint security, monitoring, system configuration, security practices, and technology risk management.',
    },
    {
      question: 'Can you help with cloud migration?',
      answer:
        'Yes. We can help organizations plan and implement cloud environments based on their applications, infrastructure, users, security requirements, and business objectives.',
    },
    {
      question: 'How do we get started?',
      answer:
        'Start by contacting SecureHub and sharing your current IT challenges and requirements. We can then discuss your environment and identify the appropriate next steps.',
    },
  ];

  return (
    <section className="faq-section" id="faq">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-8 text-center">

            <div className="section-label">
              FAQ
            </div>

            <h2 className="faq-title">
              Questions?
              <span> We've got answers.</span>
            </h2>

            <p className="faq-description">
              Here are some common questions about our IT services
              and solutions.
            </p>

          </div>

        </div>


        <div className="row justify-content-center mt-5">

          <div className="col-lg-9">

            <div className="accordion faq-accordion" id="faqAccordion">

              {faqs.map((faq, index) => (

                <div
                  className="accordion-item faq-item"
                  key={index}
                >

                  <h2 className="accordion-header">

                    <button
                      className={`accordion-button ${
                        index !== 0 ? 'collapsed' : ''
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faq-${index}`}
                      aria-expanded={index === 0}
                      aria-controls={`faq-${index}`}
                    >
                      <span className="faq-number">
                        0{index + 1}
                      </span>

                      {faq.question}
                    </button>

                  </h2>

                  <div
                    id={`faq-${index}`}
                    className={`accordion-collapse collapse ${
                      index === 0 ? 'show' : ''
                    }`}
                    data-bs-parent="#faqAccordion"
                  >

                    <div className="accordion-body">
                      {faq.answer}
                    </div>

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

export default FAQ;