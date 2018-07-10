import axios from 'axios'
import * as urlConfig from '../config/url'

export const bannerApi = {
    list() {
        return axios.get(urlConfig.banner).then((res) => (res.data))
    }
}