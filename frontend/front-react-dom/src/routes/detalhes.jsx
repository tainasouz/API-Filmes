
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Detalhes() {
    const [state, setState] = useState<Array<>>([])
    useEffect(() => {
        fetch("http://localhost:3000/carregaFilmes")
            .then(res => res.json())
            .then((filme: ) => {
                setState(filme);

            })
    }, [])
    
}
export default Detalhes