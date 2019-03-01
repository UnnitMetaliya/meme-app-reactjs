import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  NavbarBrand
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const photos = [
  { src: "/images/disaster.jpg" },
  { src: "/images/chairtable.jpg" },
  { src: "/images/chuck-norris.jpg" },
  { src: "/images/civil-war.jpg" },
  { src: "/images/creepy-smirk.jpg" },
  { src: "/images/crying-woman.jpg" },
  { src: "/images/doubtful-kid.jpg" },
  { src: "/images/eyyy.jpg" },
  { src: "/images/interesting-man.jpg" },
  { src: "/images/leo.jpg" },
  { src: "/images/like-this.jpg" },
  { src: "/images/lion.jpg" },
  { src: "/images/minions.jpg" },
  { src: "/images/no-way.jpg" },
  { src: "/images/one-does-not-simply.jpg" },
  { src: "/images/parked.jpg" },
  { src: "/images/party.jpg" },
  { src: "/images/right-now.jpg" },
  { src: "/images/robert.jpg" },
  { src: "/images/sad-chicken.jpg" },
  { src: "/images/social-awkward.jpg" }
];

const initialState = {
  toptext: "", // top caption
  bottomtext: "", // bottom caption
  isTopDragging: false, // initializing top text position
  isBottomDragging: false, // initializing bottom text position
  // X and Y cordinates of the top caption
  topX: "50%",
  topY: "10%",
  // X and Y cordinates of bottom caption
  bottomX: "50%",
  bottomY: "90%"
};

class MemeApp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImage: 0,
      modalIsOpen: false,
      currentImagebase64: null,
      // letting initialState take values from state object.
      ...initialState
    };
  }

  openImage = index => {
    const image = photos[index];
    const base_image = new Image();
    base_image.src = image.src;
    const base64 = this.getBase64Image(base_image); // a function to convert image into data URI

    // working with currently selected image
    this.setState(prevState => ({
      currentImage: index,
      modalIsOpen: !prevState.modalIsOpen,
      currentImagebase64: base64,
      ...initialState
    }));
  };

  toggle = () => {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen
    }));
  };

  changeText = event => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  getStateObj = (e, type) => {
    let rect = this.imageRef.getBoundingClientRect();
    const xOffset = e.clientX - rect.left;
    const yOffset = e.clientY - rect.top;
    let stateObj = {};
    if (type === "bottom") {
      stateObj = {
        isBottomDragging: true,
        isTopDragging: false,
        bottomX: `${xOffset}px`,
        bottomY: `${yOffset}px`
      };
    } else if (type === "top") {
      stateObj = {
        isTopDragging: true,
        isBottomDragging: false,
        topX: `${xOffset}px`,
        topY: `${yOffset}px`
      };
    }
    return stateObj;
  };

  handleMouseDown = (e, type) => {
    const stateObj = this.getStateObj(e, type);
    document.addEventListener("mousemove", event =>
      this.handleMouseMove(event, type)
    );
    this.setState({
      ...stateObj
    });
  };

  handleMouseMove = (e, type) => {
    if (this.state.isTopDragging || this.state.isBottomDragging) {
      let stateObj = {};
      if (type === "bottom" && this.state.isBottomDragging) {
        stateObj = this.getStateObj(e, type);
      } else if (type === "top" && this.state.isTopDragging) {
        stateObj = this.getStateObj(e, type);
      }
      this.setState({
        ...stateObj
      });
    }
  };

  handleMouseUp = event => {
    document.removeEventListener("mousemove", this.handleMouseMove);
    this.setState({
      isTopDragging: false,
      isBottomDragging: false
    });
  };

  convertSvgToImage = () => {
    const svg = this.svgRef;
    let svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    const svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
    );
    img.onload = function() {
      canvas.getContext("2d").drawImage(img, 0, 0);
      const canvasdata = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.download = "meme.png";
      a.href = canvasdata;
      document.body.appendChild(a);
      a.click();
    };
  };

  getBase64Image(img) {
    // a function to convert image into data URI
    // need to create canvas for letting them edit selected image
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    // useful resource: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }

  render() {
    const image = photos[this.state.currentImage];
    const base_image = new Image();
    base_image.src = image.src;
    var newWidth = base_image.width;
    var newHeight = base_image.height;
    const textStyle = {
      fontFamily: "Impact",
      fontSize: "50px",
      textTransform: "uppercase",
      fill: "#FFF",
      stroke: "#000",
      userSelect: "none"
    };

    return (
      <div>
        <div className="main-content">
          <div className="sidebar">
            <NavbarBrand href="/">MEME APP - BUILT ON REACT</NavbarBrand>
            <p>
              Click on any image. Edit top and bottom text. Download it. Enjoy
              your new meme.
            </p>
          </div>
          <div className="content">
            {photos.map((image, index) => (
              <div className="image-holder" key={image.src}>
                <span className="meme-top-caption">Top text</span>
                <img
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    height: "100%"
                  }}
                  alt={index}
                  src={"." + image.src}
                  onClick={() => this.openImage(index)}
                  role="presentation"
                />
                <span className="meme-bottom-caption">Bottom text</span>
              </div>
            ))}
          </div>
        </div>
        <Modal className="meme-gen-modal" isOpen={this.state.modalIsOpen}>
          <ModalHeader toggle={this.toggle}>Make-a-Meme</ModalHeader>
          <ModalBody>
            <svg
              width={newWidth}
              height={newHeight}
              id="svg_ref"
              ref={el => {
                this.svgRef = el;
              }}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <image
                ref={el => {
                  this.imageRef = el;
                }}
                xlinkHref={this.state.currentImagebase64}
                height={newHeight}
                width={newWidth}
              />
              <text
                style={{
                  ...textStyle,
                  zIndex: this.state.isTopDragging ? 4 : 1
                }}
                x={this.state.topX}
                y={this.state.topY}
                dominantBaseline="middle"
                textAnchor="middle"
                onMouseDown={event => this.handleMouseDown(event, "top")}
                onMouseUp={event => this.handleMouseUp(event, "top")}
              >
                {this.state.toptext}
              </text>
              <text
                style={textStyle}
                dominantBaseline="middle"
                textAnchor="middle"
                x={this.state.bottomX}
                y={this.state.bottomY}
                onMouseDown={event => this.handleMouseDown(event, "bottom")}
                onMouseUp={event => this.handleMouseUp(event, "bottom")}
              >
                {this.state.bottomtext}
              </text>
            </svg>
            <div className="meme-form">
              <FormGroup>
                <Label for="toptext">Top Text</Label>
                <input
                  className="form-control"
                  type="text"
                  name="toptext"
                  id="toptext"
                  placeholder="Add text to the top"
                  onChange={this.changeText}
                />
              </FormGroup>
              <FormGroup>
                <Label for="bottomtext">Bottom Text</Label>
                <input
                  className="form-control"
                  type="text"
                  name="bottomtext"
                  id="bottomtext"
                  placeholder="Add text to the bottom"
                  onChange={this.changeText}
                />
              </FormGroup>
              <button
                onClick={() => this.convertSvgToImage()}
                className="btn btn-primary"
              >
                Download Your Meme
              </button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default MemeApp;
