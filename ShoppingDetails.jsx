import React, { useEffect } from 'react'
import { useState } from 'react';

const ShoppingDetails = () => {
    const [display , setDisplay] = useState([]);
    const [total , setTotal] = useState();


    useEffect(()=>{
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        setDisplay(orders);
       let calculatedTotal =0;
       for(var i=0 ; i<orders?.length ; i++){
         calculatedTotal+=orders[i].subtotal;
       }
       setTotal(calculatedTotal);
        
    },[]);
    


  return (
    <>
     <div className='shopping-detail-container'>
    <div className='display-wrapper'>
          {display.map((item)=>{
              return(
            <div className='display-container'> 
           <div className='display-img'>
          <img src={`${process.env.REACT_APP_IMAGE_URL}${item?.image}`}/>
          <span className='quantity'>{item?.quantity} </span>
           </div>
           <div className='display-des'>
            <ul>
              <li> Name <span>{item?.name}</span></li>
              <li>Price <span>${item?.price}</span></li>
              <li>Subtotal <span>${item?.subtotal}</span></li>
            </ul>
          
            
           </div>
           </div>   
            )})}
            <hr/>
 
          </div>
          <div className='bill-on-checkout'>
                <span>Total Amount = <span className='total-amount'> {total} </span></span>
            </div>

    </div> 
    </>
  )
}

export default ShoppingDetails