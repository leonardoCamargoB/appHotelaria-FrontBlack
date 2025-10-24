export default function FormRoom() {
  const form = document.createElement('form');
  form.className = 'room-form';
 
  const inputnome = document.createElement('input');
  inputnome.type = 'text';
  inputnome.placeholder = "Digite o nome do quarto";
  form.appendChild(inputnome);
 
  const inputnumero = document.createElement('input');
  inputnumero.type = 'text';
  inputnumero.placeholder = "Digite o numero do quarto";
  form.appendChild(inputnumero);
 
  const inputqtdCamaCasal = document.createElement('input');
  inputqtdCamaCasal.type = 'number';
  inputqtdCamaCasal.placeholder = "Digite a quantidade de cama(s) casal do quarto";
  form.appendChild(inputqtdCamaCasal);
 
  const inputqtdCamaSol = document.createElement('input');
  inputqtdCamaSol.type = 'number';
  inputqtdCamaSol.placeholder = "Digite a quantidade de cama(s) de solteiro";
  form.appendChild(inputqtdCamaSol);
 
  const inputPreco = document.createElement('input');
  inputPreco.type = 'number';
  inputPreco.placeholder = "Digite o preço do quarto";
  form.appendChild(inputPreco);
 
  // SEÇÃO DISPONIBILIDADE CORRIGIDA
  const disponibilidadeContainer = document.createElement('div');
  disponibilidadeContainer.style.margin = '10px 0';
  
  const labelDisponivel = document.createElement('label');
  labelDisponivel.textContent = "O quarto está disponível?";
  labelDisponivel.style.display = 'block';
  labelDisponivel.style.marginBottom = '5px';
  
  const opcoesContainer = document.createElement('div');
  opcoesContainer.style.display = 'flex';
  opcoesContainer.style.gap = '15px';
  
  // Opção Sim
  const opcaoSim = document.createElement('div');
  opcaoSim.style.display = 'flex';
  opcaoSim.style.alignItems = 'center';
  opcaoSim.style.gap = '5px';
  
  const inputSim = document.createElement('input');
  inputSim.type = 'radio';
  inputSim.name = 'disponibilidade';
  inputSim.value = 'sim';
  inputSim.id = 'disponivel-sim';
  
  const labelSim = document.createElement('label');
  labelSim.htmlFor = 'disponivel-sim';
  labelSim.textContent = 'Sim';
  labelSim.style.cursor = 'pointer';
  
  opcaoSim.appendChild(inputSim);
  opcaoSim.appendChild(labelSim);
  
  // Opção Não
  const opcaoNao = document.createElement('div');
  opcaoNao.style.display = 'flex';
  opcaoNao.style.alignItems = 'center';
  opcaoNao.style.gap = '5px';
  
  const inputNao = document.createElement('input');
  inputNao.type = 'radio';
  inputNao.name = 'disponibilidade';
  inputNao.value = 'nao';
  inputNao.id = 'disponivel-nao';
  
  const labelNao = document.createElement('label');
  labelNao.htmlFor = 'disponivel-nao';
  labelNao.textContent = 'Não';
  labelNao.style.cursor = 'pointer';
  
  opcaoNao.appendChild(inputNao);
  opcaoNao.appendChild(labelNao);
  
  // Montando a seção
  opcoesContainer.appendChild(opcaoSim);
  opcoesContainer.appendChild(opcaoNao);
  disponibilidadeContainer.appendChild(labelDisponivel);
  disponibilidadeContainer.appendChild(opcoesContainer);
  form.appendChild(disponibilidadeContainer);

    const inputFotos = document.createElement('input');
    inputFotos.className = 'form-control';
    inputFotos.type = 'file';
    inputFotos.id = 'formFileMultiple';
    inputFotos.multiple = true;
    inputFotos.accept = 'image/*';
    inputFotos.name = 'fotos[]';
  


 
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Cadastrar Quarto';
  form.appendChild(submitButton);
 
  return form;
}
 