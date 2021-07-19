import { Image } from 'antd'
import React from 'react'

export const Images = ({src,desc}) => {
    return (
       <div className='col-sm-4'>
        <div class="card">
        <Image  src={src}/>
          {
              desc!=null &&
          
          <div class="card-footer">
            <small class="text-muted">{desc}</small>
          </div>
          }
        </div>
        </div>
        
    )
}
