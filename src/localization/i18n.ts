import i18next from 'i18next';

export const i18n = () => ({
  home: {
    hello: i18next.t('home.hello'),
    next: i18next.t('home.next'),
    date: (date: string) =>
      i18next.t('home.date', {
        date,
      }),
    localText: i18next.t('home.localText'),
    addedFromLokalise: i18next.t('home.addedFromLokalise'),
    addedFromLokalise2: i18next.t('home.addedFromLokalise2'),
  },
});
