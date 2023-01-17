const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get("type")
const id = urlParams.get("id");

let urlDetalhes = `https://api.themoviedb.org/3/${type}/${id}?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR`

let urlClassificacaoFilme = `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=6c0b4180230783f9b7199576cb4504dc`

let urlClassificacaoSerie = `https://api.themoviedb.org/3/tv/119051/content_ratings?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR`

let urlProvedores = `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=6c0b4180230783f9b7199576cb4504dc`

let urlAtores = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR`

function carregaDados() {


    if (type == "movie") {
        fetch(urlClassificacaoFilme)
            .then(response => response.json())
            .then(data => data.results)
            .then(classificacao => {

                for (let i = 0; i < classificacao.length; i++) {

                    let divDataGenero = document.querySelector(".data-genero")
                    let newDiv

                    if (classificacao[i].iso_3166_1 == "BR") {

                        if (classificacao[i].release_dates[0].certification != "") {
                            newDiv = document.createElement("div")
                            newDiv.classList.add("classificao-indicativa")
                            newDiv.innerHTML = classificacao[i].release_dates[0].certification
                            divDataGenero.appendChild(newDiv)

                        }
                        if (classificacao[i].release_dates[0].release_date != "") {

                            let dataNoFormat = classificacao[i].release_dates[0].release_date
                            let data = dataNoFormat.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1')

                            newDiv = document.createElement("div")
                            newDiv.classList.add("data-lancamento")
                            newDiv.innerHTML = data
                            divDataGenero.appendChild(newDiv)

                        }
                    }

                }

            })
            .catch(erro => console.error(erro))
    }
    else {
        fetch(urlClassificacaoSerie)
            .then(response => response.json())
            .then(data => data.results)
            .then(classificacao => {

                console.log(classificacao)
                let divDataGenero = document.querySelector(".data-genero")
                let newDiv

                for (let i = 0; i < classificacao.length; i++) {

                    if (classificacao[i].iso_3166_1 == "BR" && classificacao[i].rating != "") {

                        newDiv = document.createElement("div")
                        newDiv.classList.add("classificao-indicativa")
                        newDiv.innerHTML = classificacao[i].rating
                        divDataGenero.appendChild(newDiv)
                    }

                }
            })
            .catch(erro => console.error(erro))
    }

    fetch(urlDetalhes)
        .then(response => response.json())
        .then(data => {
            let html
            let titulo
            console.log(data)

            if (type == "tv") {
                titulo = data.name
                date = data.first_air_date
                let divDataGenero = document.querySelector(".data-genero")
                let newDiv
                let dataFormat = date.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1')

                newDiv = document.createElement("div")
                newDiv.classList.add("data-lancamento")
                newDiv.innerHTML = dataFormat
                divDataGenero.appendChild(newDiv)

            }
            else {
                titulo = data.title
                date = data.first_air_date

            }

            if (data.genres != undefined) {

                let generos = []
                for (let i = 0; i < data.genres.length; i++) {
                    generos.push(data.genres[i].name)
                }

                let divDataGenero = document.querySelector(".data-genero")
                let newDiv = document.createElement("div")
                newDiv.classList.add("genero")
                newDiv.innerHTML = generos.join(", ")
                divDataGenero.appendChild(newDiv)
            }

            if (data.poster_path == undefined || data.poster_path == "") {

                html = `<img src="/img/poster.png" alt="${titulo}">`
                document.querySelector(".cartaz").innerHTML = html

            }
            else {
                html = `<img src="https://image.tmdb.org/t/p/original/${data.poster_path}?language=pt-BR&include_image_language=pt" alt="${titulo}">`
                document.querySelector(".cartaz").innerHTML = html
            }

            if (data.backdrop_path != "") {
                let header = document.querySelector('.header')

                header.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/original${data.backdrop_path})`
                header.style.backgroundSize = "cover"
            }

            if (titulo != "" && titulo != undefined) {

                document.querySelector(".titulo").innerHTML = titulo

            }

            if (data.overview != "") {

                document.querySelector(".sinopse").innerHTML = data.overview
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


        fetch(urlAtores)
        .then(response => response.json())
        .then(data =>{
         
            if (data.cast.length > 0) {

                let elenco = data.cast
                let scr
                let html = ``

                for (let i = 0; i < elenco.length && i < 20; i++) {


                    if (elenco[i].profile_path != null) {
                        scr = `https://image.tmdb.org/t/p/original/${elenco[i].profile_path}`
                    }
                    else{
                        scr = "/img/user.png"
                    }
                    
                    html += `
                    <div class="card">
                        <img src="${scr}" alt="${elenco[i].name}" srcset="">
                        <div class="nome-ator">${elenco[i].name}</div>
                        <div class="nome-personagem">${elenco[i].character}</div>
                    </div>`
                    
                }

                document.querySelector(".cards-elenco").innerHTML = html

            }
        })

}
carregaDados()
