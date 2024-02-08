import React, { useState, useEffect } from "react";

export default function DelayedSuccessMessage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMessage(
        "Thanks for leaving a comment! People like you make our community grow!"
      );
    }, 2000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return <p>{message}</p>;
}
