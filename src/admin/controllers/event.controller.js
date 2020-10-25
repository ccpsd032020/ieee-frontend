import axios from "axios";
import Config from "./config.controller";

export const get_all_events = () => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/event/all/events`)
            .then( result => {
                // console.log(result.data);
                    resolve({code : 200 , data : result.data })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}

export const get_event = (id) => {
    var data = {
        id:id
    }
    return new Promise( (resolve,reject) => {
        return axios.post (`${Config.host}${Config.port}/event/specificEvent`, {...data})
            .then( result => {
              //  console.log(result.data);
                    resolve({code : 200 , data : result.data })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}

export const deleteEvent = (id) => {

    var  datanew = {
         id :id
     }
  
     return new Promise( (resolve,reject) => {
         return axios.post(`${Config.host}${Config.port}/event/delete` , { ...datanew })
             .then( result => {
                //  console.log(result.data);
                     resolve({code : 200 , message : result.data.message })
             })
             .catch( err => {
                 reject({ code : 0 , error : err})
             })
     })
 }

 export const deleteForm = (id) => {

    var  data = {
         id :id
     }
  
     return new Promise( (resolve,reject) => {
         return axios.post(`${Config.host}${Config.port}/event/deleteForm` , { ...data })
             .then( result => {
                     resolve({code : 200 , message : result.data.message })
             })
             .catch( err => {
                 reject({ code : 0 , error : err})
             })
     })
 }

 export const addRegistrationForm = (formData, names ,id) => {

    formData = {
        id: id,
        registrationForm : formData,
        fieldNames : names
    }
    return new Promise( (resolve,reject) => {
        return axios.post(`${Config.host}${Config.port}/event/addForm` , { ...formData })
            .then( result => {
                    resolve({code : 200 , message : result.data.message })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}

export const get_responses = (id) => {

    var data = {
        id:id
    }

    return new Promise( (resolve,reject) => {
        return axios.post (`${Config.host}${Config.port}/event/getResponses`, {...data})
            .then( result => {
              //  console.log(result.data);
                    resolve({code : 200 , data : result.data })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}

