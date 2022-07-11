import TranslateIcon from '@mui/icons-material/Translate';
import ChooseLocale from './Locale/Choose';
import Locales from './Locale/List'
import Translations from './Translation/List'

const GlobalizationRoutes = [
    {
        path: "/locales",
        component: Locales
    },
    {
        path: "/translations",
        component: Translations
    }
]

const GlobalizationMenu = [
    {
        title: "Globalization",
        icon: TranslateIcon,
        children: [
            {
                title: "Locales",
                url: "/locales"
            },
            {
                title: "Translations",
                url: "/translations"
            }
        ]
    }
]

export { ChooseLocale }
export { GlobalizationMenu }
export { GlobalizationRoutes }
export { Locales }
export { Translations }