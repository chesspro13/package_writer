import { useState } from "react";
import NavigationBar from "../Components/Header/NavigationBar";
import "./about.css";
import Footer from "../Components/Footer/footer";

function About() {
  const [a, doA] = useState(0);
  return (
    <>
      <NavigationBar setCharacterLimit={doA} showCharacters={false} />
      <div className="explination">
        <h1>{a ? "What is this?" : "What is this?"}</h1>
        <p>
          I have found that when making packages or EPB's the best way for me to
          do it is to be able to see all of my previous revisions so I have
          something to fall back on.
        </p>
        <h2>I like this. What can I do to help?</h2>
        <p>
          This tool is in the MVP (Minimum Viable Product) stage of development.
          Feature requests, bug reports, or kudos are always appreciated.
        </p>
        <p>
          You can contact me at <address>brandon@mauldin314.com</address>
          Or buy me a{" "}
          <a href="https://www.buymeacoffee.com/bmauldin">coffee.</a>
        </p>
      </div>
      <Footer />
    </>
  );
}

export default About;
