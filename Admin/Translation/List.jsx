import { List, Text as FilterText, EntityAction, ListAction, app } from '@List'
import { DialogForm, Text, Lookup } from '@Form';

const inputs = <>
    <Text
        column='TextKey'
        placeholder='Text Key'
        required='Please provide text key'
        regex='[a-zA-Z]+'
    />
    <Lookup
        column='LocaleId'
        entityType='locale'
        placeholder='Locale'
        required='Please select the locale'
        show={(item) => item.localKey}
    />
    <Text
        column='Value'
        placeholder='Translation'
        required='Please translate your text'
    />
</>

const CreateTranslation = () => {
    return <DialogForm
        entityType='translation'
        inputs={inputs}
    />
}

const filters = <>
    <FilterText
        column='TextKey'
        placeholder='Text'
    />
    {/* <FilterSelect
        column='LocaleId'
    /> */}
</>

const headers = <>
    <th>Locale</th>
    <th>Text Key</th>
    <th>Translation</th>
</>

const row = (item) => {
    return <>
        <td>{item.locale}</td>
        <td>{item.textKey}</td>
        <td>{item.value}</td>
    </>
}

const Translations = () => {
    return <List
        title='Translations'
        entityType='translation'
        filters={filters}
        headers={headers}
        row={row}
        create={CreateTranslation}
        hasDelete={true}
    />
}

export default Translations;