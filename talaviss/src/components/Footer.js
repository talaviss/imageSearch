import React from 'react';

const Footer = () => (
  <footer className="footer">
    <div id="credits">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-6">
            <span>&copy; Tal Avissar 2017</span>
          </div>
          <div className="col-md-6" id="social-networks">
            <a href="https://www.linkedin.com/in/tal-avissar-b24a961/?ppe=1"><i className="fa fa-2x fa-linkedin-square" /></a>
            <a href="https://medium.com/@talaviss"><i className="fa fa-2x fa-medium" /></a>
            <a href="http://www.talavissar.com"><i className="fa fa-camera-retro fa-2x" /></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
