let allData = []

let urlData = "https://api.themoviedb.org/3/trending/all/week?api_key=f1b9e75f6dc0efa5b1181f25004a24b4&page="


async function fetchData() {
    for (let i = 1; i <= 10; i++) {
        const response = await fetch(urlData + i);
        const data = await response.json();

        allData = allData.concat(data.results)

    }
    carregarDados(allData)
}

fetchData().then(data => {
    data;
});

carregarDados = (dados) => {
    let htmlFilmes = ``
    let htmlSerie = ``

    for (let i = 0; i < 24; i++) {
        
        
    }
}