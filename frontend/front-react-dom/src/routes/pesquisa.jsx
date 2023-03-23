
import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import BodyPesquisa from '../components/BodyPesquisa';

function Pesquisa() {

    const[query, setQuery] = useState('')

    // const query = new URLSearchParams(location.search).get('search');

    return (
        <>
            <Navbar setQuery={setQuery} />
            <BodyPesquisa query={query} />

        </>

    );


}
export default Pesquisa