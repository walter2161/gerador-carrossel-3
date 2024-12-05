export function formatCurrency(value: string): string {
  const numericValue = Number(value.replace(/\D/g, ''));
  
  if (numericValue >= 1000) {
    return `R$ ${(numericValue / 1000).toFixed(3)} Mi`;
  } else {
    return `R$ ${numericValue} Mil`;
  }
}