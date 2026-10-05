const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

export function formatPrice(value) {
  return brlFormatter.format(value);
}
