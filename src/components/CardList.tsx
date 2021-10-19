import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { EditOutlined, EllipsisOutlined, DeleteOutlined } from "@ant-design/icons";
import { List, Card } from "antd";
import "antd/dist/antd.css";

import { getError, getIsLoading, getProducts } from "../store/selectors";
import { AppDispatch, AppState } from "../store/store";
import { fetchProducts } from "../store/middlewares";
import { Product } from "../types/types";
import classes from "../styles/CardList.module.css";

const { Meta } = Card;

const CardList: FC<CardListStateProps & CardListDispatchProps> = (props) => {
    const { isLoading, error, products, getAllProducts } = props;

    useEffect(() => {
        getAllProducts("http://localhost:8000/products");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) return <div>...loading</div>;

    if (error) return <div>{error}</div>;

    return (
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
                dataSource={products}
                renderItem={item => (
                    <List.Item key={item.id}>
                        <Card
                            cover={
                                <img
                                    alt="example"
                                    src={item.imageUrl}
                                />
                            }
                            actions={[
                                <EllipsisOutlined key="ellipsis" />,
                                <EditOutlined key="edit" />,
                                <DeleteOutlined key="delete" />,
                            ]}
                            hoverable
                        >
                            <Meta title={item.name} />
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
}

const mapStateToProps = (state: AppState) => {
    return {
        isLoading: getIsLoading(state),
        error: getError(state),
        products: getProducts(state),
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        getAllProducts: (url: string) => dispatch(fetchProducts(url)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);


interface CardListStateProps {
    isLoading: boolean;
    error: string;
    products: Product[];
}

interface CardListDispatchProps {
    getAllProducts: (url: string) => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CardListOwnProps {
    ownprop: any;
}