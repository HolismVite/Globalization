import TranslateIcon from '@mui/icons-material/Translate';
import { List, ListAction, Text, EntityAction, BooleanProperty, app, post } from '@List';

const listActions = (itemIds) => {

    const insertTranslations = ({ setProgress, success, error }) => {
        setProgress(true)
        post('/locale/insertTranslations', itemIds)
            .then(data => {
                setProgress(false)
                success('Translations are inserted')
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    return <>
        <ListAction
            title="Insert Translations"
            icon={TranslateIcon}
            click={(params) => insertTranslations(params)}
            minCardinality={1}
            superAdmin
            devOnly
        />
    </>
}

const headers = <>
    <th>Key</th>
    <th>Local Key</th>
    <th>Is RTL</th>
    <th>Is Active</th>
    <th>Country</th>
</>

const row = (item) => {
    return <>
        <td>{item.key}</td>
        <td>{item.localKey}</td>
        <td>
            <BooleanProperty
                column='isActive'
                value={item.isRtl}
            />
        </td>
        <td>
            <BooleanProperty
                //title={item.isActive ? 'Yes, click to deactivate' : 'No, click to activate'}
                column='isActive'
                value={item.isActive}
                action={`/locale/toggleIsActive/${item.id}`}
            />
        </td>
        <td>{item.country}</td>
    </>
}

const Locales = () => {
    return <List
        title="Locales"
        entityType='locale'
        listActions={listActions}
        headers={headers}
        row={row}
    />
}

export default Locales;
