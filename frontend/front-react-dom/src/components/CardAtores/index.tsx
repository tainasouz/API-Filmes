import React, { useEffect, useState } from 'react';
import { IconContext } from "react-icons";
import { IoStar } from 'react-icons/io5'
import './style.css';

export type CardAtoresType = {
    character: string,
    id: number;
    name: string;
    profile_path?: string;


}

function CardAtores({ character, id, name, profile_path }: CardAtoresType) {

    return (

        <div className="card">
            <div className="cartaz-autor">
            <img src={`https://image.tmdb.org/t/p/w500/${profile_path}`} alt={name} />
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

export function SkeletonCard({ qtd }: SkeletonCard) {
    return (
        <>

            {
                Array.from({ length: qtd }).map(() =>
                    <div className="card">
                        <div className="img-card">
                            <img className="skeleton" id="logo-img" alt="" />
                        </div>
                        <div className="info-card">
                            <h3 className="titulo-card">
                                <div className="skeleton skeleton-text skeleton-titulo-card"></div>
                            </h3>
                            <h4 className="genero-card">
                                <div className="skeleton skeleton-text skeleton-text__body"></div>
                            </h4>
                            <div className="avaliacao-card">
                                <div className="skeleton skeleton-text skeleton-text-classificacao"></div>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default CardAtores