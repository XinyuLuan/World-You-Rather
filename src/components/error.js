import React from "react";
import Title from "./title";

export default function Error({ title, text }) {
  return (
    <>
      <Title>Error{title ? ` ${title}` : ""}</Title>
      <div className="text-center">{text}</div>
    </>
  );
}
