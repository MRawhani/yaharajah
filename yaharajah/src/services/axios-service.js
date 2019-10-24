import axios from 'axios';
import authService from './auth-service'

class AxiosInstance {
    
    constructor(){
        this.initInstance();
    }
    axiosInstance ={};

    initInstance =()=>{
        this.axiosInstance = axios.create({
            baseURL:'',
            timeout:2000
        })

        this.axiosInstance.interceptors.request.use(
            (config)=>{
                const token = authService.getToken();
                if(token){
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config
            }
        )
        return this.axiosInstance;
    }

    getInstance = ()=>{
        return this.axiosInstance || this.initInstance();
    }
}


export default new AxiosInstance();