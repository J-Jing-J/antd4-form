// Form组件主要负责渲染子组件
// FormStore只要是为了Field组件，但是Field直接获取不合适，通过Form父级传下来最合适

import React from "react";
import FieldContext from "./FieldContext";
import useForm from "./useForm";

// 通过Field自己获取没法保证更新顺序

// ref 是 forwardRef(_Form) 传下来的 ，可以让祖先组件用到子孙组件的值
export default function Form({children, form, onFinish, onFinishFailed}, ref) {
    // 函数组件上面一般会传form（也不一定会传），类租价不传form
    // 将 form 传进 useForm 做判断
    const [formInstance] = useForm(form)

    // 用 useImperativeHandle 把 ref的formInstance 传给祖先
    // 方便最外层组件加默认值
    React.useImperativeHandle(ref, () => formInstance)

    // 把finish函数存到store里
    // 最好是用这种方式挂载到store上，而不要用props传过去
    form.setCallbacks([onFinish, onFinishFailed])

    return (
        <form onSubmit={(e) => {
            // 取消默认事件 --- 提交自动刷新页面
            e.preventDefault()
            // 手动提交 --- store里的submit --- 因为store里同时有校验规则和状态值
            form.submit()
        }}>
            <FieldContext.Provider value={form}>
                {children}
            </FieldContext.Provider>
        </form>
    )
}