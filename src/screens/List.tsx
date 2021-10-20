import { FC, useState } from "react";

import { Header } from "../components/Header";
import CardList from "../components/CardList";

export const List: FC = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    return (
        <>
            <Header toggleModal={setIsModalVisible} />
            <CardList isModalVisible={isModalVisible} toggleModal={setIsModalVisible} />
        </>
    );
}