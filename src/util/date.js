export const timeElapsed = (date) => {
  // Verilen tarihi bir Date objesine çevirin
  const startDate = new Date(date);
  const currentDate = new Date();

  // Zaman farkını milisaniye cinsinden hesaplayın
  const timeDifference = currentDate - startDate;

  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years >= 1) {
    return `${years} yıl`;
  } else if (months >= 1) {
    return `${months} ay`;
  } else if (days >= 1) {
    return `${days} gün`;
  } else {
    return `${hours} saat`;
  }
};
