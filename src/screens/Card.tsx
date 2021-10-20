import { FC } from "react";
import { useParams } from "react-router-dom";

import { Header } from "../components/Header";
import CardItem from "../components/CardItem";
import { RouteParams } from "../App";

export const Card: FC = () => {
    let { id, name } = useParams<RouteParams>();
    console.log(id, name);
    
    return (
        <>
            <Header title="Product:" subtitle={name} />
            <CardItem />
        </>
    );
}