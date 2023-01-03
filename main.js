let allData = []

let urlData = "https://api.themoviedb.org/3/trending/all/week?api_key=f1b9e75f6dc0efa5b1181f25004a24b4&language=pt-BR&page="


async function fetchData() {
    for (let i = 1; i <= 10; i++) {
        const response = await fetch(urlData + i);
        const data = await response.json();

        allData = allData.concat(data.results)

    }
    carregarDados(allData)
}

fetchData().then(data => {
    data;
});

carregarDados = (dados) => {
    let htmlFilmes = ``
    let htmlSeries = ``

    let contFilme = 0
    let contSerie = 0


    for (let i = 0; contFilme <= 12 && contSerie <= 12 && i < 100; i++) {


        if (dados[i].hasOwnProperty("title")) {

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


        document.querySelector(".cards-filme").innerHTML = htmlFilmes
        document.querySelector(".cards-serie").innerHTML = htmlSeries

    }
}