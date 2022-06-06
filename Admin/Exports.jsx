import TranslateIcon from '@mui/icons-material/Translate';
import Locales from './Locale/List'
import Translations from './Translation/List'
import ChooseLocale from './Locale/Choose';

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

export { GlobalizationRoutes }
export { GlobalizationMenu }
export { Locales }
export { Translations }
export { ChooseLocale }