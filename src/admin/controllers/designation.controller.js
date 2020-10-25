import axios from "axios";
import Config from "./config.controller";

//=============================================================================== Add Designation

export const addDesignation = (data) => {
    data = {
        title: data.title,
        affiliationNo: data.affiliationNo,
        type: data.type,
        updated_at: data.updated_at
    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/designations/addDesignations`, { ...data })
            .then(result => {
                resolve({ code: 200, message: result.data.message })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })

}

//=============================================================================== Get all designations

export const get_all_designations = () => {
    return new Promise((resolve, reject) => {
        return axios.get(`${Config.host}${Config.port}/designations/getDesignations`)
            .then(result => {
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}

//=============================================================================== Get aff spec designations

export const get_aff_spec_designations = (id) => {
    var data = {
        id: id
    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/designations/getAffSpecDesignations`, { ...data })
            .then(result => {
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}

//=============================================================================== Get spec designations

export const get_spec_designations = (id) => {
    var data = {
        id: id
    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/designations/getSpecDesignations`, { ...data })
            .then(result => {
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}

//=============================================================================== Delete designation

export const remove_designation = (id) => {
    var data = {
        id: id
    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/designations/deleteDesignations`, { ...data })
            .then(result => {
                resolve({ code: 200, message: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}

//=============================================================================== Update designation

export const update_designation = (data, id) => {

    data = {
        id: id,
        title: data.title,
        affiliationNo: data.affiliationNo,
        type: data.type,

    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/designations/updateDesignation`, { ...data })
            .then(result => {
                resolve({ code: 200, message: result.data.message })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}

//=============================================================================== Update designation member

export const update_designation_mem = (data, id) => {

    data = {
        id: id,
        MemNo: data.MemNo,

    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/designations/updateDesignationMem`, { ...data })
            .then(result => {
                resolve({ code: 200, message: result.data.message })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}

//=============================================================================== Remove designation member

export const remove_designation_mem = (data, id) => {

    data = {
        id: id

    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/designations/removeDesignationMem`, { ...data })
            .then(result => {
                resolve({ code: 200, message: result.data.message })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}

//=============================================================================== get all members

export const get_all_members = () => {
    return new Promise((resolve, reject) => {
        return axios.get(`${Config.host}${Config.port}/designations/getAllMembers`)
            .then(result => {
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}

//=============================================================================== get aff spec members

export const get_aff_spec_members = (id) => {
    var data = {
        id: id
    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/designations/getAffSpecMembers`, { ...data })
            .then(result => {
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}

//=============================================================================== Get spec member

export const get_spec_member = (id) => {
    var data = {
        id: id
    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/designations/getSpecMember`, { ...data })
            .then(result => {
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}

//=============================================================================== Get no aff type

export const get_no_aff_type = (id) => {
    var data = {
        id: id
    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/designations/getNoAffType`, { ...data })
            .then(result => {
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}

//=============================================================================== Get active mem count

export const get_active_mem_count = (id) => {
    var data = {
        id: id
    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/designations/getActiveMemCount`, { ...data })
            .then(result => {
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}

//=============================================================================== Get all mem count

export const get_all_mem_count = (id) => {
    var data = {
        id: id
    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/designations/getAllMemCount`, { ...data })
            .then(result => {
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}

//=============================================================================== Get pending mem count

export const get_pending_mem_count = (id) => {
    var data = {
        id: id
    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/designations/getPendingMemCount`, { ...data })
            .then(result => {
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}
