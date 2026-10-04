import { useState } from 'react';

import { submitContact } from '../api/client';
import { getVisitorId } from '../utils/visitor';
import './ContactForm.css';

const SERVICES = [
  'IT Infrastructure Management',
  'Cybersecurity',
  'Cloud Solutions',
  'Backup & Disaster Recovery',
  'IT Automation & Optimization',
  'Help Desk & Remote Support',
  'Other / Not sure yet',
];

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  company: '',
  serviceInterest: '',
  message: '',
  website: '', // honeypot - must stay empty
};

function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = 'Please enter your name';
  else if (values.name.trim().length > 100) errors.name = 'Name is too long';

  if (!values.email.trim()) errors.email = 'Please enter your email';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = 'Enter a valid email address';

  if (values.phone && !/^[0-9+()\-\s]+$/.test(values.phone))
    errors.phone = 'Enter a valid phone number';

  const msgLength = values.message.trim().length;
  if (msgLength < 10) errors.message = 'Please write at least 10 characters';
  else if (msgLength > 3000) errors.message = 'Message is too long (max 3000 characters)';

  return errors;
}

function ContactCTA() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [feedback, setFeedback] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('idle');
      setFeedback('');
      return;
    }

    setStatus('sending');
    setFeedback('');

    try {
      const data = await submitContact({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        company: values.company.trim(),
        serviceInterest: values.serviceInterest,
        message: values.message.trim(),
        website: values.website,
        visitorId: getVisitorId(),
      });

      setFeedback(data?.message || 'Thank you! We will get back to you shortly.');
      setValues(EMPTY_FORM);
      setErrors({});
      setStatus('success');
    } catch (error) {
      if (error.fieldErrors) setErrors(error.fieldErrors);
      setFeedback(error.message);
      setStatus('error');
    }
  };

  const fieldClass = (name) => `cf-input${errors[name] ? ' cf-input-error' : ''}`;

  return (
    <section className="contact-cta-section" id="contact">
      <div className="container">
        <div className="contact-cta">
          <div className="cta-glow cta-glow-one"></div>
          <div className="cta-glow cta-glow-two"></div>

          <div className="row align-items-center position-relative g-5">
            {/* Left: message */}
            <div className="col-lg-5">
              <div className="cta-label">READY TO IMPROVE YOUR IT?</div>

              <h2 className="cf-title">
                Let's build a more secure
                <span> technology environment.</span>
              </h2>

              <p>
                Tell us about your IT challenges and business requirements.
                Let's discuss how SecureHub can support your organization.
              </p>

              <div className="cf-alt">
                Prefer email?{' '}
                <a href="mailto:securehubitsolutions@gmail.com">
                  securehubitsolutions@gmail.com
                </a>
              </div>
            </div>

            {/* Right: form */}
            <div className="col-lg-7">
              {status === 'success' ? (
                <div className="cf-success" role="status">
                  <div className="cf-success-icon">✓</div>
                  <h3>Message sent</h3>
                  <p>{feedback}</p>
                  <button
                    type="button"
                    className="cf-reset"
                    onClick={() => {
                      setStatus('idle');
                      setFeedback('');
                    }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="cf-form" onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="cf-label" htmlFor="cf-name">
                        Full name *
                      </label>
                      <input
                        id="cf-name"
                        name="name"
                        type="text"
                        className={fieldClass('name')}
                        value={values.name}
                        onChange={handleChange}
                        autoComplete="name"
                        maxLength={100}
                        aria-invalid={!!errors.name}
                        placeholder="Your name"
                      />
                      {errors.name && <div className="cf-error">{errors.name}</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="cf-label" htmlFor="cf-email">
                        Email *
                      </label>
                      <input
                        id="cf-email"
                        name="email"
                        type="email"
                        className={fieldClass('email')}
                        value={values.email}
                        onChange={handleChange}
                        autoComplete="email"
                        maxLength={150}
                        aria-invalid={!!errors.email}
                        placeholder="you@company.com"
                      />
                      {errors.email && <div className="cf-error">{errors.email}</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="cf-label" htmlFor="cf-phone">
                        Phone
                      </label>
                      <input
                        id="cf-phone"
                        name="phone"
                        type="tel"
                        className={fieldClass('phone')}
                        value={values.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        maxLength={30}
                        aria-invalid={!!errors.phone}
                        placeholder="+91 00000 00000"
                      />
                      {errors.phone && <div className="cf-error">{errors.phone}</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="cf-label" htmlFor="cf-company">
                        Company
                      </label>
                      <input
                        id="cf-company"
                        name="company"
                        type="text"
                        className={fieldClass('company')}
                        value={values.company}
                        onChange={handleChange}
                        autoComplete="organization"
                        maxLength={150}
                        placeholder="Your company"
                      />
                    </div>

                    <div className="col-12">
                      <label className="cf-label" htmlFor="cf-service">
                        What do you need help with?
                      </label>
                      <select
                        id="cf-service"
                        name="serviceInterest"
                        className={fieldClass('serviceInterest')}
                        value={values.serviceInterest}
                        onChange={handleChange}
                      >
                        <option value="">Select a service (optional)</option>
                        {SERVICES.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="cf-label" htmlFor="cf-message">
                        Message *
                      </label>
                      <textarea
                        id="cf-message"
                        name="message"
                        rows={4}
                        className={fieldClass('message')}
                        value={values.message}
                        onChange={handleChange}
                        maxLength={3000}
                        aria-invalid={!!errors.message}
                        placeholder="Tell us about your IT requirements..."
                      />
                      {errors.message && <div className="cf-error">{errors.message}</div>}
                    </div>

                    {/* Honeypot: hidden from people, bots tend to fill it */}
                    <div className="cf-hp" aria-hidden="true">
                      <label htmlFor="cf-website">Website</label>
                      <input
                        id="cf-website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={values.website}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="cf-alert" role="alert">
                      {feedback}
                    </div>
                  )}

                  <div className="cf-actions">
                    <button
                      type="submit"
                      className="cta-button cf-submit"
                      disabled={status === 'sending'}
                    >
                      {status === 'sending' ? 'Sending...' : 'Talk to an IT Expert'}
                      <span>→</span>
                    </button>
                    <div className="cta-note">We usually reply within one business day.</div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;
