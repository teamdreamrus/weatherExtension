// import { getActiveTab } from '~/utils/tools'
// import * as merchantsFunctions from '../bg/entities/merchants'
import { getWeather } from '../entities/weather'

const initPopup = async ({ sendResponse }) => {
  const weather = await getWeather()
  const response = { data: weather }
  sendResponse(response)
  return true
}

// registrate handlers for messages global
const getMessagesHandlers = () => ({
  initPopup
})

// eslint-disable-next-line import/prefer-default-export
export { getMessagesHandlers }
