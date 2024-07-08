import { useState } from "react";

interface FormValues {
  fullname: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const initialFormValues: FormValues = { fullname: "", email: "", message: "" };
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<Partial<FormValues>>({});
  const [submit, setSubmit] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleValidation = (values: FormValues): Partial<FormValues> => {
    const errors: Partial<FormValues> = {};
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const numberRegex = /\d/;

    if (!values.fullname) {
      errors.fullname = "Enter your full name";
    } else if (numberRegex.test(values.fullname)) {
      errors.fullname = "Full name can't contain numbers";
    }

    if (!values.email) {
      errors.email = "Enter your email";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.message) {
      errors.message = "Message field can't be empty";
    } else if (values.message.length < 10) {
      errors.message = "Message should contain at least 10 characters";
    }

    return errors;
  }

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = handleValidation(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setSubmit(true);
      setFormValues(initialFormValues);
    }
  }

  return (
    <section className="contact-us-form">
      {submit ?
        <section className="form-success">
          <h3>Message successfully sent!</h3>
          <p>I will get back to you as soon as possible!</p>
          <button type="button" onClick={() => setSubmit(false)}>Send again</button>
        </section>
        :
        <form className="contact-form form-tag" onSubmit={submitForm}>
          <section className="contact-form-item">
            <input
              onChange={handleChange}
              value={formValues.fullname}
              className="fullname-input"
              type="text"
              placeholder="Full name"
              name="fullname"
            />
            <br />
            <label className="fullname-error">{formErrors.fullname}</label>
          </section>
          <section className="contact-form-item">
            <input
              onChange={handleChange}
              value={formValues.email}
              name="email"
              className="email-input"
              type="text"
              placeholder="Email"
            />
            <br />
            <label className="email-error">{formErrors.email}</label>
          </section>
          <section className="contact-form-item">
            <textarea
              onChange={handleChange}
              value={formValues.message}
              name="message"
              className="textarea-input"
              placeholder="Message"
            />
            <br />
            <label className="textarea-error">{formErrors.message}</label>
          </section>
          <section className="contact-form-item">
            <button type="submit">Send</button>
            <br />
          </section>
        </form>
      }
    </section>
  );
}

export default ContactForm;
