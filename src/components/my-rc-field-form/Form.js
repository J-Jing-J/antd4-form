// Form组件只要负责渲染子组件
export default function Form({children}) {
    return (
        <form>{children}</form>
    )
}