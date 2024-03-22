import React, { useEffect } from "react";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import banner from "../images/banner.jpg";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Contact from "./Contact";


const Home = () => {
  const [index, setIndex] = useState(0);
  const [images , setImages] = useState();
  const navigate = useNavigate();

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  
  const fetchProductData = () => {
    fetch("http://localhost:4000/admin/product/list")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setImages(data);
      
      })
  }

  const handleShow = ()=>{
    navigate('/allproduct');
  }
  
  useEffect(()=>{
    const auth = JSON.parse(localStorage.getItem('user'));
    if(auth?.success){
      navigate('/home');
      fetchProductData();
    }
    else{
      navigate('/login');
    }
  }, []);

  return (
    <>
      <section>
        <div className="banner-wrapper theme-container">
          <div className="banner-container">
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <img src={banner} className="banner-img" />
                <Carousel.Caption>
                  <p className="banner-des">Welcome Shopping</p>
                  <Button> <Link to="/shop">Buy Now</Link>  </Button>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={banner} className="banner-img" />
                <Carousel.Caption>
                  <p className="banner-des">Welcome Shopping</p>
                  <Button> <Link to="/shop">Buy Now</Link>  </Button>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={banner} className="banner-img" />
                <Carousel.Caption>
                  <p className="banner-des">Welcome Shopping</p>
                  <Button> <Link to="/shop">Buy Now</Link>  </Button>
                </Carousel.Caption>

              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </section>

    <section>
    <div className="products-wrapper">
      <h1 className="product-display-head">Latest Products</h1>
    <div className="products-container" >
      {images?.map((item)=>{
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
    </section>
   <Contact/>
    </>
  );
};

export default Home;
