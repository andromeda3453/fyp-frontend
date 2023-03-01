import React from "react";
import {

    Select,
    CheckIcon,
    FormControl,
    WarningOutlineIcon,

} from "native-base";


export default function ComboBox({ getValue, values, placeholder, selectProps }) {


    const valuesToRender = values ? values.map(value => <Select.Item key={value.id} label={value.name} value={value.id} />) : undefined


    return valuesToRender ? (

        <Select {...selectProps} placeholder={placeholder ? placeholder : "Select one..."}
            onValueChange={itemValue => getValue(itemValue)} defaultValue={values.length > 0 ? values[0].name : undefined}>
            {valuesToRender ? valuesToRender : undefinded}
        </Select>
    ) : undefined



}