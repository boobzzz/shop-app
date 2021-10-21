import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Descriptions, Image } from "antd";

import Comments from "./Comments";
import { Spinner } from "../UI/Spinner";
import { fetchApi } from "../store/middleware";
import { AppDispatch, AppState } from "../store/store";
import { RouteParams } from "../App";
import { getError, getIsLoading, getProduct } from "../store/selectors";
import { ActionTypes, AsyncActionType } from "../types/ActionTypes";
import { Product } from "../types/BaseItem";
import { BASE_EP } from "../constants/endpoints";
import classes from "../styles/CardItem.module.css";

const CardItem: FC<CardItemStateProps & CardItemDispatchProps> = (props) => {
    let { id } = useParams<RouteParams>();
    const { isLoading, error, product, getItem } = props;

    useEffect(() => {
        getItem(ActionTypes.GET_PRODUCT, `${BASE_EP}?id=${id}`)
    }, [getItem, id])

    if (isLoading) return <Spinner />

    if (error) return <div>{error}</div>;

    return (
        <div className={classes.Container}>
            <div className={classes.Details}>
                <div className={classes.Desc}>
                    <div>
                        <h3>Details</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, velit omnis soluta veniam placeat consequuntur iure harum! Accusantium, nam quos dignissimos sapiente assumenda fugit quo omnis cumque, a officia eveniet? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, velit omnis soluta veniam placeat consequuntur iure harum! Accusantium, nam quos dignissimos sapiente assumenda fugit quo omnis cumque, a officia eveniet? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, velit omnis soluta veniam placeat consequuntur iure harum! Accusantium, nam quos dignissimos sapiente assumenda fugit quo omnis cumque, a officia eveniet?</p>
                    </div>
                    <Descriptions
                        layout="vertical"
                        bordered
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        size="small"
                    >
                        <Descriptions.Item label="ID">{product.id}</Descriptions.Item>
                        <Descriptions.Item label="Name">{product.name}</Descriptions.Item>
                        <Descriptions.Item label="Amount">{product.count}</Descriptions.Item>
                        <Descriptions.Item label="Size">
                            width: {product.size?.width}
                            <br />
                            height: {product.size?.height}
                        </Descriptions.Item>
                        <Descriptions.Item label="Weight">{product.weight}</Descriptions.Item>
                    </Descriptions>
                </div>
                <Image src={product.imageUrl} width={325} height={425} />
            </div>
            <Comments item={product} />
        </div>
    );
}

const mapStateToProps = (state: AppState) => {
    return {
        isLoading: getIsLoading(state),
        error: getError(state),
        product: getProduct(state),
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        getItem: (type: AsyncActionType, url: string) => dispatch(fetchApi(type, url)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardItem);


interface CardItemStateProps {
    isLoading: boolean;
    error: string;
    product: Product;
}

interface CardItemDispatchProps {
    getItem: (type: AsyncActionType, url: string) => Promise<void>;
}