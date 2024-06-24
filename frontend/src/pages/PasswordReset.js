import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadBar, removeLoadBar } from '../hooks/useLoader'
import { setLoadingMsg } from '../slices/LoadingSlice'

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
    const dispatch = useDispatch()
    const theme = useSelector(state => state.theme.value)
    const httpInput = useSelector(state => state.httpAddress.value)

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

        // Displays Loading message
        dispatch(setLoadingMsg('PASSWORD RESET IN PROGRESS . . . .'))
        loadBar()

        // Response time variables
        let startTime = new Date()
        let responseTime = null

        if(token) {
            // 'httpInput' reducer holds the http address (no endpoint as it doesn't change) for 
            // deployment or production (whichever is set by the Developer inside it's Redux slice) 
            // for the backend
            const response = await fetch(`${httpInput}/user/resetPassword`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ token, newPassword })
              })
              const json = await response.json() 
          
              if (!response.ok) {
                // Response time calculation
                responseTime = new Date() - startTime

                // Removes Loading message after 2 seconds or longer
                if (responseTime < 2000) {
                    setTimeout(() => {
                    removeLoadBar()
                    }, 2000)
                } else {
                    removeLoadBar()
                }
                console.log(json.message)
                setError(json.message)
              }
          
              if (response.ok) { 
                // Response time calculation
                responseTime = new Date() - startTime

                // Removes Loading message after 2 seconds or longer
                if (responseTime < 2000) {
                    setTimeout(() => {
                    removeLoadBar()
                    }, 2000)
                } else {
                    removeLoadBar()
                }     
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