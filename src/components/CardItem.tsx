import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { PRODS_EP } from "../constants/endpoints";

import { Spinner } from "../UI/Spinner";
import { fetchApi } from "../store/middleware";
import { AppDispatch, AppState } from "../store/store";
import { RouteParams } from "../App";
import { getError, getIsLoading, getProduct } from "../store/selectors";
import { ActionTypes, AsyncActionType } from "../types/ActionTypes";
import { Product } from "../types/BaseItem";

const CardItem: FC<CardItemStateProps & CardItemDispatchProps> = (props) => {
    let { id } = useParams<RouteParams>();
    const { isLoading, error, product, getItem } = props;

    useEffect(() => {
        getItem(ActionTypes.GET_PRODUCT, `${PRODS_EP}?=${id}`)
    }, [getItem, id])

    if (isLoading) return <Spinner />

    if (error) return <div>{error}</div>;

    return (
        <div></div>
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