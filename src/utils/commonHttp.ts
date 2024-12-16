import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import NProgress from '@/config/nprogress'

const instance: AxiosInstance = axios.create({
  baseURL: '/map-api',
  timeout: 10000,
  withCredentials: true,
})

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 开启进度条
    NProgress.start()
    if (config.params === undefined) {
      config.params = {}
    }
    // 判断url是否包含http，如果包含则将baseURL设置为空字符串，不走baseURL
    if (config.url && config.url.indexOf('http') === 0) {
      config.baseURL = ''
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    // 进度条结束
    NProgress.done()
    return data
  },
  (error) => {
    // 响应错误时也结束进度条
    NProgress.done()
    return Promise.reject(error)
  }
)

// 封装get方法
export const httpGet = <T>(url: string, params?: object): Promise<T> => {
  return instance.get(url, { params })
}

// 封装post方法
export const httpPost = <T>(
  url: string,
  data?: object,
  header?: object
): Promise<T> => instance.post(url, data, header)

// 封装upload方法
export const httpUpload = <T>(
  url: string,
  formData: FormData,
  header?: object
): Promise<T> => {
  return instance.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...header,
    },
  })
}
