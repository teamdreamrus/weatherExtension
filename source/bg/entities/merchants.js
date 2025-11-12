import { extractSubdomainFromUrl, isUrl } from '~/utils/tools'
import { MERCHANTS_URL } from '~/utils/constants'
import baseUpdate from '../base/baseUpdate'

const merchantsParser = (data) => {
  return data?.results || []
}
const update = async (force) => {
  await baseUpdate({
    force,
    url: MERCHANTS_URL,
    parser: merchantsParser,
    name: 'merchants',
    timeout: 4 * 60
  })
}

const getByUrl = async (url) => {
  if (!isUrl(url)) {
    return null
  }
  try {
    const merchants = await chrome.storage.local
      .get('merchants')
      .then((m) => m?.merchants?.data || [])
    const host = extractSubdomainFromUrl(url)
    const merchant = merchants?.find(({ url: homepage }) => {
      const merchantHost = extractSubdomainFromUrl(homepage)
      const rx = new RegExp(`(^|\\.)${merchantHost}`)
      return rx.test(host)
    })
    return merchant || null
  } catch (e) {
    return null
  }
}

export { update, getByUrl }
