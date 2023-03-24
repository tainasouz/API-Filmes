
import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import BodyPesquisa from '../components/BodyPesquisa';

function Pesquisa() {

    const query = new URLSearchParams(location.search).get('search');
    console.log(query);

    return (
        <>
            <Navbar backgrounColor="#ff0000"/>
            <BodyPesquisa query={query} />
        </>
    );
}
export default Pesquisa