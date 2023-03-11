
import { TextInput } from 'react-native-paper';


export default function TextBox({ label, onChange, props, textValue }) {
    return (
        <TextInput
            label={label ? label : "Input"}
            minWidth="60%"
            mode="outlined"
            outlineColor="teal"
            activeOutlineColor="teal"
            {...props}
            value={textValue}
        // onChangeText={text => setText(text)}
        />
    )

}