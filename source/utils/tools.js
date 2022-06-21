const createAlarm = ({
  module = '',
  action = '',
  data = {},
  periodInMinutes = null,
  delayInMinutes = null
}) => {
  chrome.alarms.create(JSON.stringify({ module, action, data }), {
    periodInMinutes,
    delayInMinutes
  })
}

const rx = /(.*:\/\/www(\w|\d)?\.|.*:\/\/)?([^/:]*).*/i
const extractSubdomainFromUrl = (url) =>
  url && url.replace(rx, '$3').toLowerCase()

const isUrl = (str) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const url = new URL(str)
    return true
  } catch (e) {
    return false
  }
}
const getActiveTab = async () => {
  const activeTab = await chrome.tabs
    .query({ active: true, currentWindow: true })
    .then(([tab]) => tab)
  return activeTab
}
const sendContentMessage = (params) => {
  const promise = new Promise((resolve) => {
    chrome.runtime.sendMessage(params, (response) => {
      resolve(response)
    })
  })
  return promise
}
export {
  createAlarm,
  extractSubdomainFromUrl,
  isUrl,
  getActiveTab,
  sendContentMessage
}
