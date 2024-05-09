import React, { useState } from "react";
import GlobalContext from "./Context";

export default function ContextWrapper(props) {
  const [rooms, setRooms] = useState([]);
  const [unfilteredRooms, setUnfilteredRooms] = useState([]);
  return (
    <GlobalContext.Provider
      value={{ rooms, setRooms, unfilteredRooms, setUnfilteredRooms }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}