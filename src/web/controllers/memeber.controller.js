import axios from "axios";
import Config from "./config.controller";

export const add_member_requset = (data) => {

    data = {
        fname: data.addfname,
        lname: data.addlname,
        nameAsMemberShip: data.addmname,
        memberShipNo: data.addmnumber,
        affiID: data.selectaffiID,
        email: data.addpemail,
        ieeeMail: data.addoemail,
        contactNo: data.addphone,
        password: data.addpassword,
    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/member/requset`, { ...data })
            .then(result => {
                console.log(result.data);
                resolve({ code: 200, message: result.data.message })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}


export const get_all_active_members = () => {

    return new Promise((resolve, reject) => {
        return axios.get(`${Config.host}${Config.port}/member/all/active`)
            .then(result => {
                console.log(result.data);
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}
export const get_specific_mem = (id) => {

    var data = {
        id: id
    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/member/specif/member`, { ...data })
            .then(result => {
                console.log(result.data);
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}

export const sign_controller = (mem, pass) => {

    var data = {
        memberShipNo: mem,
        uPass: pass
    }
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/member/signin`, { ...data })
            .then(result => {
                console.log(result.data);
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}


export const uploadProfilePic = async (file, membershipnumber) => {

    var requestData = new FormData();

    requestData.set("membershipnumber", membershipnumber)
    requestData.append("photos", file)
    console.log(requestData.get('photos'));
    console.log(requestData.get('membershipnumber'));
    var resp = 500;

    await console.log(requestData.get('photos'));
    await axios.post(
        `${Config.host}${Config.port}/member/update`,
        requestData,
    ).then((Response) => {
        resp = Response.status;
    }).catch((err) => {
        console.error(err);
        try {
            resp = err.response.status;
        } catch (error) {
            resp = 600;
        }
    });
    console.log(resp);
    return resp;
}
export const change_password  = (data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/member/reset`, data )
            .then(result => {
                console.log(result.data);
                resolve({ code: 200, data: result.data })
            })
            .catch(err => {
                reject({ code: 0, error: err })
            })
    })
}



// 
export const get_pastdes_member = (id) => {

    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/member/pastdes/${id}`)
            .then( result => {
                resolve({code : 200 , data : result.data })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}


