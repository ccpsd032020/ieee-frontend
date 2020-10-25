import axios from "axios";
import Config from "./config.controller";


export const add_event_report = (data) => {
  const formData = new FormData();
  formData.append("eventId", data.eventId);
  formData.set("eventname", data.eventname);
  formData.append("hostingAffiliation", data.hostingAffiliation);
  formData.append("pdf", data.file);
  formData.set("created_at", data.date);
  formData.set("submssionState", 'Submitted');
  formData.set("submissionComment", data.submissioncomment);

  return new Promise((resolve, reject) => {
    return axios
      .post(`${Config.host}${Config.port}/eventReport/report/add`,  formData)
      .then((result) => {
        resolve({ code: 200, message: result.data });
      })
      .catch((err) => {
        reject({ code: 0, error: err });
      });
  });
};

export const delete_report = (id) => {
  var data = {
    id: id,
  };
  return new Promise((resolve, reject) => {
    return axios
      .post(`${Config.host}${Config.port}/eventReport/report/delete`, {
        ...data,
      })
      .then((result) => {
        resolve({ code: 200, message: result.data });
      })
      .catch((err) => {
        reject({ code: 0, error: err });
      });
  });
};

export const get_spec_report = (id) => {
  var data = {
    id: id,
  };
  return new Promise((resolve, reject) => {
    return axios
      .post(`${Config.host}${Config.port}/eventReport/report/spec`, { ...data })
      .then((result) => {
        resolve({ code: 200, message: result.data });
      })
      .catch((err) => {
        reject({ code: 0, error: err });
      });
  });
};

export const get_all_reports = () => {
  return new Promise((resolve, reject) => {
    return axios
      .get(`${Config.host}${Config.port}/eventReport/report/all`)
      .then((result) => {
        resolve({ code: 200, data: result.data });
      })
      .catch((err) => {
        reject({ code: 0, error: err });
      });
  });
};

export const get_affiliation_by_event_name = (id) => {
  var data = {
    id: id,
  };
  return new Promise((resolve, reject) => {
    return axios
      .get(`${Config.host}${Config.port}/eventReport/report/getEventName`)
      .then((result) => {
        resolve({ code: 200, data: result.data });
      })
      .catch((err) => {
        reject({ code: 0, error: err });
      });
  });
};
