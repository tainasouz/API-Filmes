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

    fetch(urlFilme)
        .then(res => res.json())
        .then(data => data.results)
        .then(movies => {

            movies = movies.filter(filme => filme.vote_average > 5)
            for (let i = 0; i < 12; i++) {

                const filme = movies[i]

                htmlFilmes += `
                <div class="card">
                        <div class="img-card">
                            <a href="/detalhes.html?id=${filme.id}&type=movie" class="link-img">
                                <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" alt="${filme.title}">
                            </a>
                        
                        </div>
                        <div class="info-card">
                            <a href="/detalhes.html?id=${filme.id}&type=movie" class="titulo-card">${filme.title}</a>
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


    fetch(urlProgramTV)
        .then(res => res.json())
        .then(data => data.results)
        .then(results => {

            const programs = results.filter(serie => serie.vote_average > 3)

            for (let i = 0; i < 12; i++) {

                const program = programs[i]

                htmlPrograms += `
                    <div class="card">
                    <div class="img-card">
                    <a href="/detalhes.html?id=${program.id}&type=tv" class="link-img">
                        <img src="https://image.tmdb.org/t/p/w500/${program.poster_path}" alt="${program.title}">
                    </a>
                        
                    </div>
                    <div class="info-card">
                        <a href="/detalhes.html?id=${program.id}&type=tv" class="titulo-card">${program.name}</a>
                        <h4 class="genero-card" id="card-${program.id}"></h4>
                        <div class="avaliacao-card">
                            <i class="fi fi-rr-star estrela"></i>
                            <h4 class=num-card>${program.vote_average}</h4>
                        </div>
                    </div>
                </div>`
                carregaGeneros(program.id, `#card-${program.id}`, "tv")
            }

            document.querySelector(".cards-program").innerHTML = htmlPrograms

        })

}

function carregarDestaque() {

    let htmlDestaque

    fetch(urlDestaque)
        .then(res => res.json())
        .then(data => data.results[0])
        .then(filmeDestaque => {

            htmlDestaque = `
                <a href="/detalhes.html?id=${filmeDestaque.id}&type=movie" class="titulo-destaque">${filmeDestaque.title}</a>
                <p class="descricao"> ${filmeDestaque.overview}</p>
                <div class="avaliacao-card">
                    <i class="fi fi-rr-star estrela"></i>
                    <h4 class=num-card>${filmeDestaque.vote_average}</h4>
                </div>`


            let divFilmeDestaque = document.querySelector("#filme-destaque")
            divFilmeDestaque.innerHTML = htmlDestaque

            let header = document.getElementById('header')

            header.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original${filmeDestaque.backdrop_path})`
            header.style.backgroundSize = "cover"
        })

}


function carregaGeneros(idFilme, id, type) {
    return fetch(`
    https://api.themoviedb.org/3/${type}/${idFilme}?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR`)
        .then(res => res.json())
        .then(data => {

            const generos = data.genres.map(genero => genero.name)
            document.querySelector(id).innerHTML = generos.slice(0, 4).join(", ")
        })


}