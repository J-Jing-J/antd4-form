// Form组件主要负责渲染子组件
// FormStore只要是为了Field组件，但是Field直接获取不合适，通过Form父级传下来最合适

import FieldContext from "./FieldContext";

// 通过Field自己获取没法保证更新顺序 33：57，晚安，加油
export default function Form({children, form, onFinish, onFinishFailed}) {
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