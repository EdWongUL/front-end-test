import './App.css';
import { useState, useEffect } from 'react';
import background1 from './background1.png';
import background2 from './background2.png';
import background3 from './background3.png';
import contactArrow from './contactArrow.svg';
import scrollArrow from './scrollArrow.svg';


function Carousel(props) {
  const [index, setIndex] = useState(0);
  const length = props.slides.length;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((index+1)%length);
    }, 3000);
    return () => {
      clearTimeout(timeout)
    }
  }, [index]);

  const handleChangeIndex = (idx) => {
    console.log(idx);
    setIndex(idx);
  }

  const cards = [];
  const backgrounds = [];

  for (let i = 0; i < length; i++) {
    cards.push(
      <div className="cardContainer" key={i}>
        <button
          className={`dot outer ${index===i ? 'active' : ''}`}
          style={{
            pointerEvents: 'none' // this removes buttons buttonness
          }}
        />
        <button
          className={`dot inner ${index===i ? 'active' : ''}`}
          onClick={() => handleChangeIndex(i)}
        />
        <h3>{props.slides[i].title}</h3>
        <p>{props.slides[i].excerpt}</p>
        <button className="cta card">
          <div className="insideButton">
            <span>{props.slides[i].cta.label}</span>
            <img src={contactArrow} />
          </div>
        </button>
      </div>
    );

    backgrounds.push(
      <div className="backgrounds" style={{
        backgroundImage:`url(${props.slides[i].backgroundImage})`,
        opacity: `${index === i ? 1 : 0}`,
      }} key={i}>
      </div>
    );
  }

  // render all of the backgrounds at once and change between opacities
  // <img className="scrollArrow" scr={scrollArrow} />
  return (
      <div className="container">
      {backgrounds}
        <div className="topPart">
          <h1>{props.heading}</h1>
          <button className="cta contact">
            <div className="insideButton">
              <span>{props.cta.label}</span>
              <img src={contactArrow} />
            </div>
          </button>
        </div>
        <div className="bottomPart">
          <hr/>
          {cards}
        </div>
      </div>
    );
}


function App() {
  return (
    <div className="App" >
      <Carousel
        heading="See the Big Picture, Act on the Small Details"
        cta={{label:"Contact Us", url:""}}
        slides={[
          {
            title:"Insight Title Goes Here",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed massa blandit nisl.",
            backgroundImage: background1,
            cta:{
              label: "Read now",
              url: ""
            }
          },
          {
            title:"Model Title Goes Here",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed massa blandit nisl.",
            backgroundImage: background2,
            cta:{
              label: "View now",
              url: ""
            }
          },
          {
            title:"Latest Webinar Sign Up",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed massa blandit nisl.",
            backgroundImage: background3,
            cta:{
              label: "Register now",
              url: ""
            }
          },
        ]}
      />
    </div>
  );
}

export default App;
