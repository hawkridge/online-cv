import React from 'react'
import { useTranslation } from 'react-i18next'

const LangSwitcher = () => {
    const { i18n } = useTranslation();

    const handleChange = ev => {
        i18n.changeLanguage(ev.target.value)
    }

    return (
        <div>
            <select onChange={ handleChange }>
                <option value="en" defaultValue >eng</option>
                <option value="ru">рус</option>
            </select>
        </div>
    );
};

export default LangSwitcher;