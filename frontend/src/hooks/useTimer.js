export const timeUpToHour = () => {
  let lessThenHour
  let difference

    if(localStorage.length > 0) {
      const timestamp = JSON.parse(localStorage.getItem('time'))
      const date = new Date().toISOString()
      difference = Date.parse(date) - Date.parse(timestamp)
      lessThenHour = 3590000 - difference
    }

    return lessThenHour
}

export const timeOverHour = () => {
  let moreThen

    if(localStorage.length > 0) {
      const timestamp = JSON.parse(localStorage.getItem('time'))
      const date = new Date().toISOString()
      moreThen = Date.parse(date) - Date.parse(timestamp)
    }

    return moreThen
}