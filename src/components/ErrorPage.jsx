import { useState, useEffect } from "react";

export default function ErrorPage(props) {
  console.log(props);
  if (!props.hasOwnProperty("message")) {
    props = { message: "URL not found" };
  }
  const { message } = props;
  return <p>{message}</p>;
}
