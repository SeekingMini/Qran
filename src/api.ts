export async function fetchTranslation(req: FetchTranslationAPI.Request) {
  const url = 'http://api.fanyi.baidu.com/api/trans/vip/translate?'
    + `q=${req.q}&` + `from=${req.from}&` + `to=${req.to}&`
    + `appid=${req.appid}&` + `salt=${req.salt}&` + `sign=${req.sign}`
  const resp = fetch(url);
  return (await resp).json() as Promise<FetchTranslationAPI.Response>;
}