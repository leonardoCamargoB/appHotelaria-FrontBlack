export async function cadRoom(formu) {
    const formData = new FormData(formu);
    const typeAccept = ['image/jpeg', 'image/png'];
    const inputFotos = formu.querySelector('#formFileMultiple');
    const imgs = inputFotos.files;
    for (let i = 0; i < imgs.length; i++) {
        if(!typeAccept.includes(imgs[i].type)) {
            throw new Error(`Arquivo "${imgs[i].name}" não é suportado.
            Selecione um arquivo JPG ou PNG`);
        }}
    const url = `api/quartos`;
    const response = await fetch(url, {
        method: "POST",
        body: formData
    });
    // Interpreta a resposta como JSON
    let result = null;
    try {
        result = await response.json();
    }
    catch {
        // Se não for JSON válido, result permanece null
        result = null;
    }
    if(!response.ok) {
        throw new Error(`Erro ao enviar requisição: ${response.status}`);
    }
    return result; }   




/* Listar os quartos disponíveis de acordo com inicio, fim e qtd */
export async function listAllRoomRequest(inicio, fim, qtd) {
    const dados = {
        inicio: inicio,
        fim: fim,
        qtd: qtd
    };
    
    try {
        const response = await fetch("api/quartos", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados),
            credentials: "same-origin"
        });
        
        const responseText = await response.text();
        
        let data = null;
        try {
            data = JSON.parse(responseText);
        } catch (error) {
            data = null;
        }

        if (!response.ok) {
            const message = data?.message || "Resposta inválida do servidor!";
            return {
                ok: false, 
                raw: data, 
                message: message
            };
        }

        return {
            ok: true,
            raw: data
        };

    } catch (error) {
        return {
            ok: false,
            raw: null,
            message: `Erro de rede: ${error.message}`
        };
    }
}

