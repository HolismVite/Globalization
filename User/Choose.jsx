import { HeaderAction, get, useMessage } from '@Panel'
import { useState, useEffect } from 'react'
import LanguageIcon from '@mui/icons-material/Language'
import CircularProgress from '@mui/material/CircularProgress'

const Locales = () => {

    const [locales, setLocales] = useState([])
    const [progress, setProgress] = useState(false)
    const { error } = useMessage()

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

    return <div className="rounded-md border w-56 flex flex-col justify-center items-center bg-white py-4">

        {
            progress
                ?
                <CircularProgress />
                :
                locales.map((locale, index) => <div
                    key={index}
                    className={
                        "w-full flex py-2 justify-center items-center hover:bg-green-200 cursor-pointer " +
                        ((index !== locales.length - 1) ? "mb-2" : "")
                    }
                    onClick={() => {
                        let now = new Date()
                        now.setMonth(now.getMonth() + 12)
                        let host = document.location.host.split('.').reverse().splice(0, 2).reverse().join('.')
                        localStorage.setItem('locale', locale.key)
                        document.location.reload()
                    }}
                >
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