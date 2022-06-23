import { useState, useEffect } from 'react'
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language'
import CircularProgress from '@mui/material/CircularProgress'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CachedIcon from '@mui/icons-material/Cached';
import { HeaderAction, app, get, post, useMessage } from '@Panel'

const Locales = ({ hide }) => {

    const [locales, setLocales] = useState([])
    const [progress, setProgress] = useState(true)
    const [localeProgress, setLocaleProgress] = useState(null)
    const { success, error } = useMessage()

    useEffect(() => {
        setProgress(true)
        get('/locale/actives')
            .then(data => {
                setProgress(false)
                setLocales(data)
            }, e => {
                setProgress(false)
                error(e)
            })
    }, [])

    const apply = (event, locale) => {
        event.stopPropagation()
        event.preventDefault()
        event.nativeEvent.stopPropagation()
        event.nativeEvent.preventDefault()
        setLocaleProgress(locale.id)
        post('/locale/insertTranslations', [locale.id])
            .then(data => {
                get('/locale/data')
                    .then(data => {
                        app.setTranslations(data.translations);
                        app.setLocale(data.locale);
                        setLocaleProgress(null)
                        success('Translations are inserted')
                        hide()
                    }, e => {
                        setLocaleProgress(null)
                        error(e);
                    });
            }, e => {
                setLocaleProgress(null)
                error(e)
            })
    }

    const remove = (event, locale) => {
        event.stopPropagation()
        event.preventDefault()
        event.nativeEvent.stopPropagation()
        event.nativeEvent.preventDefault()
        setLocaleProgress(locale.id)
        post('/locale/removeTranslations', [locale.id])
            .then(data => {
                get('/locale/data')
                    .then(data => {
                        app.setTranslations(data.translations);
                        app.setLocale(data.locale);
                        setLocaleProgress(null)
                        success('Translations are removed')
                        hide()
                    }, e => {
                        setLocaleProgress(null)
                        error(e);
                    });
            }, e => {
                setLocaleProgress(null)
                error(e)
            })
    }

    return <div className="rounded-md border w-56 flex flex-col justify-center items-center bg-white py-4 dark:bg-zinc-700 ">

        {
            /* todo: in dev mode, create a quick icon besides each locale to insert its translations. create a useGlobalization hook to reuse functionality */
            progress
                ?
                <CircularProgress />
                :
                locales.map((locale, index) => <div
                    key={index}
                    className={
                        "w-full flex py-2 px-4 justify-center items-center hover:bg-green-200 cursor-pointer " +
                        ((index !== locales.length - 1) ? "mb-2" : "")
                    }
                    onClick={() => {
                        localStorage.setItem('locale', locale.key)
                        document.location.reload()
                    }}
                >
                    <div className="flex-1 flex items-center">
                        {
                            app.isDev() && <span
                                className="inline-block flex items-center"
                            >
                                {
                                    localeProgress === locale.id
                                        ?
                                        <CircularProgress
                                            className="m-2"
                                            size={24}
                                        />
                                        :
                                        <Tooltip
                                            onClick={(e) => apply(e, locale)}
                                            title='Apply localization'
                                        >
                                            <IconButton>
                                                <CachedIcon />
                                            </IconButton>
                                        </Tooltip>
                                }
                            </span>
                        }
                        {
                            app.isDev() && <span
                                className="inline-block flex items-center"
                            >
                                {
                                    localeProgress === locale.id
                                        ?
                                        <CircularProgress
                                            className="m-2"
                                            size={24}
                                        />
                                        :
                                        <Tooltip
                                            onClick={(e) => remove(e, locale)}
                                            title='Remove localization'
                                        >
                                            <IconButton>
                                                <RemoveCircleOutlineIcon />
                                            </IconButton>
                                        </Tooltip>
                                }
                            </span>
                        }
                    </div>
                    {locale.localKey}
                </div>)
        }

    </div>
}

const ChooseLocale = () => {
    return <HeaderAction
        title='Choose locale'
        icon={LanguageIcon}
        component={Locales}
    />
}

export default ChooseLocale