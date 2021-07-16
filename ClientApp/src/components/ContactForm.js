import React from 'react'

const ContactForm = (props) => {
    const submitHandler = (e)=>{
        e.preventDefault();
            props.onSubmit();
    }
    return (
        <form onSubmit={submitHandler} class="row" >
            <div class="messages"></div>
            <div class="form-group col-md-6">
              <input id="form_name" type="text" name="name" class="form-control" placeholder="First Name" required="required" data-error="Name is required."/>
              <div class="help-block with-errors"></div>
            </div>
            <div class="form-group col-md-6">
              <input id="form_name1" type="text" name="name" class="form-control" placeholder="Last Name" required="required" data-error="Name is required."/>
              <div class="help-block with-errors"></div>
            </div>
            <div class="form-group col-md-6">
              <input id="form_email" type="email" name="email" class="form-control" placeholder="Email" required="required" data-error="Valid email is required."/>
              <div class="help-block with-errors"></div>
            </div>
            <div class="form-group col-md-6">
              <input id="form_phone" type="tel" name="phone" class="form-control" placeholder="Phone" required="required" data-error="Phone is required"/>
              <div class="help-block with-errors"></div>
            </div>
            <div class="form-group col-md-6">
              <select class="form-control">
                <option>- Select Service</option>
                <option>Consulting</option>
                <option>Finance</option>
                <option>Marketing</option>
                <option>Avanced Analytics</option>
                <option>planning</option>
              </select>
            </div>
            <div class="form-group col-md-6">
              <input id="form_subject" type="tel" name="subject" class="form-control" placeholder="Subject" required="required" data-error="Subject is required"/>
              <div class="help-block with-errors"></div>
            </div>
            <div class="form-group col-md-12">
              <textarea id="form_message" name="message" class="form-control h-auto" placeholder="Message" rows="4" required="required" data-error="Please,leave us a message."></textarea>
              <div class="help-block with-errors"></div>
            </div>
            <div class="col mt-4">
              <button class="btn btn-primary">Send Messages</button>
            </div>
            </form>
     
    )
}
export default ContactForm
