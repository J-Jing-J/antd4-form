import _Form from './Form'
import Field from './Field'
import useForm from './useForm'
import { forwardRef } from 'react'

// 可以使用 Form.xxx 的用法
// forwardRef 可以让祖先组件用到子孙组件的值
// 函数组件没法直接接受ref，但是可以通过forwardRef
const Form = forwardRef(_Form)  
Form.Field = Field
Form.useForm = useForm

export default {Form}