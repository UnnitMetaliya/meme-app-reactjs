import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  NavbarBrand
} from "reactstrap";

const photos = [
  { src: "/images/disaster.jpg" },
  { src: "/images/chairtable.jpg" },
  { src: "/images/chuck-norris.jpg" },
  { src: "/images/civil-war.jpg" },
  { src: "/images/creepy-smirk.jpg" },
  { src: "/images/crying-woman.jpg" },
  { src: "/images/cute-baby.jpg" },
  { src: "/images/doubtful-kid.jpg" },
  { src: "/images/eyyy.jpg" },
  { src: "/images/idareyou.jpg" },
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
  { src: "/images/social-awkward.jpg" },
  { src: "/images/steve.jpg" },
  { src: "/images/whaaaat.jpg" },
  { src: "/images/yessss.jpg" },
  { src: "/images/bad-luck.jpg" }
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

  openImage = index => {
    const image = photos[index];
    const base_image = new Image();
    base_image.src = image.src;
    const currentImagebase64 = this.getBase64Image(base_image); // a function to convert image into data URI

    // working with currently selected image
    this.setState(prevState => ({
      currentImage: index,
      modalIsOpen: !prevState.modalIsOpen,
      currentImagebase64,
      ...initialState
    }));
  };

  render() {
    return (
      <div className="content">
        {/* Creating the image gallery */}

        {photos.map((image, index) => (
          <div className="image-holder" key={image.src}>
            <span className="meme-top-caption">Top Text</span>
            <img
              style={{ width: "100%", cursor: "pointer", height: "100%" }}
              alt={index}
              src={image.src}
              role="presentation"
              onClick={() => this.openImage(index)} // click event for opening the selected image
            />
            <span className="meme-bottom-caption">Bottom Text</span>
          </div>
        ))}
      </div>
    );
  }
}
export default MemeApp;
