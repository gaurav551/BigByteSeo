import React, { useState, useEffect } from 'react'

const ContactForm = (props) => {
  const [contact, setContact] = useState({ firstName: "", lastName: "", email: "", phone: "", service: "", subject: "", message: "" })

  const handleInputChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  }
  const submitHandler = (e) => {
    e.preventDefault();
    
    props.onSubmit(contact);
   
    
    
  }
  //Runs effect fs props.clear is changed from parent component.
  //we only change props.clear once request is successfull
  useEffect(() => {
    setContact({ firstName: "", lastName: "", email: "", phone: "", service: "", subject: "", message: "" })
   
  }, [props.clear])
  return (
    <form onSubmit={submitHandler} className="row" >
      <div className="messages"></div>
      <div className="form-group col-md-6">
        <input id="form_name" type="text" onChange={handleInputChange} value={contact.firstName} name="firstName" className="form-control" placeholder="First Name" required="required" data-error="Name is required." />
        <div className="help-block with-errors"></div>
      </div>
      <div className="form-group col-md-6">
        <input id="form_name1" type="text" onChange={handleInputChange} value={contact.lastName} name="lastName" className="form-control" placeholder="Last Name" required="required" data-error="Name is required." />
        <div className="help-block with-errors"></div>
      </div>
      <div className="form-group col-md-6">
        <input id="form_email" type="email" onChange={handleInputChange} value={contact.email} name="email" className="form-control" placeholder="Email" required="required" data-error="Valid email is required." />
        <div className="help-block with-errors"></div>
      </div>
      <div className="form-group col-md-6">
        <input id="form_phone" type="tel" onChange={handleInputChange} value={contact.phone} name="phone" className="form-control" placeholder="Phone" required="required" data-error="Phone is required" />
        <div className="help-block with-errors"></div>
      </div>
      <div className="form-group col-md-6">
        <select className="form-control" name='service' onChange={handleInputChange} value={contact.service}>
          <option disabled defaultValue> Select Service</option>
          <option>Consulting</option>
          <option>Finance</option>
          <option>Marketing</option>
          <option>Avanced Analytics</option>
          <option>planning</option>
        </select>
      </div>
      <div className="form-group col-md-6">
        <input id="form_subject" type="tel" onChange={handleInputChange} value={contact.subject} name="subject" className="form-control" placeholder="Subject" required="required" data-error="Subject is required" />
        <div className="help-block with-errors"></div>
      </div>
      <div className="form-group col-md-12">
        <textarea id="form_message" name="message" onChange={handleInputChange} value={contact.message} className="form-control h-auto" placeholder="Message" rows="4" required="required" data-error="Please,leave us a message."></textarea>
        <div className="help-block with-errors"></div>
      </div>
      <div className="col mt-4">
        <button className="btn btn-primary">Send Messages</button>
      </div>
    </form>

  )
}
export default ContactForm
