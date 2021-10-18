import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import classes from "../styles/SortBy.module.css";

export const SortBy: React.FC = () => {
    const menu = (
        <Menu>
            <Menu.Item>
                <a href="/" onClick={e => e.preventDefault()}>
                    a-z
                </a>
            </Menu.Item>
            <Menu.Item>
                <a href="/" onClick={e => e.preventDefault()}>
                    count
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <Button className={classes.Container}>
                SORT BY
                <DownOutlined />
            </Button>
        </Dropdown>
    );
}