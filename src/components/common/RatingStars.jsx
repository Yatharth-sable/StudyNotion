import React from "react";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";

function RatingStars({ rating = 0, size = 20 }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  return (
    <div className="flex gap-1 text-yellow-100">
      {[...Array(full)].map((_, i) => (
        <TiStarFullOutline key={`full-${i}`} size={size} />
      ))}
      {[...Array(half)].map((_, i) => (
        <TiStarHalfOutline key={`half-${i}`} size={size} />
      ))}
      {[...Array(empty)].map((_, i) => (
        <TiStarOutline key={`empty-${i}`} size={size} />
      ))}
    </div>
  );
}

export default RatingStars;
