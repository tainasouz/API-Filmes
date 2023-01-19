const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get("type")
const id = urlParams.get("id");


let urlDetalheFilme = `https://api.themoviedb.org/3/${type}/${id}?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR`

let urlClassificacaoFilme = `https://api.themoviedb.org/3/${type}/${id}/release_dates?api_key=6c0b4180230783f9b7199576cb4504dc`

let urlClassificacaoSerie = `https://api.themoviedb.org/3/tv/119051/content_ratings?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR`

let urlProvedores = `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=6c0b4180230783f9b7199576cb4504dc`

let urlAtores = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR`

let encontrou = false

let html = `
            <div class="cartaz">
                <img src="/img/poster.png" alt="${titulo}">
            </div>
            <div class="infos">
                <div class="titulo-min-infos">
                    <div class="titulo">${titulo}</div>
                    <div class="data-genero">
                        <div class="classificao-indicativa"></div>
                        <div class="data-lancamento">${date}</div>
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

let copiaData = {}



function carregarDetalhes() {
    fetch(urlDetalheFilme)
        .then(response => response.json())
        .then(data => {

            let generos = []
            let titulo
            

            for (let i = 0; i < data.genres.length; i++) {

                generos.push(data.genres[i].name)

            }

            if (type == "tv") {
                titulo = data.name
                date = data.last_air_date
            }
            else {
                titulo = data.title
                date = data.first_air_date
            }
            if (data.poster_path == undefined) {
                html += `<div class="cartaz">
                    <img src="/img/poster.png" alt="${titulo}">
                </div>`
            }
            else {
                html += `
                <div class="cartaz">
                    <img src="https://image.tmdb.org/t/p/original/${data.poster_path}" alt="${titulo}">
                </div>`
            }
            if (titulo != undefined) {
                let classTitulo = `<div class="titulo">${titulo}</div>`
            }
            


            document.querySelector('.detalhes').innerHTML = html
            let header = document.querySelector('.header')

            header.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/original${data.backdrop_path})`
            header.style.backgroundSize = "cover"



        })

    if (type == "movie") {
        fetch(urlClassificacaoFilme)
            .then(response => response.json())
            .then(data => {

                let infoBR

                for (let i = 0; i < data.results.length; i++) {

                    if (data.results[i].iso_3166_1 == "BR") {

                        infoBR = data.results[i].release_dates[0]
                    }
                }

                if (infoBR.release_date !== "") {

                    document.querySelector('.data-lancamento').innerHTML = infoBR.release_date.slice(0, 10)
                }


                document.querySelector('.classificao-indicativa').innerHTML = infoBR.certification

            })
    }
    else {
        fetch(urlClassificacaoSerie)
            .then(response => response.json())
            .then(data => {


                for (let i = 0; i < data.results.length; i++) {

                    if (data.results[i].iso_3166_1 == "BR" && data.results[i].rating !== "") {

                        document.querySelector('.classificao-indicativa').innerHTML = data.results[i].rating

                    }

                }


            })
    }

    fetch(urlProvedores)
        .then(response => response.json())
        .then(data => {


            let provedores = data.results.BR.flatrate
            console.log(provedores)
            let htmlProvedores = ``


            if (condition) {

            }

            for (let i = 0; i < provedores.length; i++) {

                htmlProvedores += `
                <div class="provedor">
                        <div class="titulo-provedor">${provedores[i]}</div>
                        <div class="logo-provedor">
                            <img src="" alt="">
                        </div>
                        <div class="nome-provedor"></div>
                    </div>`

            }
        })
        .catch(erro => console.error())
    fetch(urlAtores)
        .then(response => response.json())
        .then(data => {

            let atores = data.cast
            let htmlAtores = ``
            let scr


            for (let i = 0; i < atores.length; i++) {

                if (atores[i].profile_path == undefined) {
                    scr = `/img/user.png`

                }
                else {
                    scr = `https://image.tmdb.org/t/p/original/${atores[i].profile_path}`
                }



                htmlAtores += `
                <div class="card">
                    <img src="${scr}" alt="" srcset="">
                    <div class="nome-ator">${atores[i].name}</div>
                    <div class="nome-personagem">${atores[i].character}</div>
                </div>`

            }

            document.querySelector(".cards-elenco").innerHTML = htmlAtores
        })
}

carregarDetalhes()
