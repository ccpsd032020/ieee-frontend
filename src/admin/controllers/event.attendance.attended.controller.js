import axios from "axios";
import Config from "./config.controller";

//======================================================================================================
//================================== Add confirmed members==============================================
//====================================================================================================== 

export const addEventAttendanceAttended = (data) => {
    return new Promise((resolve, reject) => {
      return axios
        .post(`${Config.host}${Config.port}/eventattendance/attendance/add_attended_mem`, data)
        .then((result) => {
          resolve({ code: 200, message: result.data });
        })
        .catch((err) => {
          reject({ code: 0, error: err });
        });
    });
  };
//======================================================================================================
//================================== Get attended members==============================================
//====================================================================================================== 

export const getAttendedMembersForAnEvent = (id) => {
    var data = {
        id:id
    }
    return new Promise( (resolve,reject) => {
        return axios.post (`${Config.host}${Config.port}/eventattendance/attendance/get_attended_mem`, {...data})
            .then( result => {
                    resolve({code : 200 , data : result.data })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}

//======================================================================================================
//================================== Delete a attended member==============================================
//====================================================================================================== 

 export const removeEventAttendanceAttended = (data) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(`${Config.host}${Config.port}/eventattendance/attendance/delete_attended_mem`, data)
      .then((result) => {
        resolve({ code: 200, message: result.data });
      })
      .catch((err) => {
        reject({ code: 0, error: err });
      });
  });
};
