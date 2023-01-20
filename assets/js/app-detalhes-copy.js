const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get("type")
const id = urlParams.get("id");

const urlDetalhes = `https://api.themoviedb.org/3/${type}/${id}?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR`

const urlClassificacaoFilme = `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=6c0b4180230783f9b7199576cb4504dc`

const urlClassificacaoSerie = `https://api.themoviedb.org/3/tv/119051/content_ratings?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR`

const urlProvedores = `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=6c0b4180230783f9b7199576cb4504dc`

const urlAtores = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR`

function carregaDadosFilme() {
    fetch(urlClassificacaoFilme)
        .then(response => response.json())
        .then(res => res.results)
        .then(dados => {

            const dadosFilme = dados.filter(e => e.iso_3166_1 == "BR")[0].release_dates[0]
            console.log(dadosFilme)

            if (dadosFilme.certification != "") {

                adiconaDivClassificacao(dadosFilme.certification)

            }

            if (dadosFilme.release_date != "") {

                adicionaDivData(dadosFilme.release_date)

            }

        })
        .catch(erro => console.error(erro))
}

function carregaDadosSerie() {
    fetch(urlClassificacaoSerie)
        .then(response => response.json())
        .then(res => res.results)
        .then(dados => {

            const classificacao = dados.filter(e => e.iso_3166_1 == "BR")[0].rating

            if (classificacao != "") {

                adiconaDivClassificacao(classificacao)

            }

        })
        .catch(erro => console.error(erro))
}

function carregaDetalhesFilmesSeries() {
    fetch(urlDetalhes)
        .then(response => response.json())
        .then(data => {

            let html
            let titulo



            if (type == "tv") {

                titulo = data.name
                adicionaDivData(data.first_air_date)

            }
            else {
                titulo = data.title
            }

            carregaHTML(titulo, ".titulo")
            carregaHTML(data.overview, ".sinopse")



            if (data.genres != undefined) {

                const generos = data.genres.map(gen => gen.name).join(", ")
                adicionaDiv(generos, ".data-genero", ".genero")

            }



            if (data.poster_path == undefined || data.poster_path == "") {

                html = `<img src="/img/poster.png" alt="${titulo}">`
            }
            else {

                html = `<img src="https://image.tmdb.org/t/p/original/${data.poster_path}?language=pt-BR&include_image_language=pt" alt="${titulo}">`
            }

            carregaHTML(html, ".cartaz")



            if (data.backdrop_path != "") {
                let header = document.querySelector('.header')

                header.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/original${data.backdrop_path})`
                header.style.backgroundSize = "cover"
            }



            if (data.vote_average != undefined) {

                let nota = data.vote_average

                html = `
                <i class="fi fi-rr-star estrela"></i>
                <h4 class=num-card>${nota.toFixed(1)}</h4>`

                document.querySelector(".classificacao").innerHTML = html

            }

        })
        .catch(error => alert(error))
}

function carregaAtores() {
    fetch(urlAtores)
        .then(response => response.json())
        .then(data => data.cast)
        .then(elenco => {

            let scr
            let html = ``

            for (let i = 0; i < elenco.length && i < 20; i++) {


                if (elenco[i].profile_path != null) {
                    scr = `https://image.tmdb.org/t/p/original/${elenco[i].profile_path}`
                }
                else {
                    scr = "/img/user.png"
                }

                html += `
                    <div class="card">
                        <img src="${scr}" alt="${elenco[i].name}" srcset="">
                        <div class="nome-ator">${elenco[i].name}</div>
                        <div class="nome-personagem">${elenco[i].character}</div>
                    </div>`

            }

            carregaHTML(html, ".cards-elenco")

        })
}

function adicionaDivData(date) {
    const divDataGenero = document.querySelector(".data-genero")
    const newDiv = document.createElement("div")

    let data = date.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1')

    newDiv.classList.add("data-lancamento")
    newDiv.innerHTML = data
    divDataGenero.appendChild(newDiv)
}

function adiconaDivClassificacao(classificacao) {

    const divDataGenero = document.querySelector(".data-genero")

    const newDiv = document.createElement("div")
    newDiv.classList.add("classificao-indicativa")
    newDiv.innerHTML = classificacao
    divDataGenero.appendChild(newDiv)

}

function adicionaDiv(dado, nomeDivPai, nomeDiv) {
    const divPai = document.querySelector(nomeDivPai)
    const newDiv = document.createElement("div")
    newDiv.classList.add(nomeDiv)
    newDiv.innerHTML = dado
    divPai.appendChild(newDiv)
}

function carregaHTML(html, div) {

    if (html != "" || html != undefined) {
        document.querySelector(div).innerHTML = html
    }

}

function carregaDados() {

    if (type == "movie") {

        carregaDadosFilme()
    }
    else {
        carregaDadosSerie()
    }

    carregaDetalhesFilmesSeries()
    carregaAtores()

}
carregaDados()
