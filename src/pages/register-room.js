import FormRoom from "../components/FormRoom.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";

export default function renderRegisterRoom() {
    const nav = document.getElementById('navbar');
    nav.innerHTML = "";

    const navbar = Navbar();
    nav.appendChild(navbar);  

    const home = document.getElementById('root');
    home.innerHTML = "";

    /* const titulo = formulario.querySelector('h1');
    titulo.textContent = "Cadastro Quarto";*/

    const formRoom = FormRoom(); // Agora isso retorna um elemento DOM válido
   
    const containerRoom = document.createElement('div');
    containerRoom.className = 'cards';
    containerRoom.appendChild(formRoom);
    home.appendChild(containerRoom);
   
    Footer();
}