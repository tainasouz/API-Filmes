let urlFilme = "https://api.themoviedb.org/3/movie/popular?api_key=f1b9e75f6dc0efa5b1181f25004a24b4&language=pt-BR&page="
let urlProgramTV = "https://api.themoviedb.org/3/tv/popular?api_key=f1b9e75f6dc0efa5b1181f25004a24b4&language=pt-BR&page="


window.onload = () => {
    carregarFilmes()
    carregarProgramTV()
}


function carregarFilmes() {
    let movies = []
    let htmlFilmes = ``
    let filme
    let cont = 0

    async function fetchData() {
        const response = await fetch(urlFilme);
        const data = await response.json();
        movies = movies.concat(data.results)


        for (let i = 0; cont < 12 && i < movies.length; i++) {
            let generofilme = []

            filme = movies[i]
            const response = await fetch(`https://api.themoviedb.org/3/movie/${filme.id}?api_key=f1b9e75f6dc0efa5b1181f25004a24b4&language=pt-BR`);
            const dataFilme = await response.json();
            let objectGeneros = dataFilme.genres

            for (let i = 0; i < objectGeneros.length && i < 3; i++) {

                generofilme.push(objectGeneros[i]["name"])

            }

            filme.genre_ids = generofilme.join(", ")

            console.log(filme.vote_average)

            if (filme.vote_average > 6.0) {
                htmlFilmes += `
        <div class="card">
                <div class="img-card">
                    <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" alt="${filme.title}">
                </div>
                <div class="info-card">
                    <h3 class="titulo-card">${filme.title}</h3>
                    <h4 class="genero-card">${filme.genre_ids}</h4>
                    <div class="avaliacao-card">
                        <i class="fi fi-rr-star estrela"></i>
                        <h4 class=num-card>${filme.vote_average}</h4>
                    </div>
                </div>
            </div>`

            cont++
            }

        }



        document.querySelector(".cards-filme").innerHTML = htmlFilmes

    }

    fetchData().then(data => {
        data;
    });
}

function carregarProgramTV() {
    let programs = []
    let htmlPrograms = ``
    let program
    let cont = 0

    async function fetchData() {
        const response = await fetch(urlProgramTV);
        const data = await response.json();
        programs = programs.concat(data.results)


        for (let i = 0; cont < 12 && i < programs.length; i++) {

            let generoProgram = []

            program = programs[i]
            const response = await fetch(`
            https://api.themoviedb.org/3/tv/${program.id}?api_key=f1b9e75f6dc0efa5b1181f25004a24b4&language=pt-BR`);
            const dataProgram = await response.json();
            let objectGeneros = dataProgram.genres

            for (let i = 0; i < objectGeneros.length && i < 3; i++) {

                generoProgram.push(objectGeneros[i]["name"])

            }

            program.genre_ids = generoProgram.join(", ")

            if (program.vote_average > 0) {
                htmlPrograms += `
                    <div class="card">
                    <div class="img-card">
                        <img src="https://image.tmdb.org/t/p/w500/${program.poster_path}" alt="${program.title}">
                    </div>
                    <div class="info-card">
                        <h3 class="titulo-card">${program.name}</h3>
                        <h4 class="genero-card">${program.genre_ids}</h4>
                        <div class="avaliacao-card">
                            <i class="fi fi-rr-star estrela"></i>
                            <h4 class=num-card>${program.vote_average}</h4>
                        </div>
                    </div>
                </div>`

                cont++

            }

        }

        document.querySelector(".cards-program").innerHTML = htmlPrograms

    }

    fetchData().then(data => {
        data;
    });
}


