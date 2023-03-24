import { useEffect, useState } from 'react';
import { ResultadoPesquisa } from '../../type';
import './style.css'

interface PesquisaType {
    query: string;
}



function BodyPesquisa({ query }: PesquisaType) {

    const [state, setState] = useState<Array<ResultadoPesquisa>>([])
    useEffect(() => {
        fetch(`http://localhost:3000/pesquisa/${query}/1`)
            .then(res => res.json())
            .then((resultado: ResultadoPesquisa[]) => {
                setState(resultado);
            })
    }, [query])

    return (
        <>
            <div className="titulo ">Resultados para {query}</div>
            <div className="resultados">
                {JSON.stringify(state)}
            </div>
        </>
    );
}

export default BodyPesquisa