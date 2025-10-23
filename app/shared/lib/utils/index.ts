// Утилиты приложения

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("ru-RU").format(date);
};

export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};
