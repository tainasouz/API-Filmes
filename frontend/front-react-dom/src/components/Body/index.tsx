import React from 'react';
import './style.css'
import BodyFilmes from '../BodyFilmes/index';
import BodySeries from "../BodySeries/index";

function BodyDetalhes() {
  return (
    <div id='body'>
        <BodyFilmes/>
        <BodySeries/>
    </div>

  );
}

export default BodyDetalhes;
