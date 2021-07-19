import React,{useRef, useState} from 'react'
import {urlToHost} from '../../functions/stringHelper';
import Loading from '../UI/Loading';
import { openNotification } from '../UI/Notification';
import { GuestPostResult } from './GuestPostResult';


const CheckGuestPostForm = () => {
    const textInput = useRef('');
    const fileInput = useRef(null);
    const [submiting, setsubmiting] = useState(false)
    const [apiResponse, setApiResponse] = useState({ result: [], gotResponse: false })
    const [errorMessage, seterrorMessage] = useState("")
    const submitHandler = (e)=>{
        e.preventDefault();
      
        const enteredText = textInput.current.value;
       

        const data = fileInput.current.files[0];
        if (enteredText.length === 0 && data === undefined) {
          openNotification({type:'error',message:"OOPS",description:"Please Input Something"})          

          return;
        }
        if (enteredText.length > 0 && data != null) {
          
          openNotification({type:'error',message:"OOPS",description:"Please input only one"})          

          return;
        }
        handleSubmission(enteredText, data);
    //     setTimeout(function(){
    //         setStatus({loading:false});
    //         openNotification({type:'success', message:"Cool", desciption:"good job guys"});
    //    }.bind(this),2000); 
     }
     
    const handleSubmission = async (enteredText, data) => {
       
      
   
        setsubmiting(true);
        var formdata = new FormData();
        formdata.append("fileInput", data);
        formdata.append("TextAreaInput", enteredText);
        try {
          const f = await fetch("/api/href/getlinks", {
            method: 'POST',
            body: formdata
          })
          const resultFromApi = await f.json();
          if(!f.ok){
            throw new Error("SUCKED")
          }
          setApiResponse({ result: resultFromApi, gotResponse: true })
          console.log(apiResponse.result);
          setsubmiting(false)
          
        } catch (error) {
          //alert("Soory pal, something must have gone wrong")
          openNotification({type:'error',message:"OOPS",description:"Sorry pal, something must have gone wrong"})          
          setsubmiting(false)
    
          
        }
       }
      // log()
       let content = "";
    
        if(apiResponse.gotResponse)
        {
          content = <GuestPostResult result={apiResponse.result} />
        }
       
      
   
    
    return (
        <React.Fragment>
          
        <label className="text-black mb-3"><b>Enter urls or Upload excel file to check guest post availability</b></label>
        
        <form onSubmit={submitHandler}>
        <div className="input-group">
          <textarea ref={textInput} style={{resize:'both', overflow:'auto',height:'100px'}} className="form-control" id="c-code" placeholder="Enter Multiple URL in new line" rows="4" />
        
        </div>
        <br></br>
        <div className="input-group mb-3">
  <input type="file" ref={fileInput} className="form-control h-auto" accept="application/vnd.ms-excel" />
  <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
</div>
           {submiting &&  <Loading  name="Scanning"/>}
        <br></br>
        <button disabled={submiting} className="btn btn-dark mt-3 mt-md-0" type="submit" id="button-addon2"><span>Check Now</span>
            </button>
        </form>
        {content}
       
        
        </React.Fragment>
    )
}
export default CheckGuestPostForm
