import React, { useState } from 'react';
import Button from './Button';
import { Modal, ModalBody, Spinner } from 'reactstrap';

const DownloadScreenCapture = (props) => {

  const [loader, setLoader] = useState(false)
  const download = (e) => {

    setLoader(true)
    var htmlToImage = require('html-to-image');
    e.preventDefault()
    htmlToImage.toJpeg(document.getElementById('content'), { quality: 0.95 })
      .then(function (dataUrl) {
        setLoader(false)
        var link = document.createElement('a');
        link.download = 'data-snapshot.png';
        link.href = dataUrl;
        link.click();
      });

  }
  return (
    <>
      <Button className={["download-screen-capture "] + props.className} onClick={download} text={props.buttonText} id="download" downloadBtn={true}/>
      {loader ?
        <Modal id="loader" isOpen={loader} className="modal-dialog-centered loader">
          <ModalBody>
            <div className="row">
              <div className="col-2"></div>
              <div className="col-0 ml-3 pt-4">
                <Spinner type="grow" color="secondary" style={{color: 'white', fontSize: '0px'}} size="sm"><span
                  className="visually-hidden" style={{visibility: 'hidden'}}>Loading...</span></Spinner>
                <Spinner type="grow" color="success" style={{ color: 'white', fontSize: '0px'}} size="sm"><span
                  className="visually-hidden" style={{visibility: 'hidden'}}>Loading...</span></Spinner>
                <Spinner type="grow" color="danger" style={{ color: 'white', fontSize: '0px'}} size="sm"><span
                  className="visually-hidden" style={{visibility: 'hidden'}}>Loading...</span></Spinner>
                <Spinner type="grow" color="warning" style={{ color: 'white', fontSize: '100px'}} size="sm"><span
                  className="visually-hidden" style={{visibility: 'hidden'}}>Loading...</span></Spinner>
              </div>
              <div className="col-0 pt-4 pl-4 float-left">Downloading Image...</div>
            </div>
            <br />
          </ModalBody>
        </Modal>
        : ''
      }
    </>

  );
}
export default DownloadScreenCapture;