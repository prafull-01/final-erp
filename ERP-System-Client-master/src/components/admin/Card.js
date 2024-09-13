import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, description, link, imgSrc }) => {
  return (
    <div className="aspect-w-1 aspect-h-1 rounded overflow-hidden shadow-lg m-4 bg-white">
      <Link to={link} className="block text-center no-underline h-full">
        {/* <div className="p-4">
          <img src={imgSrc} alt={title} className="mx-auto max-w-full h-auto" />
        </div> */}
        <div className="p-4 flex flex-col justify-center h-full">
          <strong className="text-lg block">{title}</strong>
        </div>
      </Link>
    </div>
  );
};

export default Card;