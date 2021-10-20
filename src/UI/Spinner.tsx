import { FC } from 'react';
import { Spin } from 'antd';

import classes from "../styles/Spinner.module.css";

export const Spinner: FC = () => {
    return (
        <div className={classes.Container}>
            <Spin size="large" />
        </div>
    );
}