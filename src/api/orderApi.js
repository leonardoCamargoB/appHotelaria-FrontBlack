export async function finishedOrder(){
    const url = "api/order/reservation";

    const body = {

       cliente_id: 1,

       pagamento: "pix",
       quartos: getTotalItems.map(it => (
        {
         id: it.roomId,
         inicio: it.checkIn,
         fim: it.checkOut
        }
       ))
};
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
}