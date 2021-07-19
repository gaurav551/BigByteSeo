import { Alert } from 'antd'
import React,{useState,useEffect} from 'react'
import ContactForm from '../components/ContactForm'
import Loading from '../components/UI/Loading'
import { openNotification } from '../components/UI/Notification'




const Contact = () => {
  const [clearForm, setClearForm] = useState(false)
  const [status, setStatus] = useState({isSubmitting:false})
  const submitHandler = (contact) => {
    
    setStatus({isSubmitting:true});
    const api = 'api/href/contactus'
    fetch(api, {
      method: "POST",
      body : JSON.stringify(contact),
      headers:{
        "content-type" : "application/json"
      }
    }).then(async response => {
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson && await response.json();

      // check for error response
      if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
      }
      else
      {
        openNotification({type:'success',message:"Thank you, we will get back to you soon",description:""}) 
        setStatus({isSubmitting:false})  
        
        setClearForm(true)       

      }
      

     
  })
  .catch(error => {
     
    
     openNotification({type:'error',message:"There was an error " + error,description:""})    
     setStatus({isSubmitting:false})      

  });
    

    
   
    //alert(contact.firstName);
  }
 
 
 

  
  return ( 
   <React.Fragment>
     {status.isSubmitting && <Loading name="Please wait"/>}

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
            
              <ContactForm onSubmit={submitHandler} clear={clearForm} />
            </div>

          </div>

        </div>
      </div>
      <br>
      </br>
    </section>
    </React.Fragment>


  )
}
export default Contact
