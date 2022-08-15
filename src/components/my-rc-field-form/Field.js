import { cloneElement } from "react"
import { Component } from "react"
import FieldContext from "./FieldContext"

export default class Field extends Component {
    // 消费Context有三种方式：
    // 1. useContext --- pass这是类组件
    // 2. Context.Consumer --- 麻烦，要写成函数形式
    // 3. ContextType --- 只能用在类组件，只能订阅单一context来源，但是使用简单
    static contextType = FieldContext;

    componentDidMount() {
        // 执行订阅函数，传入当前实例
        // 注册函数中return了取消注册方法，保存一下
        this.unregister = this.context.registerFieldEntities(this)
    }

    // 取消注册
    componentWillUnmount() {
        this.unregister()
    }

    // Field订阅store，store变了 Field组件的状态值就更新
    // 订阅：formStore里存Field组件实例，拿到实例就能拿到onStoreChange，从而调用forceUpdate
    onStoreChange = () => {
        this.forceUpdate()
    }

    // 给输入框添加value、onChange，使变成受控组件
    getControlled = () => {
        const {getFieldValue, setFieldValue} = this.context
        const {name} = this.props
        
        return {
            // 用户输入时，value要变化 --- 使用状态值
            value: getFieldValue(name),
            onChange: (e) => {
                const newValue = e.target.value
                setFieldValue({[newValue]: newValue})
            }
        }
    }

    render() {
        const {children} = this.props
        // 使Children变成受控组件 --- 加value、onChange属性
        const returnChildNode = cloneElement(children, this.getControlled())
        return children
    }
}