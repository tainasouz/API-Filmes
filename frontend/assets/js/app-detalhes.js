const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get("type")
const id = urlParams.get("id");

const urlDetalhes = `http://localhost:3000/detalhes/${type}/${id}`

const urlClassificacaoFilme = `http://localhost:3000/classificacaoFilme/${id}`

const urlClassificacaoSerie = `http://localhost:3000/classificacaoSerie/${id}`

const urlAtores = `http://localhost:3000/dadosAtores/${type}/${id}`

function carregaDadosFilme() {
    return fetch(urlClassificacaoFilme)
        .then(response => response.json())
        .catch(erro => console.error(erro))
}

function carregaDadosSerie() {
    return fetch(urlClassificacaoSerie)
        .then(response => response.json())
        .then(res => res)
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
        .then(atores => {

            let scr
            let html = ``

            for (let i = 0; i < atores.length && i < 20; i++) {


                if (atores[i].profile_path != null) {
                    scr = `https://image.tmdb.org/t/p/original/${atores[i].profile_path}`
                }
                else {
                    scr = "/assets/img/user.png"
                }

                html += `
                    <div class="card">
                        <img src="${scr}" alt="${atores[i].name}" srcset="">
                        <div class="nome-ator">${atores[i].name}</div>
                        <div class="nome-personagem">${atores[i].character}</div>
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

            const data = new Date(dataClassificacao.release_date)

            adicionaDiv(data.toLocaleDateString(), ".data-genero", "data-lancamento")

        }

        titulo = dadosGerais.title



    }
    else {

        if (dataClassificacao != "") {

            adicionaDiv(dataClassificacao, ".data-genero", "classificao-indicativa")

        }

        titulo = dadosGerais.name

        const data = new Date(dadosGerais.first_air_date)

        adicionaDiv(data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear(), ".data-genero", "data-lancamento")

    }

    carregaHTML(titulo, ".titulo")
    carregaHTML(dadosGerais.overview, ".sinopse")

    if (dadosGerais.genres != undefined) {

        const generos = dadosGerais.genres.map(gen => gen.name).join(", ")
        adicionaDiv(generos, ".data-genero", "genero")

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
