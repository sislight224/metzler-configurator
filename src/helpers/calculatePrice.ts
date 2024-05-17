export function calculatePrice(price: string, amount: number) {
  let [euros, cents] = price.split(",");
  let _cents = Number(cents) * amount;
  let _euros = 0;
  while (_cents >= 100) {
    _cents -= 100;
    _euros++;
  }
  return {
    euros: _euros + Number(euros) * amount,
    cents: _cents,
  };
}

export function formatPrice(params: { euros: number; cents: number }) {
  const { euros, cents } = params;
  return `${euros.toLocaleString("de")},${cents.toString().padStart(2, "0")}`;
}
