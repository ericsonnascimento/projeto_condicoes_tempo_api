const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null = document.querySelector("#input-localizacao"); //somos obrigados a declarar o que o imput é para que o .value no input funcione
const sectionTempoInfo = document.querySelector('#tempo-info');

form?.addEventListener('submit', async (event) => { //transformamos a função arrow em async para que o "fetch" possa ser await
    event.preventDefault(); //estamos removendo o recarregamento da página ao submeter o formulário

    if (!input || !sectionTempoInfo) return; //se ele não achar o input ou o sectionTempoInfo na página ele sai da função através do retorno evitando a colocação "?" do null automaticamente no código, tornando um elemento.

    const localizacao = input.value;

    if (localizacao.length < 3) {
        alert('O local precisa ter, pelo menos, 3 letras');
        return;
    };

    try {
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=2d756f78ccacdc86aeb912f4ddac4129&lang=pt_br&units=metric`); //capturando dados da API passando via variável gerada pelo input com os dados da pesquisa
    
        const dados = await resposta.json(); //transformando os dados em jason
    
        console.log(dados); //ver no console onde estão cada um dados.
    
        //vamos criar uma variavel com chave-valor com os dados capturados pela variável 'dados'
        const infos = {
            temperatura: Math.round(dados.main.temp),
            local: dados.nome,
            icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
        };
    
        //Aqui estamos renderizando todo o bloco de código que está dentro da <section> modificando apenas os dados capturados na variável "infos".
        sectionTempoInfo.innerHTML = `
        <div class="tempo-dados">
            <h2>${infos.local}</h2>
    
            <span>${infos.temperatura}</span>
        </div>
    
        <img src="${infos.icone}" alt="imagem do clima"/>`;

    }catch (error) {
        console.log('Deu um erro na obtenção dos dados da API.', error);
    };
});