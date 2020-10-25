import React from 'react';

function Footer() {
   return (
    <footer className="page-footer font-small special-color-dark pt-4 mt-5  sticky-bottom" >
    
      <div className="container">
        <ul className="list-unstyled list-inline text-center">
          <li className="list-inline-item">
            <a className="btn-floating btn-fb mx-1" href="https://www.facebook.com/IEEESriLanka/">
              <i className="fab fa-facebook-f"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-tw mx-1" href="https://twitter.com/ieeesrilanka?lang=en">
              <i className="fab fa-twitter"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-li mx-1" href="https://www.linkedin.com/company/ieee-sri-lanka-section">
              <i className="fab fa-linkedin-in"> </i>
            </a>
          </li>
        </ul>

      </div>
  
      <div className="footer-copyright text-center py-3">© 2020 Copyright:
        <a href="#"> SD03_2020</a>
      </div>
    
    </footer>);
}

export default Footer;
