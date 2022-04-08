import {
    Field
} from "redux-form";

export const createFieldSelect = (
    placeholder,
    name,
    label,
    validate,
    component,
    options
) => {
    return ( <
        Field placeholder = {
            placeholder
        }
        name = {
            name
        }
        label = {
            label
        }
        validate = {
            validate
        }
        component = {
            component
        }
        options = {
            options
        }
        onBlur = {
            e => {
                e.preventDefault();
            }
        }
        /> 
    );
}

export const createField = (
    placeholder,
    name,
    label,
    validate,
    component,
    props = {},
    text = "",
) => {
    return ( <
        Field placeholder = {
            placeholder
        }
        name = {
            name
        }
        label = {
            label
        }
        validate = {
            validate
        }
        component = {
            component
        } {
            ...props
        }
        /> 
);
}