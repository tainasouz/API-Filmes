const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get("search")

let urlSearch

if (search == "") {

}
else {
  urlSearch = `https://api.themoviedb.org/3/search/multi?api_key=6c0b4180230783f9b7199576cb4504dc&language=pt-BR&query=${search}&include_adult=false`
}

function pagination_fetch(
  url = urlSearch, // Improvised required argument in JS
  page = 1,
  Response = []
) {
  return fetch(`${url}&page=${page}`) // Append the page number to the base URL
    .then(response => response.json())
    .then(data => console.log(data))
    .then(results => {
      const response = [...Response, ...results]; // Combine the two arrays

      if (results.length !== 0) {
        page++;

        return pagination_fetch(url, page, response);
      }

      return response;
    });

}

let resultados = pagination_fetch()
resultados.then(res => {
  console.log(res)
  document.querySelector(".titulo").innerHTML = `Resultados para "${search}"`

  html = ``

  for (let i = 0, cont = 0; i < res.length && cont < 10; i++) {

    let resultado = res[i]
    let scr
    let date



    if (resultado.media_type != "person" ) {

      if (resultado.name == undefined) {
        resultado.name = resultado.title
      }

      if (resultado.poster_path == undefined) {
        scr = "/img/poster.png"
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

      cont++
    }



  }
  console.log(html)
  document.querySelector(".resultados").innerHTML = html
})



