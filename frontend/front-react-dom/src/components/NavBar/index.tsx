import './style.css';
import Logo from '../../assets/img/WatchMR.png'
import { IconContext } from "react-icons";
import { IoSearch } from 'react-icons/io5'

interface NavbarProps {
    color?: string;
}

function Navbar() {

    return (
        <div id="navbar">
            <div className="div-logo-menu">
                <a href={'/'} className="logo">
                    <img src={Logo} alt="" srcSet="" />
                </a>

            </div>

            <div className="div-pesquisa">
                <form action="/pesquisa" method="get" className="pesquisa">
                    <input type="text" placeholder="Pesquisar" name="search" />
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

