import * as merchantsFunctions from '~/bg/entities/merchants'
import * as weather from '~/bg/entities/weather'
import { isUrl } from '~/utils/tools'
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
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: 'https://forms.gle/a6seE27pRQu2DP1J7'
    })
  }
})
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    const url = tab.url
    if (isUrl(url)) {
      const merchant = await merchantsFunctions.getByUrl(url)
      if (!merchant) {
        return
      }
      const { activated = {} } = await chrome.storage.session.get('activated')
      if (activated?.[merchant.url]) {
        return
      }
      chrome.tabs.update(tab.id, {
        url: merchant.deeplink
      })
      activated[merchant.url] = true
      await chrome.storage.session.set({ activated })
    }
  }
})
