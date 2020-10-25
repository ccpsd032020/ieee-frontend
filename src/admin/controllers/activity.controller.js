import axios from "axios";
import Config from "./config.controller";

export const add_activity = (data) => {

    data = {
        MemNo: data.MemNo,
        action: data.action,
        table: data.table,
        parameters: data.parameters,
        datetime: data.datetime
    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/activity/addActivity`, { ...data })
            .then(result => {
                resolve({ code: 200, message: result.data.message })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })

}

export const get_all_activities = () => {
    return new Promise((resolve, reject) => {
        return axios.get(`${Config.host}${Config.port}/activity/getActivities`)
            .then(result => {
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}
