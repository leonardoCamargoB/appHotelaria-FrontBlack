import Footer from "../components/Footer.js";
import Hero from"../components/Hero.js";
import Navbar from "../components/Navbar.js";
import DateSelector from "../components/dataSelector.js";
import dataSelector from "../components/dataSelector.js";
import { listAvailableRoomsRequest } from "../api/quartosApi.js";
import RoomCard from "../components/quartoCard.js";
import modal from "../components/modal.js";
import CardLounge from "../components/CardLounge.js";
 
export default function renderHomePage() {
    const nav = document.getElementById('navbar');
    nav.innerHTML = "";
 
    const navbar = Navbar();
    nav.appendChild(navbar);  
 
    const home = document.getElementById('root');
    home.innerHTML = "";
 
    const hero = Hero();
    home.appendChild(hero);
 
    const rodape = document.getElementById('Footer');
    rodape.innerHTML = "";
 
    const Ft = Footer();
    rodape.appendChild(Ft);
 
    const seletordata = document.getElementById('dataSelector');
    seletordata.innerHTML = "";
 
    const dataS = DateSelector();
    seletordata.appendChild(dataS);
 
    const cardQuarto = document.getElementById('card');
    cardQuarto.className = "cards";
    cardQuarto.innerHTML = "";
   
 
    for(var i=0; i <3; i++){
        const cards = RoomCard(i);
        cardQuarto.appendChild(cards);
    }
 
    const [dateCheckIn, dateCheckOut] = dataS.querySelectorAll('input[type="date"]');
    const guestAmount = dataS.querySelector('select'); // querySelector para elemento único
    const btnSearchRoom = dataS.querySelector('button');

 
      //Grupo pa    qra incorporar cada div de cada card, para aplicar display-flex
    const cardsGroup = document.createElement('div');
    cardsGroup.className = "cards";
    cardsGroup.id = "cards-result"; 
    
    const cardLounge = document.getElementById('card');
    cardLounge.className = "cardLoung";
    cardLounge.innerHTML = "";
    cardsGroup.appendChild(cardLounge)

    const loungeItens = [
        {path: "resturante1.jpg", tittle: "Restaurante", text: "Nosso restaurante é um espaço agradavel e familiar"},
        {path: "spa.jpg", tittle: "SPA", text: "Nosso SPA é ideal para momentos de relaxamento"},
        {path: "bar.jpg", tittle: "Bar", text: "Nosso bar oferece drinks sem metanol, confia!"}
    ];

    for(let i = 0; i < loungeItens.length; i++){
        const cardLounge = CardLounge(loungeItens[i], i);
        cardsGroupInfra.appendChild(cardLounge);
    }

    const cardsGroupInfra = document.createElement('div');
    cardsGroupInfra.className = 'cards';
    
   

  btnSearchRoom.addEventListener("click", async (e) => {
        e.preventDefault();
 
        const inicio = (dateCheckIn?.value || "").trim();
        const fim = (dateCheckOut?.value || "").trim();
        const capacidade = parseInt(guestAmount?.value || "0", 10);
 
        //validação do preenchimento de infos
        if (!inicio || !fim || Number.isNaN(capacidade) || capacidade <= 0) {
            console.log("preencha todos os campos!");
            /*tarefa 1: renderizar nesse if() posteriormente um modal do bootstrap
            https://getbootstrap.com/docs/5.3/components/modal/*/
            return;
        }
 
        /*OBS: falta impedir que o usuário pesquise por uma data passada*/
        const dtInicio = new Date(inicio);
        const dtFim = new Date(fim);
 
        if (isNaN(dtInicio) || isNaN(dtFim) || dtInicio >= dtFim) {
            console.log("a data de check-out deve ser posterior ao check-in!");
            /*tarefa 2: renderizar nesse if() posteriormente um modal do bootstrap!
            https://getbootstrap.com/docs/5.3/components/modal/*/
            return;
        }
 
        console.log("buscando quartos disponíveis");
        /*tarefa 3: renderizar na tela um símbolo de loading (spinner do bootstrap)
        https://getbootstrap.com/docs/5.3/components/spinners*/
 
 
        try {
            const result = await listAvailableRoomsRequest({inicio, fim, qtd});
            if (!result.length) {
                console.log("nenhum quarto disponível para esse período");
                /*tarefa 4: renderizar nesse if() posteriormente um modal do bootstrap
                https://getbootstrap.com/docs/5.3/components/modal*/
                return;
            }
            cardsGroup.innerHTML = '';
            result.forEach((itemCard, i) => {
                cardsGroup.appendChild(RoomCards(itemCard, i));
            });
            cardsGroup.appendChild();
        }
        catch(error) {
            console.log(error);
        }
    });
 
   
    /*Desafio: consertar o bug do carrossel
    em cada card, E AINDA REUTILIZANDO O MESMO
    COMPONENTE*/
    for (var i=0; i < 3; i++) {
        const cards = RoomCard(i);
        cardsGroup.appendChild(cards);
    }
   
    home.appendChild(cardsGroup);
    home.appendChild(cardsGroupInfra)
}