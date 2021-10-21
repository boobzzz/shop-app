import { FC, useState } from "react";

import { Header } from "../components/Header";
import CardList from "../components/CardList";

export const List: FC = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    return (
        <>
            <Header
                title="Products"
                subtitle="List of available products"
                toggleModal={setIsModalVisible}
                isListView />
            <CardList isModalVisible={isModalVisible} toggleModal={setIsModalVisible} />
        </>
    );
}