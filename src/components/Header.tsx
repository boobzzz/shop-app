import { FC } from 'react';
import { Button, PageHeader } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import SortBy from './SortBy';
import classes from '../styles/Header.module.css';

export const Header: FC<HeaderOwnProps> = ({ toggleModal }) => (
    <PageHeader
        className={classes.Header}
        title="Products"
        subTitle="List of available products"
        extra={[
            <SortBy />,
            <Button
                key="1"
                icon={<PlusOutlined />}
                onClick={() => toggleModal(true)} />
        ]}
    />
)


interface HeaderOwnProps {
    toggleModal: (isVisible: boolean) => void;
}