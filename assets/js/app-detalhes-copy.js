const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get("type")
const id = urlParams.get("id");

const urlDetalhes = `https://api.themoviedb.org/3/${type}/${id}?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR`

const urlClassificacaoFilme = `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=6c0b4180230783f9b7199576cb4504dc`

const urlClassificacaoSerie = `https://api.themoviedb.org/3/tv/119051/content_ratings?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR`

const urlProvedores = `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=6c0b4180230783f9b7199576cb4504dc`

const urlAtores = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR`

function carregaDadosFilme() {
    return fetch(urlClassificacaoFilme)
        .then(response => response.json())
        .then(res => res.results)
        .then(dados => {

            const dadosFilme = dados.filter(e => e.iso_3166_1 == "BR")[0].release_dates[0]
            return dadosFilme

        })
        .catch(erro => console.error(erro))
}

function carregaDadosSerie() {
    return fetch(urlClassificacaoSerie)
        .then(response => response.json())
        .then(res => res.results)
        .then(dados => {

            const classificacao = dados.filter(e => e.iso_3166_1 == "BR")[0].rating
            return classificacao

        })
        .catch(erro => console.error(erro))
}

function carregaDadosFilmesSeries() {
    return fetch(urlDetalhes)
        .then(response => response.json())
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
                    scr = "/assets/img/user.png"
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


function adiconaDados(dataClassificacao, dadosGerais) {

    console.log(dataClassificacao, dadosGerais)

    if (type === "movie") {


        if (dataClassificacao.certification != "") {

            adicionaDiv(dataClassificacao.certification, ".data-genero", "classificao-indicativa")


        }

        if (dataClassificacao.release_date != "") {

            adicionaDiv(dataClassificacao.release_date.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1'), ".data-genero", "data-lancamento")

        }

        titulo = dadosGerais.title



    }
    else {

        if (dataClassificacao != "") {

            adicionaDiv(dataClassificacao, ".data-genero", "classificao-indicativa")

        }

        titulo = dadosGerais.name
        adicionaDiv(dadosGerais.first_air_date.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1'), ".data-genero", "data-lancamento")

    }

    carregaHTML(titulo, ".titulo")
    carregaHTML(dadosGerais.overview, ".sinopse")

    if (dadosGerais.genres != undefined) {

        const generos = dadosGerais.genres.map(gen => gen.name).join(", ")
        adicionaDiv(generos, ".data-genero", ".genero")

    }



    if (dadosGerais.poster_path == undefined || dadosGerais.poster_path == "") {

        html = `<img src="/assets/img/user.png" alt="${titulo}">`
    }
    else {

        html = `<img src="https://image.tmdb.org/t/p/original/${dadosGerais.poster_path}?language=pt-BR&include_image_language=pt" alt="${titulo}">`
    }

    carregaHTML(html, ".cartaz")



    if (dadosGerais.backdrop_path != "") {
        let header = document.querySelector('.header')

        header.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/original${dadosGerais.backdrop_path})`
        header.style.backgroundSize = "cover"
    }



    if (dadosGerais.vote_average != undefined) {

        let nota = dadosGerais.vote_average

        html = `
        <i class="fi fi-rr-star estrela"></i>
        <h4 class=num-card>${nota.toFixed(1)}</h4>`

        document.querySelector(".classificacao").innerHTML = html

    }

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

window.onload = () => {

    const carregaDataClassificacao = type === "movie" ? carregaDadosFilme : carregaDadosSerie
    carregaAtores()

    Promise.all([carregaDataClassificacao(), carregaDadosFilmesSeries()]).then((dados) => {

        const dataClassificacao = dados[0]
        const dadosGerais = dados[1]


        adiconaDados(dataClassificacao, dadosGerais)


    })
}
