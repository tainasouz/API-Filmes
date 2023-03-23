import { useEffect, useState } from 'react';
import { ResultadoPesquisa } from '../../type';
import './style.css'

interface PesquisaType {
    query: string;
}



function BodyPesquisa({ query }: PesquisaType) {

    const [state, setState] = useState<Array<ResultadoPesquisa>>([])
    useEffect(() => {
        // fetch(`http://localhost:3000/pesquisa/${query}/1`)
        //     .then(res => res.json())
        //     .then((resultado: ResultadoPesquisa[]) => {
        //         setState(resultado);

        //     })
        console.log(query)
    }, [query])

    return (
        <>
            <div className="titulo ">Resultados para {query}</div>
            <div className="resultados">

            </div>
        </>
    );
}

export default BodyPesquisa