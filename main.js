let cardsFilme = document.querySelector(".card-filme")

let urlFilme = "https://api.themoviedb.org/3/movie/popular?api_key=f1b9e75f6dc0efa5b1181f25004a24b4&language=pt-BR"

fetch(urlFilme)
    .then((response) => response.json())
    .then((filmes) => {
        carregarfilmes(filmes)
    })


carregarfilmes = (data) => {
    let HTML = ``
    let filme

    for (let i = 0; i < 12; i++) {

        filme = data.results[i]




        HTML += `
            <div class="card">
                <div class="img-card">
                    <img src="https://image.tmdb.org/t/p/w200/${filme.poster_path}" alt="Filme ${filme.title}">
                </div>
                <div class="info-card">
                    <h3 class="titulo-filme">${filme.title}</h3>
                    <h4 class="genero-filme">Gênero Filme</h4>
                    <div class="avaliacao-filme">
                        <i class="fi fi-rr-star estrela"></i>
                        <h4 class=num-card>${filme.vote_average}</h4>
                    </div>
                </div>
            </div>
        `
    }

    document.querySelector(".cards").innerHTML = HTML
}

