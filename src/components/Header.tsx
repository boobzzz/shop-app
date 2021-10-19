import { useState } from 'react';
import { Button, PageHeader } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import 'antd/dist/antd.css';

import { SortBy } from './SortBy';
import { NewItemForm } from './NewItemForm';
import classes from '../styles/Header.module.css';

export const Header: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOk = () => {
        setIsModalVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const handleAddBtn = () => {
        setIsModalVisible(true);
    }

    return (
        <>
            <PageHeader
                className={classes.Header}
                title="Products"
                subTitle="List of available products"
                extra={[
                    <SortBy />,
                    <Button
                        key="1"
                        icon={<PlusOutlined />}
                        onClick={handleAddBtn} />
                ]}
            />
            <Modal
                title="New Product"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <NewItemForm />
            </Modal>
        </>
    );
}