import React, { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { useSelector } from 'react-redux'

const Contact = () => {  
  const nameRef = useRef()
  const emailRef = useRef()
  const messageRef = useRef()
  const formRef = useRef()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)
  // Redux
  const theme = useSelector(state => state.theme.value)

  const name_RegExp = /^[A-z][A-z0-9-_ ]{3,30}$/
  // The 'name' input may contain the following:
  // - A string that starts with an uppercase or lowercase letter followed by 3 to 30 characters that can be 
  // uppercase or lowercase letters, numbers, hyphens (-), underscores (_), or spaces.
  const email_RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ 
  // The 'email' input may contain the following:
  // - Local part (part before '@'): one or more characters that are letters 
  // (both uppercase and lowercase), digits, dots, underscores, percent signs, 
  // plus signs, or hyphens
  // - Domain (part after '@'): one or more characters that are letters (both uppercase 
  // and lowercase), digits, dots, or hyphens
  // - Top level domain (part after '.'): two or more letters for the top-level domain (like .com, .org, etc.)
  const message_RegExp = /^[\s\S]{20,1000}$/
  // Matches any character including whitespace (\s) and non-whitespace (\S) (input length: 20-1000)

  const sendEmail = (e) => {
      e.preventDefault()
      const testName = name_RegExp.test(name)
      const testEmail = email_RegExp.test(email) 
      const testMessage = message_RegExp.test(message) 

      if(!name || !email || !message) {
        setError('All fields are required!')
        return
      }
      if(!testName) {
        setError('Your name must be between 4 and 30 characters long and may include uppercase or lowercase letters, numbers, hyphens (-), underscores (_), or spaces')
        return
      }
      if(!testEmail) {
        setError(`Your email should contain the following: LOCAL PART (part before '@'): should contain one or more characters that are letters 
        (both uppercase and lowercase), digits, dots, underscores, percent signs, plus signs, or hyphens; DOMAIN (part after '@'): should contain one 
        or more characters that are letters (both uppercase and lowercase), digits, dots, or hyphens; TOP LEVEL DOMAIN (part after '.'): should contain
        two or more letters for the top-level domain (like .com, .org, etc.)`)
        return
      }
      if(!testMessage) {
        setError(`Your message must be between 20 and 1000 characters long`)
        return
      }
      emailjs.sendForm('ol_basement', 'ol_basement_form', formRef.current, {
        publicKey: '9VL1mCqQXBK0rmWMN',
      })
      .then(() => {
        alert('Your message has been sent')
      }, (error) => {
        alert(`We're sorry, but your message could not be sent (Error: ${error}). Please check your internet connection and try again later.`)
      })
      setName('')
      setEmail('')
      setMessage('')
      nameRef.current.value = ''
      emailRef.current.value = ''
      messageRef.current.value = ''
  }
  
  useEffect(()=>{
    nameRef.current.focus()
  }, [])

  return (
    <form 
      id='app-contact-form'
      className='app-contact-page display-f fd-c'
      onSubmit={sendEmail}
      ref={formRef}
    >
      <h3>Your Thoughts Matter - Drop Us a Line!</h3>
      <input 
        type="hidden" 
        name="to_name"
        value='Nebojsa'
      />
      <input 
        type="hidden" 
        name="contact_number"
        value={Math.random() * 100000 | 0}
      />
      <label>Name</label>
      <input 
        type="text" 
        name="from_name" 
        ref={nameRef}
        onClick={()=>{
          setError(null)         
        }}
        onChange={(e)=>{
          setName(e.target.value)
        }}
        style={{ 
          backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
          color: theme ? 'rgb(255, 255, 255)' : 'black' 
        }}
      />
      <label>Email</label>
      <input 
        type="email" 
        name="user_email" 
        ref={emailRef}
        onClick={()=>{
          setError(null)        
        }}
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
        style={{ 
          backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
          color: theme ? 'rgb(255, 255, 255)' : 'black' 
        }}
      />
      <label>Message</label>
      <textarea 
        name="message" 
        ref={messageRef}
        onClick={()=>{
          setError(null)         
        }}
        onChange={(e)=>{
          setMessage(e.target.value)
        }}
        style={{ 
          backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
          color: theme ? 'rgb(255, 255, 255)' : 'black' 
        }}
      />
      <input 
        type="submit" 
        value="Send" 
        style={{ 
          backgroundColor: theme ? 'black' : 'rgb(238, 238, 238)',
          color: theme ? 'rgb(238, 238, 238)' : 'black' 
        }}
      />
      {error && <div className='display-f fd-c ai-c p-2 bd-black mt-2 mb-3' style={{border: theme ? '2px dotted white' : null}}><p className='fsz-8'>&#9888;</p> {error}</div>}
    </form>
  )
}

export default Contact