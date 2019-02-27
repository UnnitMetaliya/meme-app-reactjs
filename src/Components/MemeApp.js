import React from "react";

const photos = [
  { src: "/images/big-eye-girl.jpg" },
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
  { src: "/images/yessss.jpg" }
];

class MemeApp extends React.Component {
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
            />
            <span className="meme-bottom-caption">Bottom Text</span>
          </div>
        ))}
      </div>
    );
  }
}
export default MemeApp;
