/* eslint class-methods-use-this: ["error", { "exceptMethods": ["parse"] }] */
import { createAlarm } from '../../utils/tools'

const parse = (data) => {
  return data.map((el) => ({
    ...el
  }))
}

const fetchData = async (url, options) => {
  const response = await fetch(url, options)
  const responseJson = await response.json()
  return responseJson
}
const baseUpdate = async ({
  force = false,
  url = '',
  parser = parse,
  timeout = 4 * 60 * 60 * 1000,
  name = 'module',
  params = {}
}) => {
  const dataCache = await chrome.storage.local.get(name)
  if (
    dataCache?.lastUpdated > Date.now() - timeout &&
    dataCache?.data?.length &&
    !force
  )
    return
  try {
    const response = await fetchData(url, params)
    const parsedData = await parser(response)
    createAlarm({
      module: name,
      action: 'update',
      delayInMinutes: timeout
    })
    chrome.storage.local.set({
      [name]: {
        data: parsedData,
        lastUpdated: Date.now()
      }
    })
  } catch (error) {
    createAlarm({
      module: name,
      action: 'update',
      delayInMinutes: 1
    })
  }
}
export default baseUpdate
