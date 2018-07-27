import axios from 'axios'
import tools from './utils'
import constants from './constants'
import { configDef, configDev, configPro, configURL } from './config'

class Loader {
    constructor(Vue) {
        Vue.prototype.$_vk = {} // 命名空间
        this.Vue = Vue
        this.$_vk = Vue.prototype.$_vk
    }

    loadConfig() {
        const configEnv = process.env.NODE_ENV === 'production'
        ? configPro
        : configDev
        const merge = {
            ...configDef,
            ...configEnv,
            configURL
        }
        Object.defineProperty(this.$_vk, 'config', {
            get: () => {
                return merge
            }
        })

    }
    
    loadAxios() {
        const { baseURL, withCredentials } = this.$_vk.config
        const instance = axios.create({
            baseURL,
            withCredentials
        })
        // 拦截请求
        instance.interceptors.request.use(function (config) {
            // render loadingUI
            return config;
        }, function (error) {
            return Promise.reject(error);
        })
        // 拦截响应
        instance.interceptors.response.use(function (response) {
            // remove loadingUI
            return response;
        }, function (error) {
            // Message.error(error.response.data.msg);
            return Promise.reject(error);
        })
        // 处理axios原生方法
        this.$_vk.axios = {}
        const methods = ['get', 'post', 'put', 'delete']
        const isNeedAllInfo = this.$_vk.config.isNeedAllInfo
        methods.forEach(method => {
            this.$_vk.axios[method] = (...params) => {
                return new Promise((resolve, reject) => {
                    instance[method](...params)
                        .then(res => {
                            resolve(isNeedAllInfo ? res : res.data)
                        })
                        .catch(err => {
                            reject(isNeedAllInfo ? err : err.data)
                        })
                })
            }
        })
        this.$_vk.axios.all = (list) => Promise.all(list)
        this.$_vk.axios.get('/user').then(res => console.log(res))
    }
    

    init() {
        this.loadConfig()
        this.loadAxios()
        this.$_vk.tools = tools
        this.$_vk.constants = constants
        this.$_vk.eventBus = new this.Vue()
        
    }
}

export default Loader