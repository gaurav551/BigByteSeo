import React from 'react'
import {Howl} from 'howler'
import {
   
    NotificationTwoTone 
  } from '@ant-design/icons';

const DictionaryResult = (props) => {

    const soundPlay = (src)=>{
        const sound = new Howl({
            src,
            html5:true

        })
        sound.play()
    }


    
    try{

    return (
        <React.Fragment>
            <br></br>
            <h3>Word : {props.data[0].word}</h3>
        <ol className="list-group list-group-numbered">
           <h3>{props.data[0].phonetics[0].text}  <button className='btn btn-primary' onClick={()=>soundPlay(props.data[0].phonetics[0].audio)}><NotificationTwoTone /></button> </h3>
         
       

           {props.data.map(x=>{ return <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{x.word}</div>
                    {x.meanings.map(m=> {
                        return <div>{m.partOfSpeech} {m.definitions.map(x=> {
                              return <div> <span className='fw-bold'> Definition : </span> {x.definition} {x.example!=null && <div> <span className="fw-bold">Example : </span> {x.example} </div> }  </div>})} </div> })}
                </div>
                <span className="badge bg-primary rounded-pill">14</span>
            </li>
           })}
           
        </ol>
        </React.Fragment>
    )
        }
        catch(Exception)
        {
           
                return <div class="alert alert-danger" role="alert">
               Sorry pal, we couldn't find definitions for the word you were looking for.
              </div>

                
            
        }
}
export default DictionaryResult;
// {meaning.response && meaning.data.map(x=>{return <div><p>{x.word} </p> {x.meanings.map(m=> {return <div><p>{m.partOfSpeech}</p> {m.definitions.map(x=> {return <p>{x.definition}</p>})} </div> })} </div>})}
