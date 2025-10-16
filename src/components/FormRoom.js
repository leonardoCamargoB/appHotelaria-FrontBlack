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
    
    const labelDisponivel = document.createElement('label');
    labelDisponivel.type = 'radio';
    labelDisponivel.textContent = "O quarto está disponível?"

    const inputDisponivel = document.createElement('input');
    inputDisponivel.type = 'radio';
    inputDisponivel.id = 'disponivel';
    
        // No final da função FormRoom(), antes do return form:
    const fileInputSection = document.createElement('div');
    fileInputSection.innerHTML = `
        <div class="mb-3">
            <label for="formFile" class="form-label">Imagem do quarto</label>
            <input class="form-control" type="file" id="formFile">
        </div>
        `;
    form.appendChild(fileInputSection);
    form.appendChild(labelDisponivel);
    form.appendChild(inputDisponivel);
    

    // Adicionando botão de submit
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Cadastrar Quarto';
    form.appendChild(submitButton);



    return form; 
}