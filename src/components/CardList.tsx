import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { List, Modal } from "antd";
import "antd/dist/antd.css";

import CardItem from "./CardItem";
import { getError, getIsLoading, getProducts, getSorted } from "../store/selectors";
import { AppDispatch, AppState } from "../store/store";
import { fetchApi } from "../store/middleware";
import { ActionTypes, AsyncActionType } from "../types/ActionTypes";
import { Product } from "../types/BaseItem";
import { PRODS_EP } from "../constants/endpoints";
import classes from "../styles/CardList.module.css";
import { ItemForm } from "./ItemForm";

const CardList: FC<CardListStateProps & CardListDispatchProps & CardListOwnProps> = (props) => {
    const {
        isLoading,
        error,
        products,
        sortBy,
        isModalVisible,
        getAllProducts,
        toggleModal,
        addNewItem
    } = props;

    const handleCancel = () => {
        toggleModal(false);
    }

    const addNewProduct = (values: Product) => {
        const options = {
            method: "POST",
            body: values
        };

        addNewItem(ActionTypes.ADD_PRODUCT, PRODS_EP, options);
    }

    useEffect(() => {
        getAllProducts(ActionTypes.GET_PRODUCTS, PRODS_EP);
    }, [getAllProducts]);

    if (isLoading) return <div>...loading</div>;

    if (error) return <div>{error}</div>;

    const prodsAZCopy = JSON.parse(JSON.stringify(products));
    const prodsCountCopy = JSON.parse(JSON.stringify(products));
    const sortedByAZ = prodsAZCopy.sort((p1: Product, p2: Product) =>
        p1.name.toLowerCase().localeCompare(p2.name.toLowerCase())
    );
    const sortedByCount = prodsCountCopy.sort((p1: Product, p2: Product) =>
        p2.count - p1.count
    );

    return (
        <>
            <div className={classes.Container}>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                    }}
                    dataSource={sortBy === "az" ? sortedByAZ : sortedByCount}
                    renderItem={(item: Product) => (
                        <List.Item key={item.id}>
                            <CardItem item={item} />
                        </List.Item>
                    )}
                />
            </div>
            <Modal
                title="New Product"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <ItemForm
                    initValues={{
                        imageUrl: "",
                        name: "",
                    } as Product}
                    toggleModal={toggleModal}
                    updateProduct={addNewProduct} />
            </Modal>
        </>
    );
}

const mapStateToProps = (state: AppState) => {
    return {
        isLoading: getIsLoading(state),
        error: getError(state),
        products: getProducts(state),
        sortBy: getSorted(state),
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        getAllProducts: (type: AsyncActionType, url: string) => dispatch(fetchApi(type, url)),
        addNewItem: (type: AsyncActionType, url: string, options: {}) =>
            dispatch(fetchApi(type, url, options)
        ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);


interface CardListStateProps {
    isLoading: boolean;
    error: string;
    products: Product[];
    sortBy: string;
}

interface CardListDispatchProps {
    getAllProducts: (type: AsyncActionType, url: string) => Promise<void>;
    addNewItem: (type: AsyncActionType, url: string, options: {}) => Promise<void>;
}

interface CardListOwnProps {
    isModalVisible: boolean;
    toggleModal: (isVisible: boolean) => void;
}