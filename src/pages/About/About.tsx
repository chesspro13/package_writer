import { useState } from "react";
import NavigationBar from "../../Components/Header/NavigationBar";
import "./about.css";
import Footer from "../../Components/Footer/footer";

function About() {
  return (
    <>
      <NavigationBar allowSidebar={false} />
      <div className="explination">
        <h2>What is this?</h2>
        <p>This tool was made to streamline writing packages and EPBs! </p>
        <h2>How It Works:</h2>
        <p>
          Craft packages or EPBs effortlessly, utilizing the character counter
          to monitor your input. Stay within the designated limit to maintain a
          smooth workflow. As you work, leverage the revision feature: save your
          work, rework it, and make it even better. This tool empowers you to
          iterate on your results, fostering continuous improvement.
        </p>
        <h2>Current Stage</h2>
        <p>
          This tool is in the Minimum Viable Product (MVP) stage of development.
          Share your feature requests, report bugs, or offer kudos to play a key
          role in its improvement.
        </p>
        <h2>Thank you!</h2>
        <p>
          Thank you for using the tool! Your support is crucial to making this
          tool as good as it can get. Please consider sharing your experience or
          offering support to help it reach new heights.
        </p>
        <h2>Contact me</h2>
        <p>
          To suggest a feature, report a bug, or offer kudos, please contact me
          at
          <address>brandon@mauldin314.com</address>
        </p>
      </div>
      <Footer />
    </>
  );
}

export default About;
