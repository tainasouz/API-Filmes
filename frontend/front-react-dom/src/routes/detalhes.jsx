
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import HeaderDetalhes from '../components/HeaderDetalhes'
import BodyDetalhes from '../components/BodyDetalhes';
function Detalhes() {

    const { id, type } = useParams()

    const[query, setQuery] = useState('')

    return (
        <>
            <HeaderDetalhes id={id} type={type} />
            <BodyDetalhes id={id} type={type}/>
        </>

    );


}
export default Detalhes