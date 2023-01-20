const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get("search")

if (search == "") {
  document.querySelector(".titulo").innerHTML = `Não foi encontrado nenhum resultado para "${search}"`
}

const urlSearch = `https://api.themoviedb.org/3/search/multi?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR&query=${search}&include_adult=false`

function pagination_fetch(
  url = urlSearch,
  page = 1,
  Response = []
) {
  fetch(`${url}&page=${page}`)
    .then(response => response.json())
    .then(data => data.results)
    .then(results => {
      const response = [...Response, ...results];

      if (results.length !== 0) {
        page++;

        return pagination_fetch(url, page, response);
      }

      return response;
    })
    .then(res => {
      console.log(res)

      if (res.length > 0) {

        document.querySelector(".titulo").innerHTML = `Resultados para "${search}"`

        html = ``

        const dados = res.filter(e => e.media_type != "person")

        for (let i = 0; i < 10; i++) {

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
                      ${resultado.overview}
                    </div>
                </div>
                </div>
            </div>`
            
            document.querySelector(".resultados").innerHTML = html

        }
        
      }
      else{
        document.querySelector(".titulo").innerHTML = `Não foi encontrado nenhum resultado para "${search}"`
      }



    })

}

pagination_fetch()



