import renderLoginPage from "./pages/login.js";
import renderCadastroPage from "./pages/cadastro.js";
import renderHomePage from "./pages/home.js";
import renderCarrinhoPage from "./pages/carrinho.js";
import renderRegisterRoom from "./pages/register-room.js";
 
const routes = {
    "/login": renderLoginPage,
    "/cadastro": renderCadastroPage,
    "/home" : renderHomePage,
    "/carrinho": renderCarrinhoPage,
    "/registerRoom": renderRegisterRoom
    //novas paginas aqui adicionadas confrome desenvolvidas
};
 
//obtem o caminho atual a partir do hash da URL
function getPath() {
    //obtem o hash, remove o # e tira os espaços
    const url = (location.pathname || "").replace("/MeuSite/", "/").trim();
    console.log(url);
    //retorna url se começar com "/" se não, retorna "/home" como padrao
    return url && url.startsWith("/") ? url : "/home";
}
 
//decide o que renderizar com base na rota atual
function renderRoutes(){
    const url= getPath(); //le a rota atual, ex. "/cadastro"
    const render = routes[url] || routes ["/home"] //busca esta rota no mapa
    render(); //executa a função de render na pagina atual
} 
//renderização
document.addEventListener('DOMContentLoaded', renderRoutes);
                                                                           