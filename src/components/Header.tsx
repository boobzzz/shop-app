import { FC } from 'react';
import { useHistory } from "react-router-dom";
import { Button, PageHeader } from 'antd';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import SortBy from './SortBy';
import classes from '../styles/Header.module.css';

export const Header: FC<HeaderOwnProps> = ({ isListView, title, subtitle, toggleModal }) => {
    let history = useHistory();

    const goBack = () => history.goBack();

    return (
        <PageHeader
            backIcon={<LeftOutlined />}
            className={classes.Header}
            title={title}
            subTitle={subtitle}
            extra={
                isListView
                ? [
                    <SortBy />,
                    <Button
                        key="1"
                        icon={<PlusOutlined />}
                        onClick={() => toggleModal!(true)} />
                ]
                : <Button
                    key="1"
                    icon={<LeftOutlined />}
                    onClick={goBack} />
            }
        />
    );
}


interface HeaderOwnProps {
    isListView?: boolean;
    title: string;
    subtitle?: string;
    toggleModal?: (isVisible: boolean) => void;
}