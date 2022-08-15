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
        // 订阅：数组里存Field组件实例，拿到实例就能拿到onStoreChange，从而调用forceUpdate
        this.fieldEntities = []
        // 存Form组件传下来的 onFinish, onFinishFailed
        this.callbacks = []
    }

    setCallbacks = (callbacks) => {
        this.callbacks = [...this.callbacks, ...callbacks]
    }

    // 注册实例
    // 注册与取消注册/订阅与取消订阅，都要成对出现
    // Field订阅store，store变了 Field组件的状态值就在 setFieldValue 中更新
    registerFieldEntities = (entity) => {
        this.fieldEntities.push(entity)

        return () => {
            // 取消注册，闭包，保留了注册时的实例，找到那个实例从数组中删除就行了
            this.fieldEntities = this.fieldEntities.filter(item => item !== entity)
            // 状态从store中删除
            delete this.store(entity.props.name)
        }
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
    // newStore的格式是[{name: value}, {name: value}, ...]
    setFieldValue(newStore) {
        // 更新 store
        this.store = {
            ...this.store,
            ...newStore
        }
        // 更新 订阅的Field组件
        this.fieldEntities.forEach((entity) => {
            // 筛选出需要更新的组件
            Object.keys(newStore).forEach(k => {
                if(k === entity.props.name) {
                    entity.onStoreChange()
                }
            })
        })
    }

    // 校验表单项
    validate = () => {
        let err = []
        // 做校验
        this.fieldEntities.forEach(entity => {
            // 拿到Field组件上的 name 和 rules
            const {name, rules} = entity.props

            // 取出值和校验规则
            const value = this.getFieldValue(name)
            let rule = rules[0]

            if(rule && rule.required && (value === undefined || value === '')) {
                // 若校验失败，显示错误信息
                err.push({[name]: rules.message, value})
            }
        })
        // 返回错误信息
        return err
    }

    // 提交表单 store里面同时有校验规则和状态值
    submit = () => {
        let err = this.validate()
        const {onFinish, onFinishFailed} = this.callbacks
        if(err.lenght === 0) {
            // 校验通过, 返回状态值
            onFinish(this.getFieldsValue())
        } else {
            // 校验未通过
            onFinishFailed(err, this.getFieldsValue())
        }
    }

    // 暴露想暴露的方法
    getForm = () => {
        return {
            getFieldValue: this.getFieldValue,
            getFieldsValue: this.getFieldsValue,
            setFieldValue: this.setFieldValue,
            registerFieldEntities: this.registerFieldEntities,
            submit: this.submit,
            setCallbacks: this.setCallbacks
        }
    }
}

export default function useForm (form) {
    // 用FormStore： 在ref/中new(useRef) --- ref是将值存在hooks链表上，组件的生命周期内一直是同一个
    // 等于存在Fiber上了
    const formRef = useRef()
    // 组件更新时保证指向自己

    // 看外面有没有传进form
    if(!formRef.current) {
        if(form) {
            // 若外面传了，就使用传的form
            formRef.current = form
        } else {
            // 若外面没传，就新建Store
            const formStore = new FormStore()
            // 调用getForm只返回暴露出来的那部分
            formRef.current = formStore.getForm()
        }
    }
    
    return [formRef.current]
}