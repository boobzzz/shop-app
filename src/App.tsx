import { FC, useState } from "react";
import { Modal } from "antd";

import { Header } from "./components/Header";
import CardList from "./components/CardList";
import ItemForm from "./components/ItemForm";

const App: FC = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    return (
        <>
            <Header showModal={setIsModalVisible} />
            <CardList />
            <Modal
                title="New Product"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <ItemForm showModal={setIsModalVisible} />
            </Modal>
        </>
    );
}

export default App;