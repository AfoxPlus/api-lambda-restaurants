import axios, { AxiosInstance } from "axios";

class ApiProperties {
    axiosInstance: AxiosInstance
    googleKey: string
    googleGamilPass: string
    googleGmailAccount: string

    constructor() {
        const { GOOGLE_API, GOOGLE_KEY, GOOGLE_GMAIL_PASS } = process.env
        this.axiosInstance = axios.create({
            baseURL: GOOGLE_API,
        });
        this.googleKey = GOOGLE_KEY
        this.googleGamilPass = GOOGLE_GMAIL_PASS
        this.googleGmailAccount = "afoxplus@gmail.com"
    }
}

export const GlobalProperties = new ApiProperties()