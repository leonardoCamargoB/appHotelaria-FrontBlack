import Footer from "../components/Footer.js";
import Navbar from "../components/Navbar.js";


export default function renderCarrinhoPage(){

     const nav = document.getElementById('navbar');
        nav.innerHTML = "";
      
        const navbar = Navbar();
        nav.appendChild(navbar);  

        const divRoot = document.getElementById('root');
        divRoot.innerHTML = "";

        const rodape = document.getElementById('Footer');
            rodape.innerHTML = "";
        
            const Ft = Footer();
            rodape.appendChild(Ft);


        const titulo = formulario.querySelector('h1');
            titulo.textContent = "Carrinho";
            titulo.className = 'titulo';


        const catQuarto = document.createElement('input');
        catQuarto.type = 'Categoria de quarto';
        catQuarto.className = ' categoria de quarto'
        formulario.appendChild(catQuarto);

        const nPessoas = document.createElement('input');
        nPessoas.type = 'Quantas pessoas';
        nPessoas.className = 'Quantas pessoas'
        formulario.appendChild(nPessoas);


        const Preço = document.createElement('input');
        Preço.type = 'Preço diária';
        Preço.className = 'Preço diária'
        formulario.appendChild(Preço);   
}