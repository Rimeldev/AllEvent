/**
 * Construit le payload EXACT demandé par le backend
 */
export function buildPaymentPayload({
  itemsArray,
  purchaser_email,
  purchaser_lastname,
  purchaser_firstname,
  purchase_item_logo
}) {
  return {
    // ⚠️ Le backend exige une STRING JSON
    items: JSON.stringify(itemsArray),

    email: purchaser_email,
    lastname: purchaser_lastname,
    firstname: purchaser_firstname,
    logo_url: purchase_item_logo,

    timestamp: Date.now()
  };
}
