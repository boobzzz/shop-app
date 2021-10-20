import { FC } from "react";
import { connect } from "react-redux";
import { Card, Modal } from "antd";
import { EditOutlined, EllipsisOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import { AppDispatch } from "../store/store";
import { ActionTypes, AsyncActionType } from "../types/ActionTypes";
import { Product } from "../types/BaseItem";
import { fetchApi } from "../store/middleware";
import { PRODS_EP } from "../constants/endpoints";

const { Meta } = Card;
const { confirm } = Modal;

const CardItem: FC<CardItemDispatchProps & CardItemOwnProps> = ({ item, removeItem }) => {
    const removeProduct = () => {
        const options = {
            method: "DELETE",
        }

        removeItem(ActionTypes.REMOVE_PRODUCT, `${PRODS_EP}/${item.id}`, options, item.id!);
    }

    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure you want to delete this item?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {removeProduct()},
            onCancel() {},
        });
    }

    return (
        <Card
            cover={ <img alt="example" src={item.imageUrl} /> }
            actions={[
                <EllipsisOutlined key="ellipsis" />,
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" onClick={showDeleteConfirm} />,
            ]}
            hoverable
        >
            <Meta title={item.name} />
        </Card>
    );
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        removeItem: (type: AsyncActionType, url: string, options: {}, payload: string) =>
            dispatch(fetchApi(type, url, options, payload)
        ),
    }
}

export default connect(null, mapDispatchToProps)(CardItem);


interface CardItemDispatchProps {
    removeItem: (type: AsyncActionType, url: string, options: {}, payload: string) => Promise<void>;
}

interface CardItemOwnProps {
    item: Product;
}