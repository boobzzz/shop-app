import { FC } from "react";
import { Select } from "antd";
import { connect } from "react-redux";
import { AppDispatch } from "../store/store";

import { sortBy } from "../store/actions";
import classes from "../styles/SortBy.module.css";

const { Option } = Select;

const SortBy: FC<CardListDispatchProps> = ({ sortBy }) => {
    const handleChange = (value: string) => {
        sortBy(value);
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

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        sortBy: (value: string) => dispatch(sortBy(value)),
    }
}

export default connect(null, mapDispatchToProps)(SortBy);


interface CardListDispatchProps {
    sortBy: (value: string) => void;
}