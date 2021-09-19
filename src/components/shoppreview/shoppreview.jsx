import React from 'react';
import "./shoppreview.scss";
import Shopitem from '../shop-item/shopitem'

function Shoppreview({title , items}) {
    return (
        <div className='collection-preview'>
             <h1 className="title">{title.toUpperCase()}</h1>
              <div className="preview" >
                  {items.filter( (item , id) => id< 4)
                  .map(item => (
                     <Shopitem key={item.id} item={item}/>
                  ))}
              </div>
        </div>
    )
}

export default Shoppreview;
