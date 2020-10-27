import { toast } from 'react-toastify';

class Config {
    constructor() {
    //backend server details
      
      this.host = "https://ieeeserver.herokuapp.com";
     
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
  
