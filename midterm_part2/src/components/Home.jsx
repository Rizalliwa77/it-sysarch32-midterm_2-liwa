import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-layer">
        <img src="src\components\tt_chine.jpg" alt="Image description"></img>
      <label className="Ancient text-deco color-black fsize-header font-spacing">
      SERGIO
      </label>
      <p className="description"> At SERGIO, we believe that high-end fashion should be accessible to everyone. That's why we're dedicated to bringing our customers the most stylish, on-trend apparel at affordable prices. 
      We take the utmost care in selecting materials of the highest quality, ensuring that each piece not only looks great, but feels great too. We pride ourselves on our attention to detail, with every article 
      of clothing meticulously crafted to perfection. Our team is made up of passionate fashion experts who are here to help you find the perfect outfit for any occasion. 
      Whether you're looking for something casual or dressy, we've got you covered. Thank you for considering SERGIO for all your fashion needs.
 </p>
 <p></p>
      <p className="font-primary fsize-small">
        Dont Have An Account Yet? <Link to="/register">Click Here!</Link>
      </p>
      <p className="font-primary fsize-small">
        Already Have An Account? <Link to="/login">Click Here!</Link>
      </p>
    </div>
  );
}

export default Home;
