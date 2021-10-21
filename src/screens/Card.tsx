import { FC } from "react";
import { useParams } from "react-router-dom";

import { Header } from "../components/Header";
import CardItem from "../components/CardItem";
import { RouteParams } from "../App";

export const Card: FC = () => {
    let { name } = useParams<RouteParams>();
    
    return (
        <>
            <Header title="Product info:" subtitle={name} />
            <CardItem />
        </>
    );
}