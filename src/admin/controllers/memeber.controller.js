import axios from "axios";
import Config from "./config.controller";


export const sign_controller = (mem, pass) => {

    var data = {
        memberShipNo: mem,
        uPass: pass
    }
    console.log(data);
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/admin/signin`, { ...data })
            .then(result => {
                console.log(result.data);
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}


export const add_member_requset = (data) => {

    data = {
        fname : data.addfname  , 
        lname : data.addlname  ,
        nameAsMemberShip : data.addmname  ,
        memberShipNo : data.addmnumber ,
        affiID: data.selectaffiID,
        email : data.addpemail,
        ieeeMail : data.addoemail ,
        contactNo : data.addphone ,
        password : data.addpassword ,
    }
    return new Promise( (resolve,reject) => {
        return axios.post(`${Config.host}${Config.port}/member/requset` , { ...data })
            .then( result => {
                console.log(result.data);
                    resolve({code : 200 , message : result.data.message })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}
export const update_member = (data, id) => {
    
    data = {
        id: id,
        fname : data.fname  , 
        lname : data.lname  ,
        memberShipNo : data.memberShipNo,
        affiID: data.selectaffiID,
        email : data.email ,
        contactNo : data.contactNo ,
        nameAsMemberShip: data.nameAsMemberShip,
        ieeeMail: data.ieeeMail,

        
    }
    return new Promise( (resolve,reject) => {
        return axios.post(`${Config.host}${Config.port}/member/mem/update` , { ...data })
            .then( result => {
                console.log(result.data);
                    resolve({code : 200 , message : result.data.message })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}





export const accept_or_reject = (data) => {

   var  datanew = {
        memberShipNo :data.memberShipNo,
        state : data.state
    }
    console.log(datanew);
    return new Promise( (resolve,reject) => {
        return axios.post(`${Config.host}${Config.port}/member/req/action` , { ...datanew })
            .then( result => {
                console.log(result.data);
                    resolve({code : 200 , message : result.data.message })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}

export const member_delete = (data) => {

    var  datanew = {
         memberShipNo :data.memberShipNo,
         state : data.state
     }
     console.log(datanew);
     return new Promise( (resolve,reject) => {
         return axios.post(`${Config.host}${Config.port}/member/delete` , { ...datanew })
             .then( result => {
                 console.log(result.data);
                     resolve({code : 200 , message : result.data.message })
             })
             .catch( err => {
                 reject({ code : 0 , error : err})
             })
     })
 }

// 
export const get_all_requsests = () => {

    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/member/all/request`)
            .then( result => {
                console.log(result.data);
                    resolve({code : 200 , data : result.data })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}


export const get_all_active_members = () => {

    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/member/all/active`)
            .then( result => {
                console.log(result.data);
                    resolve({code : 200 , data : result.data })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}


export const get_specific_mem = (id) => {

    var data = {
        id:id
    }
    return new Promise( (resolve,reject) => {
        return axios.post (`${Config.host}${Config.port}/member/specif/member`, {...data})
            .then( result => {
                console.log(result.data);
                    resolve({code : 200 , data : result.data })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}

export const get_all_rewards = () => {

    return new Promise( (resolve,reject) => {
        return axios.get (`${Config.host}${Config.port}/member/all/rewards`)
            .then( result => {
                    resolve({code : 200 , data : result.data })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}
export const get_past_designation = (id) => {

    return new Promise( (resolve,reject) => {
        return axios.get (`${Config.host}${Config.port}/member/pastdes/${id}`)
            .then( result => {
                    resolve({code : 200 , data : result.data })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}



export const change_password_By_admin  = (data) => {
    console.log(data);
   var daat =  {memberId :data }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/admin/reset`, {daat} )
            .then(result => {
                console.log(result.data);
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}
export const update_password_By_admin  = (memberId, newPasswod) => {
   var daat =  {memberId :memberId, newPasswod: newPasswod }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/admin/admin/reset`, {daat} )
            .then(result => {
                console.log(result.data);
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}
