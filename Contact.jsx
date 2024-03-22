import React from 'react'

const Contact = () => {
  return (
    <>
    <div className='contact-us-wrapper theme-container'>
    <div className='contact-form-head'>
          <h1>Contact Us</h1>
        </div>
      <div className='contact-us-container'>
        <div className='contact-map'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.2574667665967!2d74.27280227470884!3d31.462102950020203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903d7b59c65d3%3A0x889b6f97bd1bb77!2sArhamsoft%20Pvt.%20Ltd.!5e0!3m2!1sen!2s!4v1693906851104!5m2!1sen!2s" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className='contact-form'>
        <form>
        <input type='text' placeholder='Name'/>
        <input type='text' placeholder='Email'/>
        <input type='text' placeholder='Message'/>
        <button className='send-btn'>Send</button>
        </form>
       
        </div>
      </div>

    </div>
    </>
  )
}

export default Contact