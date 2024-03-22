import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import ShoppingDetails from './ShoppingDetails';
import { useEffect } from 'react';


const CheckOut = () => {
  const [ email , setEmail] = useState();
  const [ country , setCountry] = useState();
  const [ fname, setFname] = useState();
  const [lname , setLname] = useState();
  const [adress , setAdress] = useState();
  const [city , setCity] = useState();
  const [postalcode , setPostalCode] = useState();
  const [phone , setPhone] = useState();
  const [total , setTotal] = useState();
  const [data , setData] = useState();
  const [products , setProducts] = useState();
  const [user , setUser] = useState();
  const [paymentMethod, setPaymentMethod] = useState(""); 

  

  useEffect(()=>{
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
   let calculatedTotal =0;
   for(var i=0 ; i<orders?.length ; i++){
     calculatedTotal+=orders[i].subtotal;
   }
   setTotal(calculatedTotal);
   const products = JSON.parse(localStorage.getItem('orders'));
   setProducts(products);
   const user = JSON.parse(localStorage.getItem('loggedIn'));
   const user_id = user?.user?._id;
   setUser(user_id);
    
},[]);

const handlePlaceOrder = async ()=>{

  const adressDetails ={email, country , fname , lname , adress , city , postalcode , phone ,paymentMethod };
  console.log(adressDetails);

  try {
    let result = await fetch('http://localhost:4000/user/order/cart/add', {
        method: 'post',
        body: JSON.stringify({products , adressDetails , user , total}),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if(result){
      let data= await result.json();
      setData(data);
    }
    else{
      console.log("not found");
    }

}

   catch (error) {
    console.log('An error occurred', error);
}

}





  return (

    <>
    <div className='checkout-wrapper'>
    <div className='checkout-head'>
      <h1>Payment Details</h1>
      </div>
    <div className='checkout-container'>
    
      <div className='shipping-form'>
      <form>
      <label>Email</label>
      <input onChange={(e)=>{setEmail(e.target.value)}} type='text'  placeholder='Email'/>
      <h5>Shipping Adress</h5>
      <label>Country</label>
      <input onChange={(e)=>{setCountry(e.target.value)}} type='text' placeholder='Country'/>
      <label>First Name</label>
      <input  onChange={(e)=>{setFname(e.target.value)}} type='text' placeholder='First Name'/>
      <label>Last Name</label>
      <input  onChange={(e)=>{setLname(e.target.value)}} type='text' placeholder='Last Name'/>
      <label>Adress</label>
      <input onChange={(e)=>{setAdress(e.target.value)}} type='text' placeholder='Adress'/>
      <label>City</label>
      <input onChange={(e)=>{setCity(e.target.value)}} type='text' placeholder='City'/>
      <label>Postal Code</label>
      <input onChange={(e)=>{setPostalCode(e.target.value)}} type='text' placeholder='Postal Code'/>
      <label type='phone'>Phone</label>
      <input onChange={(e)=>{setPhone(e.target.value)}} type='text' placeholder='Phone #'/>

      </form>
      <div className='radio-btn'>
        <input
        type="radio"
        value="cod"
        name="payment"
        onChange={(e) => setPaymentMethod(e.target.value)}
        checked={paymentMethod === "cod"}
      />
      <label>COD</label>
        <input
        type="radio"
        value="card"
        name="payment"
        onChange={(e) => setPaymentMethod(e.target.value)}
        checked={paymentMethod === "card"} 
      />
      <label>Card</label>

      </div>
      <button onClick={handlePlaceOrder}>Place Order</button>
      {data?.success ? <span>{data?.message}</span> : <span>{data?.message}</span>}
      </div>
      <ShoppingDetails/>
    </div>
    </div>
    </>
  )
}

export default CheckOut