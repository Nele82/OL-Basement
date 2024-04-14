import { useDispatch } from 'react-redux'
import { logout } from '../slices/AuthSlice'

export const useLogout = () => {
    const dispatch = useDispatch()

    const logoutUser = () => {
      // remove user from storage
      localStorage.removeItem('user')

      // dispatch logout action
      dispatch(logout())
  }

  return { logoutUser }
}


