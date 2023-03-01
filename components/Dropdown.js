import DropDownPicker from 'react-native-dropdown-picker';
import { useEffect, useState } from "react";



export default function Dropdown({ _value, _items, getValue }) {


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(_value);
    const [items, setItems] = useState(_items ? _items : []);

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={value => getValue(value)}
        />
    )

}