import { FC } from 'react';
import { Button, PageHeader } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import SortBy from './SortBy';
import classes from '../styles/Header.module.css';

export const Header: FC<HeaderOwnProps> = ({ title, subtitle, toggleModal }) => (
    <PageHeader
        className={classes.Header}
        title={title}
        subTitle={subtitle}
        extra={
            title === "Products"
            ? [
                <SortBy />,
                <Button
                    key="1"
                    icon={<PlusOutlined />}
                    onClick={() => toggleModal!(true)} />
            ]
            : null
        }
    />
)


interface HeaderOwnProps {
    title: string;
    subtitle?: string;
    toggleModal?: (isVisible: boolean) => void;
}