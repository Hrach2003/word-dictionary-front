import React from "react";
import qs from 'querystring'
import { useLocation, useParams } from "react-router-dom";
const isDev = process.env.NODE_ENV === "development";

const BookView = () => {
  const { name } = useParams() as { name: string };
  const { search } = useLocation()
  const url = qs.parse(search)['?url']

  console.log(url)
  return (
    <iframe
      className="fixed bottom-0 inset-x-0 w-screen h-full z-20"
      src={`${isDev ? "http://localhost:4000" : ""}${url}`}
      title={name}
    ></iframe>
  );
};

export { BookView as default };
