// 定义状态管理库 
// 使用的时候new一下
// 1. 不能在函数体里new，因为函数会多次发生更新，不能保留store
// 2. 不建议在全局new --- 全局污染、打包的时候谁在前谁在后（需要保证new的动作发生在执行之前）
// 3. 不建议用用闭包 --- 麻烦，成本高
// 4. 用： 在ref/中new(useRef) --- ref是将值存在hooks链表上，组件的生命周期内一直是同一个
import { useRef } from "react"

// 4. 用： 在ref/中new(useRef) --- ref是将值存在hooks链表上，组件的生命周期内一直是同一个
class FormStore {
    constructor() {
        // 用Field组件的name区分状态
        this.store = {}
    }
    // get
    getFieldsValue() {
        // 解构，安全，防止外面修改
        return {...this.store}
    }
    getFieldValue(name) {
        return this.store[name]
    }

    // set
    setFieldValue(newStore) {
        this.store = {
            ...this.store,
            ...newStore
        }
    }

    // 暴露想暴露的方法
    getForm = () => {
        return {
            getFieldValue: this.getFieldValue,
            getFieldsValue: this.getFieldsValue,
            setFieldValue: this.setFieldValue,
        }
    }
}

export default function useForm () {
    // 用FormStore： 在ref/中new(useRef) --- ref是将值存在hooks链表上，组件的生命周期内一直是同一个
    // 等于存在Fiber上了
    const formRef = useRef()
    // 组件更新时保证指向自己
    if(!formRef.current) {
        const formStore = new FormStore()
        // 调用getForm只返回暴露出来的那部分
        formRef.current = formStore.getForm()
    }
    
    return []
}