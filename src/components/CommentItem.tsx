import { FC } from "react";
import { Comment, Tooltip, Avatar } from "antd";
import moment from "moment";

import { Comment as ItemComment } from "../types/BaseItem";
import classes from "../styles/Comments.module.css";

export const CommentItem: FC<CommentItemOwnProps> = ({ comment, removeComment }) => {
    const { id, description, date } = comment;

    return (
        <Comment
            actions={[
                <span
                    key="del-comment"
                    onClick={() => removeComment(id)}>
                    Delete
                </span>
            ]}
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            author={<a>Han Solo</a>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={description}
            datetime={
                <Tooltip title={moment().format("HH:mm DD.MM.YYYY")}>
                    <span>{moment(date, "HH:mm DD.MM.YYYY").fromNow()}</span>
                </Tooltip>
            }
            className={classes.Comment}
        />
    );
}


interface CommentItemOwnProps {
    comment: ItemComment;
    removeComment: (id: string) => void;
}