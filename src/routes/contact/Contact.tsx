import { useEffect } from "react";
import { Footer } from "../../components";
import { data } from "../../assets/constants";
// import ContactForm from "./ContactForm";

const Contact = () => {
  const email = data.email;
  const phoneNumber = data.phone;
  useEffect(() => {
    document.title = "Contact | Mario Vargas";
  })
  return (
    <article className="contact-main">
      <h2 className="title-font blue-text h2-tag">Contact Me</h2>
      <p className="white-text p-tag">
        Looking to collaborate on an exciting project or explore new opportunities? I'm always open to engaging with innovative projects and new challenges in web development. Feel free to reach out to me for inquiries, collaborations, or any questions you may have!
      </p>
      {/* <ContactForm /> */}
      <div className='contact-me'>
        <div className='contact-info'>
          <div>
            <h3>Email</h3>
            <p>You can reach me via email at <a href={`mailto:${email}`}>{email}</a></p>
          </div>
          <div>
            <h3>Phone</h3>
            <p>For phone inquiries, please contact me at <a href={`tel:${phoneNumber}`}>{phoneNumber}</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </article>
  );
};

export default Contact;
