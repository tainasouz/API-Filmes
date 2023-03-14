export type PropsType = {
    nome: string,
    tipo: 'EN' | 'PT';
}

const Teste = ({ nome, tipo }: PropsType) => {

    return (
        <div className="teste" style={{ border: '1px solid green', padding: '1em', margin: '1em' }}>
            Nome: {nome}
            <br />
            Tipo: {tipo}
        </div>
    )
}

type SkeletonType = {
    qtd: number;
}

export const SkeletonTeste = ({ qtd }: SkeletonType) => {


    return (
        <>
            {Array.from({ length: qtd }).map(() =>
                <div className="teste" style={{ border: '1px solid green', padding: '1em', margin: '1em' }}>
                    <div className="skeleton skeleton-text skeleton-titulo-card"></div>
                    <div className="skeleton skeleton-text skeleton-titulo-card"></div>
                </div>
            )}
        </>

    )
}

export default Teste;