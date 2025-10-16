export async function createRequest(nome,cpf,telefone,email,senha){
    const dados = {nome,cpf,telefone, email, senha};
    const response = await fetch("api/clientes", {
        method: "POST",
        headers:{
            "Accept": "application/json",
            "Xontent-Type": "application/json"
        },

        body: JSON.stringify(dados),
        credentials: "same-origin"
    });

    let data = null;
    try{
        data = await response.json();
    } catch {
        data = null;
    }
    return {
        ok: true,
        raw: data
    }
}