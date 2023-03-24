import React, { useEffect, useState } from 'react';
import './style.css';
import { FilmesPopulares } from '../../type';
import { IconContext } from "react-icons";
import { FaStar } from 'react-icons/fa'
import { IoSearch, IoStar } from 'react-icons/io5'
import Navbar from '../NavBar';


function Header() {
    const [state, setState] = useState<FilmesPopulares | null>(null)
    useEffect(() => {
        fetch("http://localhost:3000/carregaDestaque")
            .then(res => res.json())
            .then((destaque: FilmesPopulares) => {
                setState(destaque);
            })
    }, [])


    return (
        <div
            id="header"
            className="skeleton-destaque"
            style={{
                background: `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)) ${state?.backdrop_path ? `, url(https://image.tmdb.org/t/p/original${state.backdrop_path})` : ''}`,
                backgroundSize: state?.backdrop_path ? "cover" : ''
            }}
        >
            <Navbar />

            <div id="filme-destaque">
                {
                    state === null
                        ? <>
                            <a href="">
                                <div className="skeleton skeleton-text skeleton-titulo-destaque"></div>
                            </a>
                            <h2 className="text-2xl">
                                <div className="skeleton skeleton-text skeleton-text__body"></div>
                                <div className="skeleton skeleton-text skeleton-text__body"></div>
                                <div className="skeleton skeleton-text skeleton-text__body"></div>
                                <div className="skeleton skeleton-text skeleton-text__body"></div>
                            </h2>
                            <p className="descricao"> </p>
                            <div className="avaliacao-card">
                                <div className="skeleton skeleton-text skeleton-text-classNameificacao-destaque"></div>
                            </div>
                        </>
                        : <>
                            <a href={`/detalhes/${state.id}/movie`}
                            className="titulo-destaque">{state.title}</a>
                            <p className="descricao "> {state.overview}</p>
                            <div className="avaliacao-card">
                                <IconContext.Provider value={{ style: { color: 'ffd900', fontSize: '20px' } }}>
                                    <IoStar />
                                </IconContext.Provider>
                                <div className="num-card">{state.vote_average}</div>
                            </div>
                        </>
                }
        </div>
        </div >
    );
}

export default Header;
