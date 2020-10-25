import axios from "axios";
import Config from "./config.controller";

//=============================================================================== Add Past Designation

export const addPastDesignation = (data) => {
    console.log(data.DesNo);
    data = {
        AssNo: data.AssNo,
        title: data.title,
        affiliationNo: data.affiliationNo,
        MemNo: data.MemNo,
        Year: data.Year,
        updated_at: data.updated_at
    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/pastdes/addPastDesignations`, { ...data })
            .then(result => {
                console.log(result.data);
                resolve({ code: 200, message: result.data.message })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })

}

//=============================================================================== Get all Past designations

export const get_all_past_designations = () => {
    return new Promise((resolve, reject) => {
        return axios.get(`${Config.host}${Config.port}/pastdes/getPastDesignations`)
            .then(result => {
                console.log(result.data);
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}

//=============================================================================== Get spec Past designations

export const get_spec_past_designations = (id) => {
    console.log(id);
    var data = {
        id: id
    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/pastdes/getSpecPastDesignations`, { ...data })
            .then(result => {
                console.log(result.data);
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}

//=============================================================================== Delete Past designation

export const remove_past_designation = (id) => {
    console.log(id);
    var data = {
        id: id
    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/pastdes/deletePastDesignations`, { ...data })
            .then(result => {
                console.log(result.data);
                resolve({ code: 200, message: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}

//=============================================================================== Update Past designation

export const update_past_designation = (data, id) => {

    data = {
        id: id,
        title: data.title,
        affiliationNo: data.affiliationNo,
        MemNo: data.MemNo,
        Year: data.Year,
        updated_at: data.updated_at,

    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/pastdes/updatePastDesignation`, { ...data })
            .then(result => {
                console.log(result.data);
                resolve({ code: 200, message: result.data.message })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}

//=============================================================================== Get spec aff Past designations

export const get_spec_aff_past_designations = (id) => {
    console.log(id);
    var data = {
        id: id
    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/pastdes/getSpecPastAffDesignations`, { ...data })
            .then(result => {
                console.log(result.data);
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}
