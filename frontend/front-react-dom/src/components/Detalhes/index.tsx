import React, { useEffect, useState } from 'react';
import './style.css';

type CertificationType = {
    iso_3166_1: string,
    certification: string
}

type PropsDetalhes = {
    certification: CertificationType,
    genres: string[],
    overview: string,
    poster_path: string,
    release_date: Date,
    title: string,
    vote_average: number
}


function NavDetalhes({ certification, genres, overview, poster_path, release_date, title, vote_average }: PropsDetalhes) {
    return (

        <div className="detalhes">
            <div className="cartaz">
                <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
            </div>
            <div className="infos">
                <div className="titulo-min-infos">
                    <div className="titulo">
                        {title}
                    </div>
                    <div className="data-genero">
                        {
                            certification.certification == "" ?
                                <></>
                                :
                                <div className="classificao-indicativa">
                                    {
                                        certification.iso_3166_1 == "BR" ?
                                            `${certification.certification}`
                                            :
                                            `${certification.certification} (${certification.iso_3166_1})`


                                    }
                                </div>
                        }
                        <div className="data-lancamento">{new Date(release_date).toLocaleDateString()}</div>
                        <div className="genero">{genres.join(', ')}</div>


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
        </div>
    );
}

export default NavDetalhes;
