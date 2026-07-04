export function money(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

export default money;