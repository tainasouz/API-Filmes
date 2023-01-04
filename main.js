let urlFilme = "https://api.themoviedb.org/3/movie/popular?api_key=f1b9e75f6dc0efa5b1181f25004a24b4&language=pt-BR&page="
let urlProgramTV = "https://api.themoviedb.org/3/tv/popular?api_key=f1b9e75f6dc0efa5b1181f25004a24b4&language=pt-BR&page="


window.onload = () => {
    carregarFilmes()
}


function carregarFilmes() {
    let movies = []
    let htmlFilmes = ``
    let filme

    async function fetchData() {
        const response = await fetch(urlFilme);
        const data = await response.json();
        movies = movies.concat(data.results)


        for (let i = 0; i < 12; i++) {
            let generofilme = []

            filme = movies[i]
            const response = await fetch(`https://api.themoviedb.org/3/movie/${filme.id}?api_key=f1b9e75f6dc0efa5b1181f25004a24b4&language=pt-BR`);
            const dataFilme = await response.json();
            let objectGeneros = dataFilme.genres

            for (let i = 0; i < objectGeneros.length && i < 3; i++) {

                generofilme.push(objectGeneros[i]["name"])

            }

            filme.genre_ids = generofilme.join(", ")


            htmlFilmes += `
        <div class="card">
                <div class="img-card">
                    <img src="https://image.tmdb.org/t/p/w200/${filme.poster_path}" alt="Filme ${filme.title}">
                </div>
                <div class="info-card">
                    <h3 class="titulo-card">${filme.title}</h3>
                    <h4 class="genero-filme">${filme.genre_ids}</h4>
                    <div class="avaliacao-filme">
                        <i class="fi fi-rr-star estrela"></i>
                        <h4 class=num-card>${filme.vote_average}</h4>
                    </div>
                </div>
            </div>`
        }

        document.querySelector(".cards-filme").innerHTML = htmlFilmes

    }

    fetchData().then(data => {
        data;
    });
}




function carregarDados(url) {

    let allData = []

    async function fetchData() {
        for (let i = 1; i <= 5; i++) {
            const response = await fetch(url + i);
            const data = await response.json();
            allData = allData.concat(data.results)
        }
        carregarFilme_ProgramTV(allData)
    }

    fetchData().then(data => {
        data;
    });


}


function carregarFilme_ProgramTV(dados) {

    let contFilme = 0
    let contSerie = 0

    let htmlFilmes = ``
    let htmlSeries = ``

    console.log(dados)

    for (let i = 0; contFilme < 12 && contSerie < 12; i++) {

        console.log(dados[i].hasOwnProperty("title"))

        if (dados[i].hasOwnProperty("title")) {
            console.log(dados[i].media_type)
            tipo = dados[i].media_type


            if (tipo = "movie" && contFilme < 12) {
                let filme = dados[i]

                htmlFilmes += `
        <div class="card">
                <div class="img-card">
                    <img src="https://image.tmdb.org/t/p/w200/${filme.poster_path}" alt="Filme ${filme.title}">
                </div>
                <div class="info-card">
                    <h3 class="titulo-card">${filme.title}</h3>
                    <h4 class="genero-filme">Gênero Filme</h4>
                    <div class="avaliacao-filme">
                        <i class="fi fi-rr-star estrela"></i>
                        <h4 class=num-card>${filme.vote_average}</h4>
                    </div>
                </div>
            </div>`

                contFilme++
            }
            else if (tipo = "tv" && contSerie < 12) {

                let serie = dados[i]

                htmlSeries += `
        <div class="card">
                <div class="img-card">
                    <img src="https://image.tmdb.org/t/p/w200/${serie.poster_path}" alt="Serie ${serie.title}">
                </div>
                <div class="info-card">
                    <h3 class="titulo-card">${serie.title}</h3>
                    <h4 class="genero-serie">Gênero Serie</h4>
                    <div class="avaliacao-serie">
                        <i class="fi fi-rr-star estrela"></i>
                        <h4 class=num-card>${serie.vote_average}</h4>
                    </div>
                </div>
            </div>`

                contSerie++
            }
        }
    }

    document.querySelector(".cards-filme").innerHTML = htmlFilmes
    document.querySelector(".cards-serie").innerHTML = htmlSeries
}