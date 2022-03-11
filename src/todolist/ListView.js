import React, { useState, useEffect } from "react";

async function fetchJson(url) {
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    return error;
    console.log(error);
  }
}

export default function ListView(props) {
  useEffect(() => {
    fetchJson(`ToDoList/getList/088c0ce3-e05f-4347-a06e-a2f7ee9aa33e/`).then(
      (data) => {
        console.log(data),
          setOwnerLists([data.owner]),
          setWriteLists([data.writer]),
          setReadLists([data.reader]);
      }
    );
  }, []);

  return <div className="CreateUser"></div>;
}
