const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatAsPrice = (price: number) => priceFormatter.format(price);

export const getImportToken = () => {
  const savedToken = localStorage.getItem("authorization_token");

  return savedToken || "";
};
