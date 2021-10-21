import { FC } from "react";
import { Select } from "antd";
import { connect } from "react-redux";
import { AppDispatch } from "../store/store";

import { sortBy } from "../store/actions";
import classes from "../styles/SortBy.module.css";

export enum SortOptions {
    AZ_ASC = "?_sort=name&_order=asc",
    AZ_DESC = "?_sort=name&_order=desc",
    COUNT_ASC = "?_sort=count&_order=asc",
    COUNT_DESC = "?_sort=count&_order=desc",
}

const { Option } = Select;

const SortBy: FC<CardListDispatchProps> = ({ sortBy }) => {
    const handleChange = (value: SortOptions) => {
        sortBy(value);
    }

    return (
        <div className={classes.Container}>
            <span>sort by:</span>
            <Select
                className={classes.Select}
                onChange={handleChange}
                defaultValue={SortOptions.AZ_ASC}
                showSearch={false}>
                <Option value={SortOptions.AZ_ASC}>a-z</Option>
                <Option value={SortOptions.AZ_DESC}>z-a</Option>
                <Option value={SortOptions.COUNT_ASC}>count asc</Option>
                <Option value={SortOptions.COUNT_DESC}>count desc</Option>
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