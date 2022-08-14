import React, { useEffect, Component } from "react";
import { Form, Button, Input } from "antd";

const FormItem = Form.Item;

const nameRules = { required: true, message: "请输入姓名！" };
const passworRules = { required: true, message: "请输入密码！" };

export default class AntdFormPage extends Component {
  formRef = React.createRef();

  componentDidMount() {
    this.formRef.current.setFieldsValue({ username: "defalut" });
  }
  onFinish = (val) => {
    console.log("onFinish", val); //sy-log
  };
  onFinishFailed = (val) => {
    console.log("onFinishFailed", val); //sy-log
  };
  render() {
    return (
      <div>
        <h3>AntdFormPage</h3>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <FormItem name="username" label="姓名" rules={[nameRules]}>
            {/* 输入内容，value是状态值（受控组件）但不能是私有状态值，因为私有的话，点击Submit就拿不到value了 */}
            {/* Antd3 的状态值是放在外层Form中 --- 本身Form组件没有状态，每次返回新的组件加上状态值 --- HOC */}
            {/* Antd3 -- 缺点：一个input更新会导致整个表单重新渲染 --- 当表单非常庞大时，输入数据会很卡 */}
            {/* Antd4 的状态值放到第三方管理库，通过订阅来更新 */}
            <Input placeholder="username placeholder" />
          </FormItem>
          <FormItem name="password" label="密码" rules={[passworRules]}>
            <Input placeholder="password placeholder" />
          </FormItem>
          <FormItem>
            <Button type="primary" size="large" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

// Antd 3 Form HOC
// todo antd4 form store (state、)

// export default function AntdFormPage(props) {
//   const [form] = Form.useForm();
//   const onFinish = (val) => {
//     console.log("onFinish", val); //sy-log
//   };
//   const onFinishFailed = (val) => {
//     console.log("onFinishFailed", val); //sy-log
//   };

//   useEffect(() => {
//     form.setFieldsValue({username: "defalut"});
//     console.log("form", form); //sy-log
//   }, []);

//   return (
//     <div>
//       <h3>AntdFormPage</h3>
//       <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
//         <FormItem name="username" label="姓名" rules={[nameRules]}>
//           <Input placeholder="username placeholder" />
//         </FormItem>
//         <FormItem name="password" label="密码" rules={[passworRules]}>
//           <Input placeholder="password placeholder" />
//         </FormItem>
//         <FormItem>
//           <Button type="primary" size="large" htmlType="submit">
//             Submit
//           </Button>
//         </FormItem>
//       </Form>
//     </div>
//   );
// }