import React from 'react'
import ContactForm from '../components/ContactForm'


const Contact = () => {
    const submitHandler = () =>{
        alert('Hey');
    }
    return (
       
             <section className="py-0">
                 <br></br>
  <div>
    <div className="row">
      <div className="col-12 col-lg-12">
        <div>
          <div>
            <h2><span className="font-w-4 d-block">Describe your project</span> and
leave us your contact info</h2>
            <p className="lead">Get in touch and let us know how we can help.</p>
          </div>
          <ContactForm onSubmit={submitHandler}/>   
        </div>
         
      </div>
     
    </div>
  </div>
  <br>
</br>
</section>

      
    )
}
export default Contact
