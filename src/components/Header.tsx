import { Button, PageHeader } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import classes from '../styles/Header.module.css';
import { SortBy } from './SortBy';

export const Header: React.FC = () => {
    return (
        <PageHeader
            className={classes.Header}
            title="Products"
            subTitle="List of available products"
            extra={[
                <SortBy />,
                <Button key="1" icon={<PlusOutlined />} />
            ]}
        />
    );
}