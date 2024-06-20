import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PasswordReset = () => {
    const [newPassword, setNewPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [token, setToken] = useState(null)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const resetPageRef = useRef()

    const navigate = useNavigate()
    // Redux
    const theme = useSelector(state => state.theme.value)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const passRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/
        // Password may contain the following: one lowercase letter, one uppercase letter, one digit (0-9) and one special 
        // character from the !@#$% set and needs to be between 8 and 20 characters long
        const testPass = passRegExp.test(newPassword)


        if(!newPassword || !confirm) {
            setError('ERROR: Both password fields are required. Please enter your password.')
            return
        }

        if(!testPass) {
            setError('ERROR: Password may contain the following: one lowercase letter, one uppercase letter, one digit (0-9) and one special character from the !@#$% set and needs to be between 8 and 20 characters long')
            return
        }

        if(testPass && newPassword !== confirm) {
            setError('ERROR: The passwords you provided don’t match. Please enter them again.')
            return
        }

        if(token) {
            // const response = await fetch('http://localhost:3500/user/resetPassword', {
            const response = await fetch('https://ol-basement.onrender.com/user/resetPassword', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ token, newPassword })
              })
              const json = await response.json() 
          
              if (!response.ok) {
                console.log(json.message)
                setError(json.message)
              }
          
              if (response.ok) {      
                console.log(json.message)
                setSuccess(json.message)
                setTimeout(() => {
                    navigate('/login')
                }, 5000)
              } 
        }
    }

    useEffect(()=>{
        setToken(searchParams.get('token'))
        resetPageRef.current.focus()
    }, [])

  return (
    <form 
        className='password-reset col-12-xs col-10-sm col-11-md col-9-lg col-5-xl display-f fd-c ml-a mr-a'
        onSubmit={handleSubmit}
    >
        <h3>Set New Password:</h3>
        <label htmlFor="pass">
            Password:
        </label>
        <input
            type="password"
            id="pass"
            onChange={(e)=>{
                setNewPassword(e.target.value)
            }}
            onClick={()=>{
                setError('')
            }}
            style={{ 
                backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
                color: theme ? 'rgb(255, 255, 255)' : 'black' 
            }}
            ref={resetPageRef}
        />
        <label htmlFor="confirmPass">
            Confirm Password:
        </label>
        <input
            type="password"
            id="confirmPass"
            onChange={(e)=>{
                setConfirm(e.target.value)
            }}
            onClick={()=>{
                setError('')
            }}
            style={{ 
                backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
                color: theme ? 'rgb(255, 255, 255)' : 'black' 
            }}
        />
        <button 
            type="submit"
            style={{ 
                backgroundColor: theme ? 'black' : 'rgb(238, 238, 238)',
                color: theme ? 'rgb(238, 238, 238)' : 'black' 
              }}
        >
            Submit
        </button>
        {error && <div className='display-f fd-c ai-c p-1 bd-black mt-1 mb-1' style={{border: theme ? '2px dotted white' : null}}><div>&#9888;</div> {error}</div>}
        {success && <span>{success}</span>}
    </form>
  )
}

export default PasswordReset