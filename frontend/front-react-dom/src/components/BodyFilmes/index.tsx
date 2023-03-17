import React, { useEffect, useState } from 'react';
import './style.css';
import { FilmesPopulares } from '../../type';
import Card from '../Card';


function BodyFilmes() {
    const [state, setState] = useState<Array<FilmesPopulares>>([])
    useEffect(() => {
        fetch("http://localhost:3000/carregaFilmes")
            .then(res => res.json())
            .then((filmes: FilmesPopulares[]) => {
                setState(filmes);

            })
    }, [])


    return (
        <div>
            <div id="filmes">
                <div className="sessao">
                    <h1 className="titulo-cards text-2xl">
                        Filmes
                    </h1>
                </div>
                <div className='cards-filme '>
                    {
                        state.length === 0
                            ? <></>
                            // ?  Array.from({length: 10}).map(() => <SkeletonTeste />)

                            : state.map((filme) => {
                                return (
                                    <Card id={filme.id} poster_path={filme.poster_path} title={filme.title} vote_average={filme.vote_average} genres ={filme.genres} type={"movie"}/>
                                )
                            })

                    }
                </div>
            </div>
        </div>
    )
    // return (
    //     <div id="body">

    //         <div id="filmes">
    //             <div className="sessao">
    //                 <h1 className="titulo-cards text-2xl">
    //                     Filmes
    //                 </h1>
    //             </div>
    //             {
    //                 state == null ? (

    //                     <div className="cards-filme ">
    //                         <div className="card">
    //                             <div className="img-card">
    //                                 <img className="skeleton" id="logo-img" alt="" />
    //                             </div>
    //                             <div className="info-card">
    //                                 <h3 className="titulo-card">
    //                                     <div className="skeleton skeleton-text skeleton-titulo-card"></div>
    //                                 </h3>
    //                                 <h4 className="genero-card">
    //                                     <div className="skeleton skeleton-text skeleton-text__body"></div>
    //                                 </h4>
    //                                 <div className="avaliacao-card">
    //                                     <div className="skeleton skeleton-text skeleton-text-classificacao"></div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>

    //                 ) : (


    //                     <div className="cards-filme ">


    //                         <div className="card">
    //                             <div className="img-card">
    //                                 <a href="/frontend/detalhes.html?id=${filme.id}&type=movie" className="link-img">
    //                                     <img src="https://image.tmdb.org/t/p/w500/${state.poster_path}" alt={state.title} />
    //                                 </a>

    //                             </div>
    //                             <div className="info-card">
    //                                 <a href="/frontend/detalhes.html?id=${filme.id}&type=movie" className="titulo-card">{state.title}</a>
    //                                 <h4 className="genero-card" id="card-${filme.id}"></h4>
    //                                 <div className="avaliacao-card">
    //                                     <i className="fi fi-rr-star estrela"></i>
    //                                     <h4 className="">{state.vote_average}</h4>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>

    //                 )
    //             }
    //         </div>
    //     </div>

    // );
}

export default BodyFilmes;