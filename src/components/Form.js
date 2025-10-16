export default function Form() {

  const divRoot = document.getElementById('root');
  divRoot.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'card p-4 shadow-lg';
  container.style.width = '100%';
  container.style.maxWidth =  '400px';
  divRoot.appendChild(container);

  const titulo = document.createElement('h1');
  titulo.textContent = 'Faça seu login';
  titulo.className = 'titulo';

  const formulario = document.createElement('form');
  formulario.className = 'd-flex flex-column';

  const email = document.createElement('input');
  email.type = 'email';
  email.placeholder = "Digite seu email";
  email.className = ' email'
  formulario.appendChild(email);

  const senha = document.createElement('input');
  senha.type = 'password';
  senha.placeholder = "Digite a sua senha";
  senha.className = "senha"
  formulario.appendChild(senha);

  const btn = document.createElement('button');
  btn.type = 'submit';
  btn.textContent = 'Entrar';
  btn.className = 'button btn-primary';
  formulario.appendChild(btn);

  container.appendChild(titulo);
  container.appendChild(formulario);
  



  return container;
} 

