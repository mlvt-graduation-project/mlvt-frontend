import { TranslateLanguage } from '../../types/Translation'

const languageCodeMap: Record<TranslateLanguage, string> = {
    [TranslateLanguage.English]: 'en',
    [TranslateLanguage.Vietnamese]: 'vi',
}

export function getLanguageCode(language: TranslateLanguage): string {
    return languageCodeMap[language] || ''
}
