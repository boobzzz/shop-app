import { Select } from 'antd';

import classes from "../styles/SortBy.module.css";

const { Option } = Select;

export const SortBy: React.FC = () => {
    const handleChange = () => {

    }

    return (
        <div className={classes.Container}>
            <span>Sort by:</span>
            <Select
                className={classes.Select}
                onChange={handleChange}
                defaultValue="az"
                showSearch={false}>
                <Option value="az">a-z</Option>
                <Option value="count">count</Option>
            </Select>
        </div>
    );
}