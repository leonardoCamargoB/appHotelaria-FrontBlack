import { addItemToHotel_Cart } from "../store/cartStore.js";
// import dataSelector from "./DateSelector.js";
import Modal from "./modal.js";

function calculoDiaria(checkIn, checkOut ) {
    // const checkIn = "2026-01-01";
    // const checkOut = "2026-01-08";

    const [yin, min, din] = String(checkIn).split("-").map(Number);
    const [yout, mout, dout] = String(checkOut).split("-").map(Number);

    const tzin = Date.UTC(yin, min - 1, din);
    const tzout = Date.UTC(yout, mout - 1, dout);

    // console.log("Milissegundos desde 2026-01-01 00:00:00" + tzin);

    return Math.floor((tzout - tzin) / (1000 * 60 * 60 * 24));

}




export default function RoomCard(itemCard, index = 0) {
    const {
        id,
        nome,
        numero,
        qnt_cama_casal,
        qnt_cama_solteiro,
        preco
    } = itemCard || {};
 
    const title = nome || 'Quarto Premium';
    const camas = [
        (qnt_cama_casal != null ? `${qnt_cama_casal} cama de casal` : null),
        (qnt_cama_solteiro != null ? `${qnt_cama_solteiro} cama de solteiro` : null),
    ].filter(Boolean).join(' - ');
 
    const card = document.createElement('div');
    card.className = "cardContainer";
    card.innerHTML = `
        <div class="card" style="width: 18rem;">
            <div id="carouselExampleIndicators-${index}" class="carousel slide">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators-${index}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators-${index}" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators-${index}" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
 
                <div class="carousel-inner shadow">
                    <div class="carousel-item active">
                        <img src="public/assets/images/imgh1.jpg" class="d-block w-100" alt="Imagem 1">
                    </div>
                   
                    <div class="carousel-item">
                        <img src="public/assets/images/imgh3.jpg" class="d-block w-100" alt="Imagem 2">
                    </div>
                    <div class="carousel-item">
                        <img src="public/assets/images/imgh2.jpg" class="d-block w-100" alt="Imagem 3">
                    </div>
                </div>
            </div>
 
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <ul class="list-unstyled mb-2">
                    ${camas ? `<li>${camas}</li>` : ""}
                    ${preco != null ? `<li>Preço diária: R$ ${Number(preco).toFixed(2)}</li>` : ""}
                </ul>
                <a href="#" class="btn btn-primary">Reservar</a>
            </div>
        </div>
    `;

    card.querySelector('a').addEventListener('click', (event) => {
        event.preventDefault();

        const idDateCheckIn = document.getElementById('id-dateCheckIn');
        const idDateCheckOut = document.getElementById('id-dateCheckOut');
        const guestAmount = document.getElementById('id-guestAmount');

        if (!inicio || !fim || Number.isNaN(qtd) || qtd <= 0) {
            console.log("Preencha todos os campos!");
            return;
        }

        const daily = calculoDiaria(inicio, fim);

        const subtotal = parseFloat(preco) * daily;
        const newItemReserve = {
            id,
            nome,
            checkIn: inicio,
            checkOut: fim,
            guest: qtd,
            daily,
            subtotal
        };
        addItemToHotel_Cart(newItemReserve);
        alert(`Reserva do quarto adicionada: ${nome}
            - Preço/diária: R$ ${preco}
            - Diárias: ${daily}
            - Subtotal: R$ ${subtotal}`);
    });
 
    return card;
}
 
 