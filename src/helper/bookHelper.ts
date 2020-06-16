interface Star {
  isOn: boolean;
}
interface MakeStarsArrayProp {
  numberOfOnStars: number;
  numberOfStars?: number;
}
export function makeStarsArray({
  numberOfOnStars,
  numberOfStars = 5,
}: MakeStarsArrayProp): Star[] {
  const fakeArray = [...Array(numberOfStars)];
  return fakeArray.map((_, index) =>
    index + 1 <= numberOfOnStars ? { isOn: true } : { isOn: false },
  );
}
