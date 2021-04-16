import { Backdrop, Fade, Modal } from "@material-ui/core";
import React, { Component } from "react";

export class InsertModal extends Component {
  constructor(props) {
    super(props);
    this.type = this.props.type;
    this.open = this.props.open;
    this.onClose = this.props.onClose;
    this.paperClass = this.props.paperClass;
    this.modalClass = this.props.modalClass;
  }
  typeComponent = () => {
    switch (this.type) {
      case "Sorting":
      //return <InsertSort />
    }
  };
  render() {
    return (
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={this.open}
        onClose={this.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.open}>
          <div
            className={{
              position: "absolute",
              width: 400,
              border: "2px solid #000",
            }}
          >
            <h2 id='transition-modal-title'>Transition modal</h2>
            <p id='transition-modal-description'>
              react-transition-group animates me.
            </p>
          </div>
        </Fade>
      </Modal>
    );
  }
}
