
export function timeout(duration: number): Promise<{}> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {resolve()}, duration);
  })
}

export function randomNumber(min: number, max: number) : number {
  return Math.floor((Math.random() * max) + min);
}
