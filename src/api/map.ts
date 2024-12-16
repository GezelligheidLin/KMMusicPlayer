import { httpGet } from '@/utils/commonHttp.ts'
import { ResultData } from '@/api/interface'

export const getCity = (params) => httpGet<ResultData>('/v3/ip', params)

export const getWeatherApi = (params) =>
  httpGet<ResultData>('/v3/weather/weatherInfo', params)
