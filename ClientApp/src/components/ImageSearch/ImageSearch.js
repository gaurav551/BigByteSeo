import { Image } from 'antd';
import React,{useRef, useState} from 'react'
import Loading from '../UI/Loading';
import { openNotification } from '../UI/Notification';
import { Images } from './Images';

export const ImageSearch = () => {
    const inputRef = useRef('')
   
    const [imageResponse, setimageResponse] = useState({data:{},isLoading:false})
  //  alert(imageResponse.data)
  
    const searchHandler=()=>{
        const input = inputRef.current.value.trim()
        if(input.length<3)
        {
            return
        }
        const url = `https://api.unsplash.com/search/photos?query=${input}&client_id=${process.env.REACT_APP_UNSPLASHAPI_KEY}`

        setimageResponse({isLoading:true})
        //using fetch with promise instead of asyn fetch,
       
         fetch(url)
            .then(response => response.json())
            .then(responseData=> setimageResponse({data:responseData, isLoading:false}, (responseData.total===0 && 
                openNotification({type:'error',message:`Sorry pal, nothing found from your ${input}`,description:"Please try another keyword"})
                )))
            .catch(e=> setimageResponse({isLoading:false}, openNotification({type:'error',message:"There was an error " + e,description:""}) ))
          
            
        }
        console.log(imageResponse.data);
       
        let content = "";
       
        if(imageResponse.data && !Object.keys(imageResponse.data).length == 0)
        {
           
            content =   <div class="card-group"> <Image.PreviewGroup>{imageResponse.data.results.map(x=>  {return <Images src = {x.urls.regular} desc={x.description}/> })} </Image.PreviewGroup>  </div> //imageResponse.data.results.map(x=> {return <img src={x.urls.full}></img> })
           
        }
        
        
        

    
    

    return (
        <div>
              {imageResponse.isLoading && <Loading name='Please wait..'/>}
             <div className="form-group col-md-12" style={{paddingTop:'10px'}}>
              <input ref={inputRef} type="text" className="form-control" placeholder="Green Tea" required="required" style={{fontSize:'17px'}}/>
            
           </div>
           <div className="col mt-4">
              <button onClick={searchHandler} className="btn btn-primary" >Search Images</button>
            </div>
           
            {content}
        </div>
    )
}
