import _Form from './Form'
import Field from './Field'
import useForm from './useForm'

// 可以使用 Form.xxx 的用法
const Form = _Form
Form.Field = Field
Form.useForm = useForm

export default {Form}