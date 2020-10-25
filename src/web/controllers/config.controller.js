import { toast } from 'react-toastify';

class Config {
    constructor() {
    //backend server details
      
      this.host = "http://127.0.0.1";
     
      this.port = ":5000";
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
  