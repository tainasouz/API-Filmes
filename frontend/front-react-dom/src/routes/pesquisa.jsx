
import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import BodyPesquisa from '../components/BodyPesquisa';

function Pesquisa() {

    const query = new URLSearchParams(location.search).get('search');

    return (
        <>
        <div className="header" style={{backgroundColor: 'black'}}>
            <Navbar color="#0e0e0e"/>
        </div>
            
            <BodyPesquisa query={query} />
        </>
    );
}
export default Pesquisa