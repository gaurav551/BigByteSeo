import React,{useState, useRef} from 'react'
import Loading from '../UI/Loading'
import DictionaryResult from './DictionaryResult'



const Dictionary = () => {
    const inputRef = useRef('')
    const [meaning, setmeaning] = useState({data:[], response:false, submitting:false})
    //Using state for this input we can also use Ref;
    // const [text, settext] = useState("")
    // const onTextChange = (e)=>
    // {
    //   //  alert()
    //     settext(e.target.value)
    // }
    const searchHandler = () => {
        const input = inputRef.current.value
        if(!input.length>0)
        {
            return;
        }
        setmeaning({submitting:true})
        searchWord(input)
        
    }
    
    const searchWord = async(word)=>{
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/'+word
    const apiResponse = await fetch(url)
    const apiData = await apiResponse.json()
    console.log(apiData);
    setmeaning({data:apiData, response:true, submitting:false});
    }

    let results = "";
    if(meaning.response)
    {
        results =  <DictionaryResult data={meaning.data}/>
    }
    let loading = "";
    if(meaning.submitting)
    {
        loading = <Loading/>
    }
    

    return (
        <React.Fragment>
             {loading}
           
          
          <div className="form-group col-md-12" style={{paddingTop:'10px'}}>
              <input ref={inputRef} type="text" className="form-control" placeholder="Search Word" required="required" style={{fontSize:'17px'}}/>
              {/* <p style={{color:"red"}}>Error</p> */}
           </div>
           <div className="col mt-4">
              <button onClick={searchHandler} className="btn btn-primary" >Search Word</button>
            </div>

            {results}
           

        </React.Fragment>
    )
}
export default Dictionary
