import Footer from "../components/Footer.js";
import Hero from"../components/Hero.js";
import Navbar from "../components/Navbar.js";
import DateSelector from "../components/dataSelector.js";
import dataSelector from "../components/dataSelector.js";
import { listAllRoomRequest } from "../api/quartosApi.js";
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

    // CORREÇÃO: Limpar e preparar a seção de cards corretamente
    const cardSection = document.getElementById('card');
    cardSection.innerHTML = "";
    cardSection.className = "cards-section"; // Classe específica

    // CORREÇÃO: Criar containers separados para cada tipo de card
    const roomsContainer = document.createElement('div');
    roomsContainer.className = "rooms-container";
    roomsContainer.id = "rooms-cards";
    
    const loungeContainer = document.createElement('div');
    loungeContainer.className = "lounge-container";
    loungeContainer.id = "lounge-cards";

    // CORREÇÃO: Adicionar títulos para organizar melhor
    const roomsTitle = document.createElement('h2');
    roomsTitle.className = "section-title";
    roomsTitle.textContent = "Nossos Quartos";
    roomsContainer.appendChild(roomsTitle);

    const loungeTitle = document.createElement('h2');
    loungeTitle.className = "section-title";
    loungeTitle.textContent = "Conheça Nossas Instalações";
    loungeContainer.appendChild(loungeTitle);

    // CORREÇÃO: Renderizar cards de quartos
    const roomsCardsWrapper = document.createElement('div');
    roomsCardsWrapper.className = "cards-wrapper rooms-cards";
    
    for(let i = 0; i < 3; i++) {
        const roomCard = RoomCard(i);
        roomsCardsWrapper.appendChild(roomCard);
    }
    roomsContainer.appendChild(roomsCardsWrapper);

    // CORREÇÃO: Renderizar cards de lounge
    const loungeCardsWrapper = document.createElement('div');
    loungeCardsWrapper.className = "cards-wrapper lounge-cards";

    const loungeItems = [
        {path: "Palmeiras_logo.svg.webp", title: "Restaurante", text: "Nosso restaurante é um espaço agradável e familiar!"},
        {path: "Palmeiras_logo.svg.webp", title: "SPA", text: "Nosso SPA é ideal para momentos de relaxamento!"},
        {path: "Palmeiras_logo.svg.webp", title: "Bar", text: "Nosso bar oferece drinks sem metanol, confia!"}
    ];

    for (let i = 0; i < loungeItems.length; i++) {
        const loungeCard = CardLounge(loungeItems[i], i);
        loungeCardsWrapper.appendChild(loungeCard);
    }
    loungeContainer.appendChild(loungeCardsWrapper);

    // CORREÇÃO: Adicionar containers na seção principal
    cardSection.appendChild(roomsContainer);
    cardSection.appendChild(loungeContainer);

    // Configuração do date selector (mantido igual)
    const [dateCheckIn, dateCheckOut] = dataS.querySelectorAll('input[type="date"]');
    const guestAmount = dataS.querySelector('select');
    
    dateCheckIn.id = 'id-dateCheckIn';
    dateCheckOut.id = 'id-dateCheckOut';
    guestAmount.id = 'id-guestAmount';

    const btnSearchRoom = dataS.querySelector('button');

    // CORREÇÃO: Event listener para busca
    btnSearchRoom.addEventListener("click", async (e) => {
        e.preventDefault();

        const inicio = (dateCheckIn?.value || "").trim();
        const fim = (dateCheckOut?.value || "").trim();
        const capacidade = parseInt(guestAmount?.value || "0", 10);

        if (!inicio || !fim || Number.isNaN(capacidade) || capacidade <= 0) {
            console.log("preencha todos os campos!");
            // Adicionar modal de erro aqui
            return;
        }

        const dtInicio = new Date(inicio);
        const dtFim = new Date(fim);

        if (isNaN(dtInicio) || isNaN(dtFim) || dtInicio >= dtFim) {
            console.log("a data de check-out deve ser posterior ao check-in!");
            // Adicionar modal de erro aqui
            return;
        }

        console.log("buscando quartos disponíveis");
        // Adicionar spinner de loading aqui

        try {
            const result = await listAllRoomRequest({inicio, fim, capacidade});
            if (!result.length) {
                console.log("nenhum quarto disponível para esse período");
                // Adicionar modal de informação aqui
                return;
            }
            
            // CORREÇÃO: Atualizar apenas os cards de quartos
            roomsCardsWrapper.innerHTML = '';
            result.forEach((itemCard, i) => {
                const newCard = RoomCard(itemCard, i);
                roomsCardsWrapper.appendChild(newCard);
            });
        }
        catch(error) {
            console.log(error);
        }
    });
}