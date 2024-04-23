export const timeOut = () => {
  let difference

    if(localStorage.length > 0) {
      const timestamp = JSON.parse(localStorage.getItem('time'))
      const date = new Date().toISOString()
      difference = Math.abs(Date.parse(timestamp) - Date.parse(date))
    }

    return difference
}
