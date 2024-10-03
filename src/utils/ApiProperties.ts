import axios, { AxiosInstance } from "axios";

class ApiProperties{
    axiosInstance: AxiosInstance
    googleKey: string

    constructor(){
        const { GOOGLE_API, GOOGLE_KEY } = process.env
        this.axiosInstance = axios.create({
            baseURL: GOOGLE_API,
          });
        this.googleKey = GOOGLE_KEY
    }
}

export const GlobalProperties = new ApiProperties()