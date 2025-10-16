/* Listar os quartos disponíveis de acordo com inicio, fim e qtd */
export async function listAvailableRoomsRequest({ inicio, fim, qtd }) {
    const params = new URLSearchParams();
    if (inicio) params.set("inicio", inicio);
    if (fim) params.set("fim", fim);
    if (qtd !== null && qtd !== "") params.set("qtd", String(qtd));

    const url = `api/rooms/disponiveis?${params.toString()}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
        credentials: "same-origin"
    });
    let data = null;
    try {
        data = await response.json();
    }
    catch {
        data = null;
    }
    if (!response.ok) {
        const msg = data?.message || "Falha ao buscar quartos disponíveis!";
        throw new Error(msg);
    }
    const quartos = Array.isArray(data?.Quartos) ? data.Quartos : [];
    console.log(quartos);
    return quartos;
}