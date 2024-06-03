import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PasswordReset = () => {
    const [newPassword, setNewPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [token, setToken] = useState(null)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [searchParams, setSearchParams] = useSearchParams()

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
            setError('Error: Both password fields are required. Please enter your password.')
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
            const response = await fetch('http://localhost:3500/user/resetPassword', {
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
    }, [])

  return (
    <form 
        className='password-reset display-f fd-c'
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
                backgroundColor: theme ? 'black' : 'rgb(255, 255, 255)',
                color: theme ? 'rgb(255, 255, 255)' : 'black' 
            }}
        >
            Submit
        </button>
        {error && <div className='display-f fd-c ai-c p-1 bd-black mt-2 mb-3 fsz-5' style={{border: theme ? '2px dotted white' : null}}><div className='fsz-10'>&#9888;</div> {error}</div>}
        {success && <span>{success}</span>}
    </form>
  )
}

export default PasswordReset