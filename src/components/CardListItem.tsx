import { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Modal } from "antd";
import { EditOutlined, EllipsisOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import { CardItemForm } from "./CardItemForm";
import { AppDispatch } from "../store/store";
import { fetchApi } from "../store/middleware";
import { ActionTypes, AsyncActionType } from "../types/ActionTypes";
import { Product } from "../types/BaseItem";
import { BASE_EP } from "../constants/endpoints";

const { Meta } = Card;
const { confirm } = Modal;

const CardListItem: FC<CardItemDispatchProps & CardItemOwnProps> = ({ item, updateItem, removeItem }) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const updateProduct = (values: Product) => {
        const options = {
            method: "PUT",
            body: values,
        }
        
        updateItem(ActionTypes.UPDATE_PRODUCT, `${BASE_EP}/${item.id}`, options);
    }

    const removeProduct = () => {
        const options = {
            method: "DELETE",
        }

        removeItem(ActionTypes.REMOVE_PRODUCT, `${BASE_EP}/${item.id}`, options, item.id!);
    }

    const showDeleteConfirm = () => {
        confirm({
            title: "Are you sure you want to delete this item?",
            icon: <ExclamationCircleOutlined />,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {removeProduct()},
            onCancel() {},
        });
    }

    let history = useHistory();

    const redirect = (id: string, name: string) => {
        history.push(`/products/${id}/${name}`);
    }

    return (
        <>
            <Card
                cover={<img alt="example" src={item.imageUrl} />}
                actions={[
                    <EllipsisOutlined key="ellipsis" onClick={() => redirect(item.id, item.name)} />,
                    <EditOutlined key="edit" onClick={() => setIsModalVisible(true)} />,
                    <DeleteOutlined key="delete" onClick={showDeleteConfirm} />,
                ]}
                hoverable
            >
                <Meta title={item.name} />
            </Card>
            <Modal
                title="Edit Product"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <CardItemForm
                    initValues={item}
                    toggleModal={setIsModalVisible}
                    updateProduct={updateProduct} />
            </Modal>
        </>
    );
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        updateItem: (type: AsyncActionType, url: string, options: {}) =>
            dispatch(fetchApi(type, url, options)
        ),
        removeItem: (type: AsyncActionType, url: string, options: {}, payload: string) =>
            dispatch(fetchApi(type, url, options, payload)
        ),
    }
}

export default connect(null, mapDispatchToProps)(CardListItem);


interface CardItemDispatchProps {
    updateItem: (type: AsyncActionType, url: string, options: {}) => Promise<void>;
    removeItem: (type: AsyncActionType, url: string, options: {}, payload: string) => Promise<void>;
}

interface CardItemOwnProps {
    item: Product;
}