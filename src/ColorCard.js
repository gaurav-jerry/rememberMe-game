import React from "react";

export default function ColorCard({ color, flash, clickHandler }) {
  return (
    <div
      onClick={clickHandler}
      className={`card ${color} ${flash ? "flash" : ""}`}
    ></div>
  );
}
