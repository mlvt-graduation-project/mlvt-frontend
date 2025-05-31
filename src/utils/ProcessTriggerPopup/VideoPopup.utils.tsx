import { TranslateLanguage } from '../../types/Translation';

const languageCodeMap: Record<TranslateLanguage, string> = {
    [TranslateLanguage.English]: 'en',
    [TranslateLanguage.Vietnamese]: 'vi',
    [TranslateLanguage.Spanish]: 'es',
    [TranslateLanguage.French]: 'fr',
    [TranslateLanguage.German]: 'de',
    [TranslateLanguage.Italian]: 'it',
    [TranslateLanguage.Mandarin]: 'zh',
    [TranslateLanguage.Japanese]: 'ja',
    [TranslateLanguage.Korean]: 'ko',
    [TranslateLanguage.Russian]: 'ru',
    [TranslateLanguage.Arabic]: 'ar',
    [TranslateLanguage.Hindi]: 'hi',
    [TranslateLanguage.Portuguese]: 'pt',
    [TranslateLanguage.Bengali]: 'bn',
    [TranslateLanguage.Malay]: 'ms',
    [TranslateLanguage.Thai]: 'th',
};

export function getLanguageCode(language: TranslateLanguage): string {
    return languageCodeMap[language] || '';
}
