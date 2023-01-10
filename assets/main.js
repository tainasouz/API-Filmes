let urlFilme = "https://api.themoviedb.org/3/movie/popular?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR&page="
let urlProgramTV = "https://api.themoviedb.org/3/tv/popular?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR&page="

let urlDestaque = "https://api.themoviedb.org/3/discover/movie?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR&region=BR&sort_by=popularity.desc&page=1&year=2023&vote_average.lte=8&with_watch_monetization_types=flatrate"


window.onload = () => {
    carregarFilmes()
    carregarProgramTV()
    carregarDestaque()
}


function carregarFilmes() {
    let movies = []
    let htmlFilmes = ``
    let filme
    let cont = 0

    async function fetchData() {
        const response = await fetch(urlFilme);
        const data = await response.json();
        movies = movies.concat(data.results)


        for (let i = 0; cont < 12 && i < movies.length; i++) {
            let generofilme = []

            filme = movies[i]
            const response = await fetch(`https://api.themoviedb.org/3/movie/${filme.id}?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR`);
            const dataFilme = await response.json();
            let objectGeneros = dataFilme.genres

            for (let i = 0; i < objectGeneros.length && i < 3; i++) {

                generofilme.push(objectGeneros[i]["name"])

            }

            filme.genre_ids = generofilme.join(", ")


            if (filme.vote_average > 6.0) {
                htmlFilmes += `
        <div class="card">
                <div class="img-card">
                    <img src="https://image.tmdb.org/t/p/original/${filme.poster_path}" alt="${filme.title}">
                </div>
                <div class="info-card">
                    <h3 class="titulo-card">${filme.title}</h3>
                    <h4 class="genero-card">${filme.genre_ids}</h4>
                    <div class="avaliacao-card">
                        <i class="fi fi-rr-star estrela"></i>
                        <h4 class=num-card>${filme.vote_average}</h4>
                    </div>
                </div>
            </div>`

                cont++
            }

        }



        document.querySelector(".cards-filme").innerHTML = htmlFilmes

    }

    fetchData().then(data => {
        data;
    });
}

function carregarProgramTV() {
    let programs = []
    let htmlPrograms = ``
    let program
    let cont = 0

    async function fetchData() {
        const response = await fetch(urlProgramTV);
        const data = await response.json();
        programs = programs.concat(data.results)


        for (let i = 0; cont < 12 && i < programs.length; i++) {

            let generoProgram = []

            program = programs[i]
            const response = await fetch(`
            https://api.themoviedb.org/3/tv/${program.id}?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR`);
            const dataProgram = await response.json();
            let objectGeneros = dataProgram.genres

            for (let i = 0; i < objectGeneros.length && i < 3; i++) {

                generoProgram.push(objectGeneros[i]["name"])

            }

            program.genre_ids = generoProgram.join(", ")

            if (program.vote_average > 0) {
                htmlPrograms += `
                    <div class="card">
                    <div class="img-card">
                        <img src="https://image.tmdb.org/t/p/original/${program.poster_path}" alt="${program.title}">
                    </div>
                    <div class="info-card">
                        <h3 class="titulo-card">${program.name}</h3>
                        <h4 class="genero-card">${program.genre_ids}</h4>
                        <div class="avaliacao-card">
                            <i class="fi fi-rr-star estrela"></i>
                            <h4 class=num-card>${program.vote_average}</h4>
                        </div>
                    </div>
                </div>`

                cont++

            }

        }

        document.querySelector(".cards-program").innerHTML = htmlPrograms

    }

    fetchData().then(data => {
        data;
    });
}

function carregarDestaque() {
    let htmlDestaque 

    async function fetchData() {
        const response = await fetch(urlDestaque);
        const data = await response.json();

        let filmeDestaque = data.results[0]

        htmlDestaque = `
        <a href="/detalhes.html?id=${filmeDestaque.id}">${filmeDestaque.title}</a>
        <p class="descricao"> ${filmeDestaque.overview}</p>
        <div class="avaliacao-card">
            <i class="fi fi-rr-star estrela"></i>
            <h4 class=num-card>${filmeDestaque.vote_average}</h4>
        </div>`

        
        let divFilmeDestaque = document.querySelector("#filme-destaque")
        divFilmeDestaque.innerHTML = htmlDestaque

        let header = document.getElementById('header')

        header.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://image.tmdb.org/t/p/original${filmeDestaque.backdrop_path})`
        header.style.backgroundSize = "cover"

    }

    fetchData().then(data => {
        data;
    });

    
}
