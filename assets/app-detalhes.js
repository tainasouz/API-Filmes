const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

let urlDetalheFilme = `https://api.themoviedb.org/3/movie/${id}?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR`
let urlDetalheSerie = `https://api.themoviedb.org/3/tv/${id}?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR`

urlClassificacaoFilme = `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=6c0b4180230783f9b7199576cb4504dc`

urlProvedores = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=6c0b4180230783f9b7199576cb4504dc`

urlAtores = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR`

let encontrou = false

let html = ``



function carregarDetalhes() {
    fetch(urlDetalheFilme)
        .then(response => response.json())
        .then(data => {

            let generos = []

            for (let i = 0; i < data.genres.length; i++) {

                generos.push(data.genres[i].name)

            }

            html = `
            <div class="cartaz">
            <img src="https://image.tmdb.org/t/p/original/${data.poster_path}" alt="${data.title}">
            </div>
            <div class="infos">
                <div class="titulo-min-infos">
                    <div class="titulo">${data.title}</div>
                    <div class="data-genero">
                        <div class="classificao-indicativa"></div>
                        <div class="data-lancamento">${data.release_date} (US)</div>
                        <div class="genero">${generos.join(", ")}</div>
                    </div>
                </div>
                <div class="sinopse-classificacao">
                    <div class="sinopse">${data.overview}</div>
                    <div class="classificacao">
                        <i class="fi fi-rr-star estrela"></i>
                        <h4 class=num-card>${data.vote_average}</h4>
                    </div>
                </div>
            </div>`

            document.querySelector('.detalhes').innerHTML = html
            let header = document.querySelector('.header')

            header.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/original${data.backdrop_path})`
            header.style.backgroundSize = "cover"

        })
    fetch(urlClassificacaoFilme)
        .then(response => response.json())
        .then(data => {

            let infoBR
            
            for (let i = 0; i < data.results.length; i++) {
                
                if (data.results[i].iso_3166_1 == "BR") {
                    
                    infoBR = data.results[i].release_dates[0]
                }                
            }

            if (infoBR.release_date != "") {
                
                document.querySelector('.data-lancamento').innerHTML = infoBR.release_date.slice(0,10)
            }
            console.log(infoBR)

            document.querySelector('.classificao-indicativa').innerHTML = infoBR.certification

        })
    fetch(urlProvedores)
        .then(response => response.json())
        .then(data => {
        
            console.log(data.results)
        })
    fetch(urlAtores)
        .then(response => response.json())
        .then(data => {
            
            let atores = data.cast
            let htmlAtores = ``
             console.log(atores)

            for (let i = 0; i < atores.length && i < 10; i++) {
              
                htmlAtores += `
                <div class="card">
                    <img src="https://image.tmdb.org/t/p/original/${atores[i].profile_path}" alt="" srcset="">
                    <div class="nome-ator">${atores[i].name}</div>
                    <div class="nome-personagem">${atores[i].character}</div>
                </div>`
                
            }

            document.querySelector(".cards-elenco").innerHTML = htmlAtores
        })
}

carregarDetalhes()
