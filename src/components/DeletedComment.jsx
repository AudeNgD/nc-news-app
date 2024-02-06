import { useContext, useEffect, useState } from "react";

export default function DeletedComment() {
  const [deletedMessage, setDeletedMessage] = useState(
    "This comment has been deleted"
  );

  useEffect(() => {
    const timeOutMsg = setTimeout(() => {
      setDeletedMessage(null);
    }, 3000);
    return () => clearTimeout(timeOutMsg);
  }, []);

  return <p>{deletedMessage}</p>;
}
