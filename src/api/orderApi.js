import { getToken } from "./authApi.js";

export async function finishedOrder(){
    const url = "api/order/reservation";

    const body = {

       pagamento: metodoPagamento,
       quartos: reservations.map(it => (
        {
         id: it.id,
         inicio: it.checkIn,
         fim: it.checkOut 
        }
       ))
};

    const token = getToken?.();
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "same-origin",
        body: JSON.stringify(body)
    });
    let data = null;
    try {
        data = await res.json();
    }  catch { data = null; }
    if(!res.ok) {
        const message = `Erro ao enviar o pedido: ${res.status}`;
        return {ok: false, raw: data, message};
    } return {
        ok: true,
        raw: data,
    }
}

    const resp = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify(body)
    });

    let data = null;
    try {
        data = await resp.json();
    }  catch {
        data = null;
    }

    if(!data) {
        const message = `Erro ao enviar o pedido: ${resp.status} ${resp.statusText}`;
        return {ok: false, raw: data, message};
    } return {
        ok: true,
        raw: data,
    }