import { AxiosInstance } from "axios";
import { Config as ZiggyConfig, route as ziggyRoute } from 'ziggy-js'

declare global {
    interface Window {
        axios: AxiosInstance
    }

    var route : typeof ziggyRoute
    var Ziggy : ZiggyConfig
}
