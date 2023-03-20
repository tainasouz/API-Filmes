
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import HeaderDetalhes from '../components/HeaderDetalhes'

function Detalhes() {

    const {id, type} = useParams()

    return (
        <HeaderDetalhes id={id} type={type} />
    );


}
export default Detalhes