import { toast } from 'react-toastify';

class Config {
    constructor() {
    //backend server details
      // this.host = "http://3.19.240.108";
      this.host = "https://ieeeserver.herokuapp.com";
      //  this.host = "http://52.170.158.52";
      this.port = "";
    }
  
    setToast(msg){
      toast( msg, {
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    }


  }
  
  var obj = new Config();
  export default obj;
  
