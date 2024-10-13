export function updateLivesStorage(lives: number) {
  localStorage.setItem("lives", lives.toString());
}

export function getLivesStorage(): number {
  const lives = localStorage.getItem("lives");
  if (lives) {
    return parseInt(lives);
  }
  updateLivesStorage(3);
  return 3;
}
