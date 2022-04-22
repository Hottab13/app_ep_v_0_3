export const requiredField = value => value ? undefined : 'Это поле обязательное'
export const maxLengthCreator = maxLenght => (value) =>
    value.length > maxLenght ? 
    `Максимальное количество символов ${maxLenght}!` :
    undefined
export const match = matchName => (value, allValues, props) =>
    value !== allValues[matchName] ?
    `Пароли не совпадают` :
    undefined;
export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Неверный адрес электронной почты' : undefined
export const number = value => value && isNaN(Number(value)) ? 'Должно быть число' : undefined