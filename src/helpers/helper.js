const monthGenitives = ['ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince']
const monthNames = ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec']
const dayNames = ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota']
const dayShortNames = ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so']
export const formatDate = (input, long = false, noYear = false) => {
  if (!input) return ''
  let month = (input instanceof Date) ? input.getMonth() : parseInt(input.substr(5, 2), 10) - 1
  let date = (input instanceof Date) ? input.getDate() : parseInt(input.substr(8, 2), 10)
  let year = (input instanceof Date) ? '' + input.getFullYear() : input.substr(0, 4)
  if (long) {
    return noYear ? date + '. ' + monthGenitives[month] : date + '. ' + monthGenitives[month] + ' ' + year
  }
  month += 1
  if (noYear) return date + '. ' + month + '.'
  return date + '. ' + month + '. ' + year
}
export const formatTime = (string) => {
  if (!string) return ''
  return string.substr(0, 5)
}
export const getMonthName = (month) => {
  if (!month && month !== 0) return ''
  return monthNames[month]
}
export const getDayName = (input, short = false) => {
  if (!input) return ''
  if (input instanceof Date) {
    return short ? dayShortNames[input.getDay()] : dayNames[input.getDay()]
  } else {
    let day = new Date(input)
    return short ? dayShortNames[day.getDay()] : dayNames[day.getDay()]
  }
}
export const getDateString = (day) => {
  let year = day.getFullYear().toString()
  let monthNumber = day.getMonth() + 1
  let month = monthNumber.toString()
  let date = day.getDate().toString()
  if (date.length === 1) date = '0' + date
  if (month.length === 1) month = '0' + month
  return year + '-' + month + '-' + date
}
export const getTodaysDateString = () => {
  return getDateString(new Date())
}
export const getIsPast = (input) => {
  let str = (typeof input === 'string') ? input : getDateString(input)
  let today = getTodaysDateString()
  return today > str
}
