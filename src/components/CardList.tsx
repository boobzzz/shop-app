import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { EditOutlined, EllipsisOutlined, DeleteOutlined } from "@ant-design/icons";
import { List, Card } from "antd";
import "antd/dist/antd.css";

import { getError, getIsLoading, getProducts, getSorted } from "../store/selectors";
import { AppDispatch, AppState } from "../store/store";
import { fetchProducts } from "../store/middlewares";
import { Product } from "../types/types";
import classes from "../styles/CardList.module.css";

const { Meta } = Card;

const CardList: FC<CardListStateProps & CardListDispatchProps> = (props) => {
    const { isLoading, error, products, sortBy, getAllProducts } = props;

    useEffect(() => {
        getAllProducts("http://localhost:8000/products");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        sortBy: getSorted(state),
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
    sortBy: string;
}

interface CardListDispatchProps {
    getAllProducts: (url: string) => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CardListOwnProps {
    ownprop: any;
}