const urlFilme = "https://api.themoviedb.org/3/movie/popular?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR&page="
const urlProgramTV = "https://api.themoviedb.org/3/tv/popular?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR&page="

const urlDestaque = "https://api.themoviedb.org/3/discover/movie?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR&region=BR&sort_by=popularity.desc&page=1&year=2023&vote_average.lte=8&with_watch_monetization_types=flatrate"


window.onload = () => {
    carregarFilmes()
    carregarProgramTV()
    carregarDestaque()
}


function carregarFilmes() {
    let htmlFilmes = ``

    fetch(`http://localhost:3000/carregaFilmes`)
        .then(res => res.json())
        .then(movies => {
            for (let i = 0; i < 12; i++) {

                const filme = movies[i]

                htmlFilmes += `
                <div class="card">
                        <div class="img-card">
                            <a href="/frontend/detalhes.html?id=${filme.id}&type=movie" class="link-img">
                                <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" alt="${filme.title}">
                            </a>
                        
                        </div>
                        <div class="info-card">
                            <a href="/frontend/detalhes.html?id=${filme.id}&type=movie" class="titulo-card">${filme.title}</a>
                            <h4 class="genero-card" id="card-${filme.id}"></h4>
                            <div class="avaliacao-card">
                                <i class="fi fi-rr-star estrela"></i>
                                <h4 class=num-card>${filme.vote_average}</h4>
                            </div>
                        </div>
                    </div>`

                document.querySelector(".cards-filme").innerHTML = htmlFilmes
                carregaGeneros(filme.id, `#card-${filme.id}`, "movie")

            }

        })
}

function carregarProgramTV() {
    let htmlPrograms = ``


    fetch(`http://localhost:3000/carregaSeries`)
        .then(res => res.json())
        .then(series => {


            for (let i = 0; i < 12; i++) {

                const serie = series[i]

                htmlPrograms += `
                <div class="card">
                <div class="img-card">
                <a href="/frontend/detalhes.html?id=${serie.id}&type=tv" class="link-img">
                    <img src="https://image.tmdb.org/t/p/w500/${serie.poster_path}" alt="${serie.title}">
                </a>
                    
                </div>
                <div class="info-card">
                    <a href="/frontend/detalhes.html?id=${serie.id}&type=tv" class="titulo-card">${serie.name}</a>
                    <h4 class="genero-card" id="card-${serie.id}"></h4>
                    <div class="avaliacao-card">
                        <i class="fi fi-rr-star estrela"></i>
                        <h4 class=num-card>${serie.vote_average}</h4>
                    </div>
                </div>
            </div>`
                carregaGeneros(serie.id, `#card-${serie.id}`, "tv")
            }

            document.querySelector(".cards-program").innerHTML = htmlPrograms

        })
}

function carregarDestaque() {

    let htmlDestaque

    fetch("http://localhost:3000/carregaDestaque")
        .then(res => res.json())
        .then(destaque => {

            htmlDestaque = `
                <a href="/frontend/detalhes.html?id=${destaque.id}&type=movie" class="titulo-destaque">${destaque.title}</a>
                <p class="descricao "> ${destaque.overview}</p>
                <div class="avaliacao-card">
                    <i class="fi fi-rr-star estrela"></i>
                    <h4 class=num-card>${destaque.vote_average}</h4>
                </div>`


            let divFilmeDestaque = document.querySelector("#filme-destaque")
            divFilmeDestaque.innerHTML = htmlDestaque

            let header = document.getElementById('header')

            header.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original${destaque.backdrop_path})`
            header.style.backgroundSize = "cover"
        })

}


function carregaGeneros(idFilme, id, type) {
    return fetch(`http://localhost:3000/carregaGenero/${type}/${idFilme}`)
        .then(res => res.json())
        .then(generos => {
            document.querySelector(id).innerHTML = generos.slice(0, 4).join(", ")
        })
}