import * as merchantsFunctions from '~/bg/entities/merchants'
import * as weather from '~/bg/entities/weather'
import { getMessagesHandlers } from './messageHandlers/index'

const fetchBgData = async () => {
  try {
    // await settingsFunctions.setDefault()
    const data = await Promise.all([
      merchantsFunctions.update(true),
      weather.update(true)
    ])
    return data
  } catch (e) {
    console.error(e)
    return null
  }
}
global.app = {
  merchantsFunctions,
  fetchBgData,
  weather
}

chrome.runtime.onInstalled.addListener(async () => {
  await fetchBgData()
})

const getAlarmsHandlers = () => ({
  merchants: {
    update: merchantsFunctions.update
  },
  weather: {
    update: weather.update
  }
})

chrome.alarms.onAlarm.addListener(({ name }) => {
  const alarmFunctions = getAlarmsHandlers()
  const { module = '', action = '', data = {} } = JSON.parse(name)
  const executor = module ? alarmFunctions[module] : alarmFunctions
  if (executor && typeof executor[action] === 'function')
    executor[action].call(executor, { data })
})

chrome.runtime.onMessage.addListener(
  ({ module, action, data }, sender, sendResponse) => {
    const messageHandlers = getMessagesHandlers()
    const executor = module ? messageHandlers[module] : messageHandlers
    if (executor && typeof executor[action] === 'function') {
      executor[action].call(executor, {
        data,
        sender,
        sendResponse
      })
    } else {
      sendResponse(null)
    }
    return true
  }
)
