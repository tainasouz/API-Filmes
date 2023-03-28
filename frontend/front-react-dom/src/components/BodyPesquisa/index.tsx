import { useEffect, useState } from 'react';
import { ResultadoPesquisa } from '../../type';
import Card from '../Card';
import Loader from '../Loader';
import './style.css'

interface PesquisaType {
    query: string;
}



function BodyPesquisa({ query }: PesquisaType) {

    const [state, setState] = useState<Array<ResultadoPesquisa> | null>(null)
    useEffect(() => {
        fetch(`http://localhost:3000/pesquisa/${query}/1`)
            .then(res => res.json())
            .then((resultado: ResultadoPesquisa[]) => {
                setState(resultado);
            })
    }, [query])

    if (state !== null) {
        state.sort(function (a, b) {

        if (a.vote_count < b.vote_count) {
            return 1;
        }
        if (a.vote_count > b.vote_count) {
            return -1;
        }
        if (a.vote_average < b.vote_average) {
            return 1;
        }
        if (a.vote_average > b.vote_average) {
            return -1;
        }

        return 0;
    });
    }


    return (
        <div className="body">
            {
                state === null
                    ?
                    <Loader/>
                    :
                    state.length === 0
                        ?
                        <div className="titulo ">Não foi encontrado nenhum resultado para '{query}'</div>
                        :
                        <>
                            <div className="titulo ">Resultados para '{query}'</div>
                            <div className="resultados">
                                {
                                    state.map((resultado) => {
                                        return (
                                            <Card key={`${resultado.id}-${resultado.media_type}-${resultado.name || resultado.title}`} id={resultado.id} poster_path={resultado.poster_path} title={resultado.title || resultado.name} vote_average={resultado.vote_average} type={resultado.media_type} />
                                        )
                                    })
                                }
                            </div>
                        </>

            }

        </div>
    );
}

export default BodyPesquisa