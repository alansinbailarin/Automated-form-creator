export const useTimeRemaining = (survey) => {
  const timeRemaining = ref("");

  const calculateTimeRemaining = () => {
    if (!survey || !survey.start_date || !survey.end_date) return;

    const startDate = new Date(survey.start_date);
    const endDate = new Date(survey.end_date);
    const timeDiff = endDate - startDate;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    timeRemaining.value = `Quedan ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos`;
  };

  return { timeRemaining, calculateTimeRemaining };
};
