import React, { useState } from "react";
import { Input, Button, message, Form, Steps } from "antd";
import { useHistory } from "react-router-dom";
import { loginPost } from "../api/api";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = (props) => {
  let history = useHistory();

  const onFinish = (values) => {
    let form = new FormData();
    form.append("username", values.username);
    form.append("password", values.password);
    loginPost(form).then((res) => {
      console.log(res);
      if (res.status == 200) {
        message.success("登录成功");
        localStorage.setItem("isLogin", true);
        setTimeout(() => {
          history.push("/");
        }, 300);
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="content">
      <Form
        {...layout}
        name="basic"
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
