import './style.css';
import React, { FormEventHandler, useState } from 'react';
// import Logo from '../../assets/img/WatchMR.png'
import { IconContext } from "react-icons";
import { IoSearch } from 'react-icons/io5'
import { NavbarType } from '../../type';



function Navbar({ setQuery }: NavbarType) {

    const [input, setInput] = useState('')

    const handleSubmit = (event:React.FormEvent<HTMLFormElement> ) => {
        // event.preventDefault()
        setQuery(input)
    }

    
    return (

        <div id="navbar">
            <div className="div-logo-menu">
                <a href={'/'} className="logo">
                    {/* <img src={Logo} alt="" srcSet="" /> */}
                </a>

            </div>

            <div className="div-pesquisa">
                <form action="/pesquisa" method="get" className="pesquisa" onSubmit={(event) =>{handleSubmit(event)}}>
                    <input type="text" placeholder="Pesquisar" name="search" value={input} onChange={(event) => { setInput(event.target.value)}} />
                    <button title="botao-pesquisa">
                        <IconContext.Provider value={{ style: { color: 'white', fontSize: '20px' } }}>
                            <IoSearch />
                        </IconContext.Provider>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Navbar;
function setState(arg0: string): [any, any] {
    throw new Error('Function not implemented.');
}

