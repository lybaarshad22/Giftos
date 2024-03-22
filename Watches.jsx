import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Reviews = () => {
  const [watchImage , setWatchImages] = useState([]);
  const [pageno , setPageNo] = useState();
  const [totalpages, setTotalPages] = useState();

  useEffect(()=>{
    fetchCategoryWatch();
  } , []);

  useEffect(()=>{
    fetchCategoryWatch();
  } , [pageno]);

  const fetchCategoryWatch = async() => {
    try {
      let result = await fetch("http://localhost:4000/admin/product/category/watch/page", {
          method: 'post',
          body: JSON.stringify({pageno}),
          headers: {
              'Content-Type': 'application/json'
          },
      });

      if(result){
        result= await result.json();
        setWatchImages(result.productsOnPage);
        setTotalPages(result?.totalPages);
      }
  }


  catch(error){
    console.log("error occured");
  }

}

  const handlePage = (e)=>{
    setPageNo(e)
  }



  return (
    <>
    <div className='watch-wrapper'>

      <div className='watch-container theme-container'>
        <h2>Watches</h2>
        <div className='watches-div'>
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
     <div className='pagination-box'>
    {
    Array.from({ length: totalpages }, (_, i) => (
      <span onClick={()=>handlePage(i+1)} className='pageNo' key={i + 1}> {i + 1}</span>
    ))
  }
     
      
     </div>
      </div>

    </div>
    </>
  )
}

export default Reviews