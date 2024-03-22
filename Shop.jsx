import React, { useEffect, useState } from 'react'
import logo from './../../src/images/logo.png';
import { Link } from 'react-router-dom';

const Shop = ({UpdatedOrderAfterDeletion}) => {
  const [total , setTotal] = useState();
  const [quantity, setQuantity] = useState(0);
  const [orders , setOrders] = useState();




useEffect(()=>{
  UpdatedOrders();
},[]);

  useEffect(()=>{
    UpdatedOrders();
  },[orders]);


  const UpdatedOrders =()=>{
    let orderedItems = JSON.parse(localStorage.getItem('orders'));
    setOrders(orderedItems);
    let calculatedTotal =0;
    for(var i=0 ; i<orderedItems?.length ; i++){
      calculatedTotal+=orderedItems[i].subtotal;
    }
    setTotal(calculatedTotal);
  }


  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleEdit = (id , price)=>{
   const updateOrder =  JSON.parse(localStorage.getItem('orders'));
    for(var i =0; i <updateOrder.length ; i++){
      if(updateOrder[i]?.productId == id){
        updateOrder[i].quantity=quantity;
        updateOrder[i].subtotal = (quantity*price);
      }
     localStorage.setItem('orders' , JSON.stringify(updateOrder));
   let orderedItems = JSON.parse(localStorage.getItem('orders'));
     setOrders(orderedItems);
    }

  }

  const handleDelete = (id)=>{
    const deleteOrder =  JSON.parse(localStorage.getItem('orders'));
    const updatedOrder = deleteOrder.filter(order=> order.productId !== id);
    console.log(updatedOrder);
      localStorage.setItem('orders' , JSON.stringify(updatedOrder));
      let orderedItems = JSON.parse(localStorage.getItem('orders'));
        setOrders(orderedItems);
        UpdatedOrderAfterDeletion();
       }
      
  

  return (
    <>
    <section>

      <div className='cart-wrapper'>
        <div className='cart-container'>
        <div className="nav-menu">
            <div className="logo">
              <img src={logo} width={70} height={70}/>
            </div>
            <div className='search-bar'>
            <input type='text' placeholder='Enter to search product'/>
            <button className='search-btn'> Search</button>
            </div>
          </div>
          <div className='order-wrapper'>
          {orders?.map((item)=>{
              return(
            <div className='order-container'> 
           <div className='order-img'>
          <img src={`${process.env.REACT_APP_IMAGE_URL}${item?.image}`}/>
           </div>
           <div className='order-des'>
            <ul>
              <li> <span>Name</span>{item?.name}</li>
              <li> <span>Price</span>${item?.price}</li>
              <li> <span>Quantity </span>{item?.quantity}

             <select onChange={handleChange}>
              <option value=""></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>

          </li>
              
              <li> <span>Subtotal</span>${item?.subtotal}</li>
            </ul>
          
            <button className='delete-btn' onClick={()=>handleDelete(item?.productId)} >Delete</button>
            <button className='edit-btn' onClick={()=>{handleEdit(item?.productId , item?.price)}}>Update</button>
           </div>
           </div>   
            )})}
            <hr/>
            <div className='totalbill-container'>
                <span>Total Amount = {total}</span>
            </div>
            <div className='checkout-div'>
                <Link to='/checkout'>Checkout</Link>
                <Link to='/home'>Continue Shopping</Link>
            </div>
            
            
          </div>
          

        </div>

      </div>
    </section>
    </>
  )
}

export default Shop