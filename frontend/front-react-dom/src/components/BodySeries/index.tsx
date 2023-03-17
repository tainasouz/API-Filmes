import React, { useEffect, useState } from 'react';
import './style.css';
import { SeriesPopulares } from '../../type';
import Card from '../Card';


function BodyFilmes() {
    const [state, setState] = useState<Array<SeriesPopulares>>([])
    useEffect(() => {
        fetch("http://localhost:3000/carregaSeries")
            .then(res => res.json())
            .then((series: SeriesPopulares[]) => {
                setState(series);

            })
    }, [])


    return (
        <div>
            <div id="series">
                <div className="sessao">
                    <h1 className="titulo-cards text-2xl">
                        Séries
                    </h1>
                </div>
                <div className='cards-program '>
                    {
                        state.length === 0
                            ? <></>
                            // ?  Array.from({length: 10}).map(() => <SkeletonTeste />)

                            : state.map((serie) => {
                                return (
                                    <Card id={serie.id} poster_path={serie.poster_path} title={serie.name} vote_average={serie.vote_average} genres={serie.genres} type={"tv"}/>
                                )
                            })

                    }
                </div>
            </div>
        </div>

    )
}

export default BodyFilmes;