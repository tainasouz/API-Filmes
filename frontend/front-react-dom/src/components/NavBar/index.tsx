import React, { useEffect, useState } from 'react';
import './style.css';
import Logo from '../../assets/img/WatchMR.png'
import { IconContext } from "react-icons";
import { IoSearch } from 'react-icons/io5'


function Navbar() {

    return (

        <div id="navbar">
            <div className="div-logo-menu">
                <a href="./index.html" className="logo">
                    <img src={Logo} alt="" srcSet="" />
                </a>

            </div>

            <div className="div-pesquisa">
                <form action="/frontend/pesquisa.html" method="get" className="pesquisa">
                    <input type="text" placeholder="Pesquisar" name="search" />
                    <button title="butao-pesquisa">
                        <IconContext.Provider value={{ style: { color: 'white', fontSize: '20px' } }}>
                            <IoSearch />
                        </IconContext.Provider>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Navbar;
