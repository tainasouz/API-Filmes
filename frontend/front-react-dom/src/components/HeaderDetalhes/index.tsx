import React, { useEffect, useState } from 'react';
import './style.css';
import { FilmesPopulares } from '../../type';
import { IconContext } from "react-icons";
import { FaStar } from 'react-icons/fa'
import { IoSearch, IoStar } from 'react-icons/io5'
import Navbar from '../NavBar';


function HeaderDetalhes() {

    return (
        <div
            id="header"
            className="skeleton-destaque"
            // style={{
            //     background: `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)) ${state?.backdrop_path ? `, url(https://image.tmdb.org/t/p/original${state.backdrop_path})` : ''}`,
            //     backgroundSize: state?.backdrop_path ? "cover" : ''
            // }}
        >
            <Navbar />

            
        </div>
    );
}

export default HeaderDetalhes;
