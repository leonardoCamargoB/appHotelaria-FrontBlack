import FormRoom from "../components/FormRoom.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import { addRoom } from "../api/quartosApi.js";
 


export default function renderRegisterRoom() {
    const nav = document.getElementById('navbar');
    nav.innerHTML = "";
    const navbar = Navbar();
    nav.appendChild(navbar);
 
    const home = document.getElementById('root');
    home.innerHTML = "";
 
    // Criando o título
    const titulo = document.createElement('h1');
    titulo.textContent = "Cadastro de quartos";
    titulo.style.textAlign = 'center';
    titulo.style.margin = '20px 0';
 
    const formRoom = FormRoom();
    const containerRoom = document.createElement('div');
    containerRoom.className = 'cards';
    containerRoom.appendChild(formRoom);
    
    // Adicionando título e container separadamente
    home.appendChild(titulo);
    home.appendChild(containerRoom);


 contentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try { 
            const response = await addRoom(contentForm);
            console.log("Resposta do servidor: " + response);
        }
        catch (error) {
            console.log("Erro ao enviar requisição: " + error.message);
        }
    })
}
    Footer();

