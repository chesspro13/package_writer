import { useState } from "react";
import NavigationBar from "../../Components/Header/NavigationBar";
import "./Support.css";
import Footer from "../../Components/Footer/footer";
import Coffee from "../../Coffee/coffee";

function Support() {
  const [a, doA] = useState(false);

  // Typescript complains if "a" isn't reffrenced anywhere.
  a;

  return (
    <>
      <NavigationBar allowSidebar={false} />
      <div className="explination">
        <div className="text">
          <h1>Hi, I'm Brandon, the developer behind PackageWriter.com.</h1>
          <p>
            Like a lot of you, Active Duty keeps me quite busy during the duty
            day. Making time to develop this tool on my off time is a challenge,
            but I'm committed to making <i>PackageWriter.com</i> the best it can
            be.
          </p>
          <p>
            Your support becomes a crucial factor in this journey, allowing me
            to dedicate more time outside my 9-to-5 to enhance and refine
            <i>PackageWriter.com</i>.
          </p>
          <p>
            Whether it's a small contribution or a more substantial one, your
            support directly fuels the progress of <i>PackageWriter.com</i>. It
            enables me to focus on meaningful updates and improvements during my
            limited free time.
          </p>
          <p>
            Thank you for understanding and being part of this collaborative
            effort. With your support, we can take <i>PackageWriter.com</i> to
            new heights.
          </p>
        </div>
        <Coffee />
      </div>
      <Footer />
    </>
  );
}

export default Support;
