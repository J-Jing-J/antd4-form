import { cloneElement } from "react"
import { Component } from "react"

export default class Field extends Component {
    getControlled = () => {
        return {
            // 用户输入时，value要变化 --- 使用状态值
            value: 'omg', // 
            onChange: (e) => {
                const newValue = e.target.value
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