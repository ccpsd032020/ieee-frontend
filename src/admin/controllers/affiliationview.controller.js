import axios from "axios";
import Config from "./config.controller";



export const get_all_affiliations = () => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/affiliation/all/affiliations`)
            .then( result => {
                // console.log(result.data);
                    resolve({code : 200 , data : result.data })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}

export const get_affiliation = (id) => {
    var data = {
        id:id
    }
    return new Promise( (resolve,reject) => {
        return axios.post (`${Config.host}${Config.port}/affiliation/specificAffiliation`, {...data})
            .then( result => {
              //  console.log(result.data);
                    resolve({code : 200 , data : result.data })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}

export const get_affiliationview= (id) => {

    // var  datanew = {
    //     affiID : data.affiID
    // }
 

    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/affiliationview/all/affiliationview/${id}`)
            .then( result => {
                console.log(result.data);
                    resolve({code : 200 , data : result.data })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}

