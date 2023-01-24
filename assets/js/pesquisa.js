const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get("search")

const urlSearch = `https://api.themoviedb.org/3/search/multi?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR&query=${search}&include_adult=false`



window.onload = () => {
  carregaTodosOsDados().then((listaResultados) => paginacao(listaResultados))
}


function carregaTodosOsDados(
  url = urlSearch,
  page = 1,
  Response = []
) {
  return fetch(`${url}&page=${page}`)
    .then(response => response.json())
    .then(data => data.results)
    .then(results => {
      const response = [...Response, ...results.filter(e => e.media_type != "person")];

      if (results.length !== 0 && response.length < 100) {
        page++;

        return carregaTodosOsDados(url, page, response);
      }

      return response;
    })
}

var pagina = 0
var numPaginas

function paginacao(dados) {

  console.log(dados)

  numPaginas = Math.ceil(dados.length / 10)
  const resultadoPagina = dados.slice(pagina * 10, (pagina + 1) * 10)


  if (dados.length > 0) {
    document.querySelector(".titulo").innerHTML = `Resultados para "${search}"`
    carregaResultados(resultadoPagina, pagina)
  }

}



function carregaResultados(dados) {

  let html = ``


  for (let i = 0; i < dados.length; i++) {

    let resultado = dados[i]
    let scr
    let date



    if (resultado.name == undefined) {
      resultado.name = resultado.title
    }

    if (resultado.poster_path == undefined) {
      scr = "/assets/img/poster.png"
    }
    else {
      scr = `https://image.tmdb.org/t/p/original/${resultado.poster_path}`
    }

    if (resultado.media_type == "movie") {
      date = resultado.release_date
    }
    else {
      date = resultado.first_air_date
    }

    let dataFormat = date.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1')

    html += `
        <div class="card-result">
            <div class="poster">
                <img src="${scr}" alt="" >
            </div>
            <div class="info">
            <div class="header-card">
                <div class="titulo-card">
                  ${resultado.name}
                </div>
                <div class="data-lancamento">
                  ${dataFormat}
                </div>
            </div>
            <div class="body-card">
                <div class="sinopse">
                  ${limitaTamSinopse(resultado.overview)}
                </div>
            </div>
            </div>
        </div>`

    document.querySelector(".resultados").innerHTML = html

  }

}



function limitaTamSinopse(texto) {

  if (texto.length > 380) {
    return `${texto.slice(0, 380)}...`
  }
  return texto

}


