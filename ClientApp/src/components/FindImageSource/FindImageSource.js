import React,{useRef, useState} from 'react'
import Loading from '../UI/Loading';
import { openNotification } from '../UI/Notification';


const FindImageSource = () => {
    const inputRef = useRef('');
    const [result, setresult] = useState([])
    const [response, setresponse] = useState({requesting:false})

  
    const searchHandler = async()=>{
      setresult([]);
      
      setresponse({requesting:true});
        let word = inputRef.current.value
           const url = `api/href/findimagelink/?word=${word}`;
           try{
    const apiResponse = await fetch(url)
    if(!apiResponse.ok)
    throw new Error("Error");
           
         
    const apiData = await apiResponse.json()
    setresult(apiData.slice(1));
    setresponse({requesting:false});
    console.log(apiData);
           }  catch(error)
           {
              setresponse({requesting:false})
              openNotification({type:'error',message:"OOPS",description:"Sorry pal, something must have gone wrong"})          

           }
  
    }
   
   
    return (
        <React.Fragment>
        {response.requesting? <Loading name="Scanning"/> : ""}
                    <div className="form-group col-md-12" style={{paddingTop:'10px'}}>
        <input ref={inputRef} type="text" className="form-control" placeholder="Enter something" required="required" style={{fontSize:'17px'}}/>
        {/* <p style={{color:"red"}}>Error</p> */}
     </div>
     <div className="col mt-4">
        <button onClick={searchHandler} className="btn btn-primary" >Search Image Source</button>
      </div>
      <br></br>
       {result.length>0 &&  <ul class="list-group"> <p>Showing {result.length} results</p>
         {result.map(x=> {return <li key={x.key} class="list-group-item"> <h4>{x.title}</h4> <a target='_blank' href={x.href}>{x.href}</a> </li>
 })}
  </ul>
}
      </React.Fragment>
    )
}
export default FindImageSource
