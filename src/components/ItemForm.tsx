import { FC } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, InputNumber } from "antd";

import { fetchApi } from "../store/middleware";
import { AppDispatch } from "../store/store";
import { ActionTypes, AsyncActionType } from "../types/ActionTypes";

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

export const ItemForm: FC<ItemFormDispatchProps & ItemFormOwnProps> = (props) => {
    const { addNewProduct, showModal } = props;

    const initProd: any = {
        imageUrl: "",
        name: "",
        count: 0
    }

    const onAddBtn = async (values: any) => {
        const { prod } = values;
        
        Object.keys(prod).forEach(k => {
            initProd[k] = prod[k];
        });

        const options = {
            method: "POST",
            body: initProd
        };

        showModal(false);
        addNewProduct(ActionTypes.ADD_PRODUCT, "http://localhost:8000/products", options);
    };

    return (
        <Form
            {...layout}
            name="nest-messages"
            onFinish={onAddBtn}
            validateMessages={validateMessages}>
            <Form.Item name={["prod", "imageUrl"]} label="Image URL" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={["prod", "name"]} label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={["prod", "weight"]} label="Weight">
                <Input />
            </Form.Item>
            <Form.Item
                label="Size"
                style={{ marginBottom: "0" }}>
                <Form.Item
                    name={["prod", "size", "width"]}
                    style={{ display: "inline-block", width: "25%", marginRight: "24px" }}
                    rules={[{ type: "number", min: 0, max: 1000 }]}>
                    <InputNumber placeholder="width" />
                </Form.Item>
                <Form.Item
                    name={["prod", "size", "height"]}
                    style={{ display: "inline-block", width: "25%" }}
                    rules={[{ type: "number", min: 0, max: 1000 }]}>
                    <InputNumber placeholder="height" />
                </Form.Item>
            </Form.Item>
            <Form.Item
                name={["prod", "count"]}
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

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        addNewProduct: (type: AsyncActionType, url: string, options: {}) =>
            dispatch(fetchApi(type, url, options)
        ),
    }
}

export default connect(null, mapDispatchToProps)(ItemForm);


interface ItemFormDispatchProps {
    addNewProduct: (type: AsyncActionType, url: string, options: {}) => Promise<void>;
}

interface ItemFormOwnProps {
    showModal: (isVisible: boolean) => void;
}