export default function DateSelector() {
    const divDate = document.createElement('div');
    divDate.className = 'divDate';
   
    const dateCheckIn = document.createElement('input');
    dateCheckIn.type = 'date';
    dateCheckIn.className = 'card p-3 shadow-lg inputDate';
    dateCheckIn.name = 'checkin';
    dateCheckIn.placeholder = 'Data de Check-in';
   
    const dateCheckOut = document.createElement('input');
    dateCheckOut.type = 'date';
    dateCheckOut.className = 'card p-3 shadow-lg inputDate';
    dateCheckOut.name = 'checkout';
    dateCheckOut.placeholder = 'Data de Check-out';
    // REMOVIDO: dateCheckOut.disabled = true;
   
    const guestAmount = document.createElement('select');
    guestAmount.className = 'card p-3 shadow-lg inputDate';
    guestAmount.innerHTML = `
    <option value="0">Quantas Pessoas?</option>
    <option value="1">1 pessoa</option>
    <option value="2">2 pessoas</option>
    <option value="3">3 pessoas</option>
    <option value="4">4 pessoas</option>
    <option value="5">5 ou mais pessoas</option>`;
   
    const btnSearchRoom = document.createElement('button');
    btnSearchRoom.type = 'button';
    btnSearchRoom.textContent = 'Pesquisar';
    btnSearchRoom.className = 'btn btn-primary';
 
    //Configurar a data mínima como hoje
    const today = new Date().toISOString().split('T')[0];
    dateCheckIn.min = today;
    dateCheckOut.min = today;
 
    // Função para calcular a data mínima do check-out (check-in + 1 dia)
    function getMinCheckoutDate(checkinDate) {
        const minDate = new Date(checkinDate);
        minDate.setDate(minDate.getDate() + 1);
        return minDate.toISOString().split('T')[0];
    }
 
    // Evento quando a data de check-in é alterada
    dateCheckIn.addEventListener('change', function() {
        if (dateCheckIn.value) {
            // Definir a data mínima do check-out como check-in + 1 dia
            const minCheckout = getMinCheckoutDate(dateCheckIn.value);
            dateCheckOut.min = minCheckout;
           
            // Se já houver uma data de check-out selecionada e for inválida, limpar
            if (dateCheckOut.value && dateCheckOut.value <= dateCheckIn.value) {
                dateCheckOut.value = '';
                showTemporaryMessage('Por favor, selecione uma data de check-out posterior ao check-in.');
            }
        }
    });
 
    // Evento quando a data de check-out é alterada
    dateCheckOut.addEventListener('change', function() {
        if (dateCheckIn.value && dateCheckOut.value) {
            const checkInDate = new Date(dateCheckIn.value);
            const checkOutDate = new Date(dateCheckOut.value);
           
            if (checkOutDate <= checkInDate) {
                // Data inválida - resetar e mostrar mensagem
                this.value = '';
                showTemporaryMessage('A data de check-out deve ser posterior à data de check-in.');
                this.focus();
            }
        }
    });
 
    // Função para mostrar mensagens temporárias
    function showTemporaryMessage(message) {
        // Remove mensagem anterior se existir
        const existingMessage = divDate.querySelector('.temp-message');
        if (existingMessage) {
            existingMessage.remove();
        }
       
        const messageElement = document.createElement('div');
        messageElement.className = 'temp-message alert alert-warning mt-2';
        messageElement.textContent = message;
        messageElement.style.fontSize = '0.8rem';
       
        // Inserir após os inputs
        divDate.appendChild(messageElement);
       
        // Remover após 3 segundos
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 3000);
    }
 
    // Validação completa no clique do botão
    btnSearchRoom.addEventListener('click', function(e) {
        // Remove mensagens temporárias existentes
        const existingMessage = divDate.querySelector('.temp-message');
        if (existingMessage) {
            existingMessage.remove();
        }
 
        const checkInValue = dateCheckIn.value;
        const checkOutValue = dateCheckOut.value;
       
        // Validar check-in
        if (!checkInValue) {
            alert('Por favor, selecione a data de check-in!');
            dateCheckIn.focus();
            return;
        }
       
        // Validar check-out
        if (!checkOutValue) {
            alert('Por favor, selecione a data de check-out!');
            dateCheckOut.focus();
            return;
        }
       
        // Validar se check-out é depois do check-in
        const checkInDate = new Date(checkInValue);
        const checkOutDate = new Date(checkOutValue);
       
        if (checkOutDate <= checkInDate) {
            alert('A data de check-out deve ser posterior à data de check-in!');
            dateCheckOut.focus();
            return;
        }
       
        // Validar quantidade de pessoas
        if (guestAmount.value === '0') {
            alert('Por favor, selecione a quantidade de pessoas!');
            guestAmount.focus();
            return;
        }
       
        // Aqui você pode adicionar a lógica de submit do formulário
    });
 
    divDate.appendChild(dateCheckIn);
    divDate.appendChild(dateCheckOut);
    divDate.appendChild(guestAmount);
    divDate.appendChild(btnSearchRoom);
   
    return divDate;
}