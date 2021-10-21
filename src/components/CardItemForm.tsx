import { FC } from "react";
import { Button, Form, Input, InputNumber } from "antd";

import { Product } from "../types/BaseItem";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: "${label} is required!",
    types: {
        // eslint-disable-next-line no-template-curly-in-string
        number: "${label} is not a valid number!",
    },
    number: {
        // eslint-disable-next-line no-template-curly-in-string
        range: "${label} must be between ${min} and ${max}",
    },
};

export const CardItemForm: FC<ItemFormOwnProps> = (props) => {
    const { initValues, toggleModal, updateProduct } = props;
    
    const onAddBtn = (values: any) => {
        Object.keys(values).forEach(k => {
            (initValues as any)[k] = values[k];
        });

        toggleModal(false);
        updateProduct(initValues);
    };

    return (
        <Form
            {...layout}
            name="nest-messages"
            onFinish={onAddBtn}
            initialValues={initValues}
            validateMessages={validateMessages}>
            <Form.Item name={"imageUrl"} label="Image URL" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={"name"} label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={"weight"} label="Weight">
                <Input />
            </Form.Item>
            <Form.Item
                label="Size"
                style={{ marginBottom: "0" }}>
                <Form.Item
                    name={["size", "width"]}
                    style={{ display: "inline-block", width: "25%", marginRight: "24px" }}
                    rules={[{ type: "number", min: 0, max: 1000 }]}>
                    <InputNumber placeholder="width" />
                </Form.Item>
                <Form.Item
                    name={["size", "height"]}
                    style={{ display: "inline-block", width: "25%" }}
                    rules={[{ type: "number", min: 0, max: 1000 }]}>
                    <InputNumber placeholder="height" />
                </Form.Item>
            </Form.Item>
            <Form.Item
                name={"count"}
                label="Count"
                rules={[{ type: "number", min: 0, max: 99 }]}
                style={{ marginBottom: "32px" }}>
                <InputNumber />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
        </Form>
    );
}


interface ItemFormOwnProps {
    initValues: Product;
    toggleModal: (isVisible: boolean) => void;
    updateProduct: (values: Product) => void;
}