import React, { Component, useEffect } from "react";
// import Form, { Field } from "rc-field-form";
import Form, { Field } from "../components/my-rc-field-form/";
import Input from "../components/Input";

const nameRules = { required: true, message: "请输入姓名！" };
const passworRules = { required: true, message: "请输入密码！" };

// *** 这个是核心，antd源码用的是rc-field-form，antd只是加了一些样式
export default function MyRCFieldForm(props) {
    const [form] = Form.useForm()

    // 表单校验失败执行
    onFinishFailed = (val) => { 
      console.log("onFinishFailed", val); //sy-log
    };

      return (
        <div>
          <h3>MyRCFieldForm</h3>
          <Form
            // 传递form这个store
            form={form}
            ref={this.formRef}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Field name="username" rules={[nameRules]}>
              <Input placeholder="Username" />
            </Field>
            <Field name="password" rules={[passworRules]}>
              <Input placeholder="Password" />
            </Field>
            <button>Submit</button>
          </Form>
        </div>
      );
  }



// 类组件
export default class MyRCFieldForm extends Component {
    // forwardRef传上来的
  formRef = React.createRef();
  componentDidMount() {
    console.log("form", this.formRef.current); //sy-log
    // 加默认值
    this.formRef.current.setFieldsValue({ username: "default" });
  }

  onFinish = (val) => {
    console.log("onFinish", val); //sy-log
  };

  // 表单校验失败执行
  onFinishFailed = (val) => { 
    console.log("onFinishFailed", val); //sy-log
  };
  render() {
    return (
      <div>
        <h3>MyRCFieldForm</h3>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Field name="username" rules={[nameRules]}>
            <Input placeholder="Username" />
          </Field>
          <Field name="password" rules={[passworRules]}>
            <Input placeholder="Password" />
          </Field>
          <button>Submit</button>
        </Form>
      </div>
    );
  }
}