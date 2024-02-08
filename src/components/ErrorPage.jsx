import { useState, useEffect } from "react";

export default function ErrorPage(props) {
  const { message } = props;
  return <p>{message}</p>;
}
