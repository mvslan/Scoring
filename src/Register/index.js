import React, { useState } from "react";
import { Input, Button, message, Form, Steps } from "antd";
import { useHistory } from "react-router-dom";
import { registerPost } from "../api/api";
import "./index.scss";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Register = (props) => {
  let history = useHistory();

  const onFinish = (values) => {
    let form = new FormData();
    form.append("username", values.username);
    form.append("password", values.password);
    registerPost(form).then((res) => {
      console.log(res);
      if (res.status == 200) {
        message.success("注册成功");
        setTimeout(() => {
          history.push("/login");
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
        initialValues={{ remember: true }}
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
            注册用户
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
