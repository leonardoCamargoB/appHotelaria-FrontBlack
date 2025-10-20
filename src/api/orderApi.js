export async function finishedOrder(){
    const url = "api/order/reservation";

    const body = {
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
        body: JSON.stringify(body)
    });

    if(!resp.ok){
        const message = `Erro ao enviar pedido: ${resp.status}`;
        throw new Error(message);
    }
    return resp.json();
}