import { WEATHER_URL } from '~/utils/constants'
import baseUpdate from '../base/baseUpdate'

const weatherParser = (data) => {
  return data || {}
}
const update = async (force) => {
  await baseUpdate({
    force,
    parser: weatherParser,
    url: WEATHER_URL,
    timeout: 5 * 60,
    name: 'weather'
  })
}
const getWeather = async () => {
  let result = await chrome.storage.local.get('weather')
  result = result?.weather?.data
  return result ?? {}
}
export { update, getWeather }
