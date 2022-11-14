import React from "react";
import Card from "react-bootstrap/Card";
import bike from "./bike.jpeg";
import logo from "../yatri.png";
import { useNavigate } from "react-router-dom";
import Sidiebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container mt-5">
        <Card.Title className="text-center">
          <img
            src={logo}
            alt="logo.png"
            height={"200px"}
            width={"200px"}
            onClick={() => navigate("/dashboard/home")}
            style={{ cursor: "pointer", margin: "0" }}
          />
          <img src={bike} alt="logo.png" height={"600px"} width={"100%"} />
          <br />
        </Card.Title>
        <p style={{ color: "rgb(0, 204, 204)" }}>ABOUT YATRI</p>
        <Card.Text>
          Yatri was founded in 2017 to prove world-class electric vehicles can
          be designed, engineered and manufactured from the ground up in Nepal -
          that switching to electric does not have to be a compromise but
          better, quicker and kinder to the planet.
        </Card.Text>
        <h2>We exist to reinvent urban mobility.</h2>
        <Card.Text style={{ marginTop: "10px" }}>
          Yatri’s vision to reinvent urban mobility landscape means creating an
          entire sustainable ecosystem of products and services. Besides
          electric vehicles, Yatri manufactures charging wall modules, fast
          chargers and seamless service architecture to tie everything together
          into Yatri Hub. Besides the flagship Project Zero, Yatri will expand
          its product line to a rapidly scalable vehicles from summer 2021 into
          other exciting market segments. These products will help save over NPR
          200,000 over five year period on fuel costs alone and zero maintenance
          adds to that further. Ultimately, the final piece in the reinvention
          is the public transportation segment where Yatri will bring the
          product and service game to a different league. Summer 2021 and beyond
          will see rapidly growing strong network of Yatri Fast Chargers across
          the nation while advent of affordable and exciting products available
          to more and more people; and emerging mega hydropower projects means
          an ecosystem that is sustainable and nation changing. A milestone and
          future we look forward to at Yatri.
        </Card.Text>
        <p style={{ color: "rgb(0, 204, 204)" }}>10 years roadmap</p>
        <Card.Text>
          Yatri’s focus from day one has been to develop systems and
          technologies in-house from the ground up. This approach gives the team
          the freedom to take on broad mobility challenges that will bring real
          impact.
        </Card.Text>
        <Card.Text>
          We envision that in the coming decade we will produce the most
          affordable two wheeler accessible to more and more people. However, in
          the phase 2, we will shift our focus to the root of the urban mobility
          problem. We believe public transportation should be a matter of civic
          pride for the inhabitants of the city, and to some extent, public
          transportation is a reflection of the city and its inhabitants.
        </Card.Text>
        <Card.Text>
          Our goal is to uplift and bring public transportation to a new level
          with reliability, safety and finest user experience. We believe this
          will create an ecosystem of products and services that will enable
          seamless transition into electric mobility!
        </Card.Text>
      </div>
      <Footer />
    </>
  );
};

export default About;
