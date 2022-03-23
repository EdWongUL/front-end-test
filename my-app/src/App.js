import "./App.css";
import { useState, useEffect } from "react";
import background1 from "./background1.png";
import background2 from "./background2.png";
import background3 from "./background3.png";
import contactArrow from "./contactArrow.svg";
import scrollArrow from "./scrollArrow.svg";
import buttonArrow from "./buttonArrow.svg";

function Carousel(props) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const length = props.slides.length;

  useEffect(() => {
    setTimeout(() => setPlaying(true), 7000);
  }, []);

  useEffect(() => {
    if (!playing) {
      return;
    }
    const timeout = setTimeout(() => {
      setIndex((index + 1) % length);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [index, playing]);

  const handleChangeIndex = (idx) => {
    setIndex(idx);
  };

  const handleArrowIndex = (forwards) => {
    const increment = forwards ? 1 : -1;
    setIndex((index + increment + length) % length);
  };

  const cards = [];
  const backgrounds = [];

  for (let i = 0; i < length; i++) {
    cards.push(
      <div className={`cardContainer ${index === i ? "active" : ""}`}>
        <button
          className={`dot outer ${index === i ? "active" : ""}`}
          style={{
            pointerEvents: "none", // this removes buttons buttonness
          }}
        />
        <button
          className={`dot inner ${index === i ? "active" : ""}`}
          onClick={() => handleChangeIndex(i)}
        />
        <h3>{props.slides[i].title}</h3>
        <p>{props.slides[i].excerpt}</p>
        <button className="cta card">
          <div className="insideButton">
            <span className="cardText">{props.slides[i].cta.label}</span>
            <img className="cardArrow" src={contactArrow} />
          </div>
        </button>
      </div>
    );

    backgrounds.push(
      <div
        className="backgrounds"
        style={{
          backgroundImage: `url(${props.slides[i].backgroundImage})`,
          opacity: `${index === i ? 1 : 0}`,
        }}
      ></div>
    );
  }

  // render all of the backgrounds at once and change between opacities
  // <img className="scrollArrow" scr={scrollArrow} />
  return (
    <div className="outerContainer">
      {backgrounds}
      <div className="container">
        <div className="topPart">
          <h1>{props.heading}</h1>
          <button className="cta contact">
            <div className="insideButton">
              <span className="contactText">{props.cta.label}</span>
              <img className="contactArrow" src={contactArrow} />
            </div>
          </button>
        </div>
        <div className="bottomPart">
          <hr />
          {cards}
          <div className="scroll">
            <img className="scrollImage" src={scrollArrow} />
            <h4 className="scrollText">Scroll for more</h4>
          </div>
        </div>
        <div className="mobileBottom">
          <button
            className="mobileButton left"
            onClick={() => handleArrowIndex(false)}
          >
            <img className="buttonArrow left" src={buttonArrow} />
          </button>
          {cards}
          <button
            className="mobileButton right"
            onClick={() => handleArrowIndex(true)}
          >
            <img className="buttonArrow right" src={buttonArrow} />
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Carousel
        heading="See the Big Picture, Act on the Small Details"
        cta={{ label: "Contact Us", url: "" }}
        slides={[
          {
            title: "Insight Title Goes Here",
            excerpt:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed massa blandit nisl.",
            backgroundImage: background1,
            cta: {
              label: "Read now",
              url: "",
            },
          },
          {
            title: "Model Title Goes Here",
            excerpt:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed massa blandit nisl.",
            backgroundImage: background2,
            cta: {
              label: "View now",
              url: "",
            },
          },
          {
            title: "Latest Webinar Sign Up",
            excerpt:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed massa blandit nisl.",
            backgroundImage: background3,
            cta: {
              label: "Register now",
              url: "",
            },
          },
        ]}
      />
    </div>
  );
}

export default App;
