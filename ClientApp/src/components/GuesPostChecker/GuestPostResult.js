import React from 'react'

export const GuestPostResult = (props) => {
    return (
        <React.Fragment>
            <br></br>
            <h5>{props.result.filter((x) => x.isAvailable).length} out of {props.result.length} webiste has guest post availablility</h5>
            <div className="list-group">
            {props.result.map(x=>{ 
            let message = "Guest Posting";
            let availableUrl = ""
            let className = "list-group-item list-group-item-"

            //Check if Error 
            if(x.host === 'ERROR') 
            return <li key={x.key} className={className+'danger'}>Sorry something went wrong while trying to scan <a href={x.url}><b>{x.url}</b></a> </li>
           
            if(x.isAvailable)
            {
                message += " available"
                availableUrl = <a key={x.key} href={x.url}>at {x.url}</a>
                className += 'success'
            } 
            else
            {
                message += " not available"
                className += 'danger'
            }
            return <div> 
             
               
            <li key={x.key} className={className}>{message} on <a href={x.host}><b>{x.host}</b></a> <b>{availableUrl}</b></li>
            
            </div>
            })}


           </div>
        </React.Fragment>
    )
}
// {props.result.map(x=>{return <div> url {x.url} host {x.host} status {x.isAvailable}
