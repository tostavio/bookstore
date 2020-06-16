export function format(number: number) {
  return 'R$ ' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
