import Header from "../components/Header";
import Body from '../components/Body'
import React, { useState } from 'react';


function Root() {

  const[query, setQuery] = useState('')

  return (
    <>
      <Header setQuery={setQuery}/>
      <Body/>
    </>

  );
}

export default Root;
