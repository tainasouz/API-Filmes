const urlFilmes = "https://api.themoviedb.org/3/movie/popular?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-Br&region=BR"

var pag = 1
var limPag = 2

window.onload = () =>{
    var filmes = carregaFilmes(pag)
    filmes.then(filmes => adicionaFilmes(filmes))

}

function carregaFilmes(pag, response = []) {
    return fetch(`${urlFilmes}&page=${pag}`)
    .then(res => res.json())
    .then(dados => dados.results)
    .then(results =>{
        const res = [...response, ...results]
        if (results.length !== 0 && pag !== limPag) {
            pag++
            return carregaFilmes(pag, res)
            
        }

        limPag += 2
        return res
    })
}

function adicionaFilmes(filmes) {
    console.log(filmes)
    let filme
    let html = ``

    for (let i = 0; i < filmes.length; i++) {
        filme = filmes[i]
        html += `
        <div class="card">
            <div class="img-card">
                <a href="/detalhes.html?id=${filme.id}&type=movie">
                    <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" alt="${filme.title}">
                </a>
            </div>
            <div class="info-card">
                <a href ="/detalhes.html?id=${filme.id}&type=movie" class="titulo-card"> ${filme.title} </a>
                <div class="avaliacao-card">
                    <div class="estrela-avaliacao">
                    <i class="fi fi-br-star"></i>
                    </div>
                    <div class="num-avaliacao"> 
                        ${filme.vote_average} 
                    </div>
                </div>
            </div>
        </div>`
        
    }

    document.querySelector("#cards-filmes").innerHTML=html
}

