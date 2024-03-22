import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllProducts = () => {

const [watchImage , setWatchImages] = useState();
const [perfumeImages , setPerfumeImages] = useState();

  const fetchCategoryWatch = () => {
    fetch("http://localhost:4000/admin/product/category/watch")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setWatchImages(data);
      
      })
  }

  const fetchCategoryPerfume = () => {
    fetch("http://localhost:4000/admin/product/category/perfume")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setPerfumeImages(data);
      
      })
  }

  useEffect(()=>{
    fetchCategoryWatch();
    fetchCategoryPerfume();
    
  }, []);
  console.log(watchImage);

  return (
    <>
    <div className='all-products-wrapper'>
      <div className='all-products-container'>
        <div className='category-watch'>
        <h2>Watches</h2>
        <div className='all-products'>
          {watchImage?.map((item)=>{
        return(
        <div className="products-div">
        <img src={`${process.env.REACT_APP_IMAGE_URL}${item?.image}`} />
        <span className="category-product-name">{item?.name}</span>
        <span className="category-product-price">${item?.price}</span>
        <Link className='purchase-btn' to={'/purchase/'+item._id}>Shop Now</Link> 
        </div> )
      })}

        </div>
        </div>

        
        <div className='category-perfume'>
        <h2>Perfumes</h2>
        <div className='all-products'>
          {perfumeImages?.map((item)=>{
        return(
        <div className="products-div">
        <img src={`${process.env.REACT_APP_IMAGE_URL}${item?.image}`} />
        <span className="category-product-name">{item?.name}</span>
        <span className="category-product-price">${item?.price}</span>
        <Link className='purchase-btn' to={'/purchase/'+item._id}>Shop Now</Link> 
        </div> )
      })}

        </div>
        </div>



      </div>
    </div>

    </>
  )
}

export default AllProducts