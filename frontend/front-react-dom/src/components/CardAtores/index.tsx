
import './style.css';
import User from '../../assets/img/user.png'

export type CardAtoresType = {
    character: string,
    id: number;
    name: string;
    profile_path?: string;


}

function CardAtores({ character, id, name, profile_path }: CardAtoresType) {

    return (

        <div className="cardAtores">
            <div className="cartaz-autor">
                {
                    profile_path !== null
                        ? <img src={`https://image.tmdb.org/t/p/w500/${profile_path}`} alt={name} />
                        :
                        <img src={User} alt={name} />
                }
            </div>
            <div className="nome-ator">
                {name}
            </div>
            <div className="nome-personagem">
                {character}
            </div>
        </div>

    );
}

type SkeletonCard = {
    qtd: number;
}

export function SkeletonCardAtores({ qtd }: SkeletonCard) {

    return (
        <>
            {
                Array.from({ length: qtd }).map(() =>
                    <div className="cardAtores">
                        <div className="cartaz-autor">
                            <img className="skeleton" id="logo-img" alt="" />
                        </div>
                        <div className="nome-ator">
                            <div className="skeleton skeleton-text skeleton-titulo-card"></div>
                        </div>
                        <div className="nome-personagem">
                            <div className="skeleton skeleton-text skeleton-text__body"></div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default CardAtores