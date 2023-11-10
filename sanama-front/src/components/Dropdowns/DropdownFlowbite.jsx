
'use client'

import { Dropdown } from 'flowbite-react'

const DropdownFlowbite = ({ data, defaultText, text, defaultValue, value, name, width, handleChange }) => {
    return (
        <Dropdown
            id={name}
            onChange={handleChange}
            name={name} >
            {data.map((item, index) => (
                <Dropdown.Item
                    key={index}
                    value={item[value]}>
                    {item[text]}
                </Dropdown.Item>
            ))}
        </Dropdown>
    )
}

export default DropdownFlowbite