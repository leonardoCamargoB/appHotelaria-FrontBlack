const key = "hotel_cart"; 
 
export function setCart(hotel_cart) { 
  localStorage.setItem(key, JSON.stringify(Array.isArray(hotel_cart) ? hotel_cart: [])); 
} 
 
export function getCart() { 
  try { 
    const raw = localStorage.getItem(key); 
    const hotel_cart = raw ? JSON.parse(raw) : []; 
    return Array.isArray(hotel_cart) ? hotel_cart : []; 
  } catch { 
    return []; 
  } 
} 
 
export function addItemToHotel_Cart(item) { 
  const hotel_cart = getCart(); 
  hotel_cart.push(item); 
  setCart(hotel_cart); 
  return hotel_cart; 
} 
 
export function removeItemFromHotel_Cart(i) { 
  const hotel_cart = getCart();
  hotel_cart.splice(i, 1);
  setCart(hotel_cart);
  return hotel_cart;
} 
 
export function clearHotel_Cart() { 
  setCart([]); 
} 
 
export function getTotalItems() { 
  const items = getCart(); 
  const total = items.reduce((acc, it) => acc + Number(it.subtotal || 0), 0); 
  return { total, qtd_items: items.length };
}