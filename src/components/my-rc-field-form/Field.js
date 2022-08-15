import { cloneElement } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { Component } from "react"
import FieldContext from "./FieldContext"

// AntD4 的 FormItem 就是封装的 Field

// export default class Field extends Component {
//     // 消费Context有三种方式：
//     // 1. useContext --- pass这是类组件
//     // 2. Context.Consumer --- 麻烦，要写成函数形式
//     // 3. ContextType --- 只能用在类组件，只能订阅单一context来源，但是使用简单
//     static contextType = FieldContext;

//     componentDidMount() {
//         // 执行订阅函数，传入当前实例
//         // 注册函数中return了取消注册方法，保存一下
//         this.unregister = this.context.registerFieldEntities(this)
//     }

//     // 取消注册
//     componentWillUnmount() {
//         this.unregister()
//     }

//     // Field订阅store，store变了 Field组件的状态值就更新
//     // 订阅：formStore里存Field组件实例，拿到实例就能拿到onStoreChange，从而调用forceUpdate
//     onStoreChange = () => {
//         this.forceUpdate()
//     }

//     // 给输入框添加value、onChange，使变成受控组件
//     getControlled = () => {
//         const {getFieldValue, setFieldValue} = this.context
//         const {name} = this.props
        
//         return {
//             // 用户输入时，value要变化 --- 使用状态值
//             value: getFieldValue(name),
//             onChange: (e) => {
//                 const newValue = e.target.value
//                 setFieldValue({[newValue]: newValue})
//             }
//         }
//     }

//     render() {
//         const {children} = this.props
//         // 使Children变成受控组件 --- 加value、onChange属性
//         const returnChildNode = cloneElement(children, this.getControlled())
//         return children
//     }
// }

export default function Field(props) {

    const {children} = props
    const {getFieldValue, setFieldValue, registerFieldEntities} = useContext(FieldContext)
    
    // 模拟forceUpdate，函数组件的更新的本质是 修改状态值，若不改状态值，源码中也会紧掉更新
    const [,forceUpdate] = React.useReducer((x) => x + 1, 0)

    // 在useEffect中订阅太晚了，是延迟执行， 初始值没有被订阅，所以初始值部分不能forceUpdate
    // --- 用useLayoutEffect
    useLayoutEffect(() => {

        // 订阅
        // {props, onStoreChange: forceUpdate} 是模拟 当前函数组件本身，对应类组件的this
        const unregister = registerFieldEntities({props, onStoreChange: forceUpdate})

        // 取消订阅
        return unregister
    }, [])

    // 给输入框添加value、onChange，使变成受控组件
    const getControlled = () => {
        const {name} = props
        
        return {
            // 用户输入时，value要变化 --- 使用状态值
            value: getFieldValue(name),
            onChange: (e) => {
                const newValue = e.target.value
                setFieldValue({[newValue]: newValue})
            }
        }
    }

    const returnChildNode = cloneElement(children, getControlled())
    return returnChildNode
}
