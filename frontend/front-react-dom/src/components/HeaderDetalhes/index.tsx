import React, { useEffect, useState } from 'react';
import { Detalhes } from '../../type';
import './style.css';
import Navbar from '../NavBar';
import NavDetalhes from '../Detalhes';

export type Params = {
    id: number,
    type: "movie" | "tv",
}


function HeaderDetalhes({ id, type }: Params) {

    const [state, setState] = useState<Detalhes | null>(null)
    useEffect(() => {
        fetch(`http://localhost:3000/detalhes/${type}/${id}`)
            .then(res => res.json())
            .then((destalhes: Detalhes) => {
                setState(destalhes);
            })
    }, [])

    return (
        <div className="header"
            style={{
                background: `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)) ${state?.backdrop_path ? `, url(https://image.tmdb.org/t/p/original${state.backdrop_path})` : ''}`,
                backgroundSize: state?.backdrop_path ? "cover" : ''
            }}>
            <Navbar />
            {
                state === null
                    ? <></>
                    :
                    <NavDetalhes certification={state.certification} genres={state.genres} overview={state.overview} poster_path={state.poster_path} release_date={state.release_date} title={state.title} vote_average={state.vote_average} />



            }
        </div>


        /* </div><div className="detalhes">
                    <div className="cartaz">
                        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
                    </div>
                    <div className="infos">
                        <div className="titulo-min-infos">
                            <div className="titulo">
                                {title}
                            </div>
                            <div className="data-genero">
                                <div className="data-lancamento">{new Date(release_date).toLocaleDateString()}</div>
                                <div className="genero">{genres.join(', ')}</div>
                                {Notification.rating == "" ?
                                    <></>
                                    :
                                    <div className="classificao-indicativa">
                                        {certification.iso_3166_1 == "BR" ?
                                            `${certification.rating}`
                                            :
                                            `${certification.rating} (${certification.iso_3166_1})`}
                                    </div>}

                            </div>
                        </div>
                        <div className="sinopse-classificacao">
                            <div className="sinopse">
                                {overview}
                            </div>
                            <div className="classificacao">
                                {vote_average.toFixed(1)}
                            </div>
                        </div>
                    </div>
                </div> */
    );
}

export default HeaderDetalhes;
