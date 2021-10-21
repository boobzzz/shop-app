import { FC } from "react";
import { connect } from "react-redux";
import { Comment, Tooltip, Avatar } from "antd";
import moment from "moment";

import { Comment as ItemComment, Product } from "../types/BaseItem";
import { ActionTypes, AsyncActionType } from "../types/ActionTypes";
import { AppDispatch } from "../store/store";
import { fetchApi } from "../store/middleware";
import { PRODS_EP } from "../constants/endpoints";
import classes from "../styles/Comments.module.css";

const Comments: FC<CommentsDispatchProps & CommentsOwnProps> = ({ item, updateItem }) => {
    const { id, comments } = item;
    const itemCopy = JSON.parse(JSON.stringify(item));
    const initComment: ItemComment = {
        id: "",
        productId: id,
        description: "",
        date: moment().format("HH:mm DD.MM.YYYY")
    };

    const removeComment = (commentId: string) => {
        const newComments = (itemCopy as Product).comments!.filter(c => c.id !== commentId);
        itemCopy["comments"] = newComments;
        
        const options = {
            method: "PUT",
            body: itemCopy,
        }

        updateItem(ActionTypes.UPDATE_PRODUCT, `${PRODS_EP}/${id}`, options);
    }

    return (
        <div className={classes.Container}>
            <h3>Comments:</h3>
            <ul>
                {comments?.map(c =>
                    <li key={c.id}>
                        <Comment
                            actions={[
                                <span
                                    key="del-comment"
                                    onClick={() => removeComment(c.id)}>
                                    Delete
                                </span>
                            ]}
                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                            author={<a>Han Solo</a>}
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                            content={c.description}
                            datetime={
                                <Tooltip title={moment().format("HH:mm DD.MM.YYYY")}>
                                    <span>{moment(c.date, "HH:mm DD.MM.YYYY").fromNow()}</span>
                                </Tooltip>
                            }
                            className={classes.Comment}
                        />
                    </li>
                )}
            </ul>
        </div>
    );
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        updateItem: (type: AsyncActionType, url: string, options: {}) =>
            dispatch(fetchApi(type, url, options)
        ),
    }
}

export default connect(null, mapDispatchToProps)(Comments);


interface CommentsDispatchProps {
    updateItem: (type: AsyncActionType, url: string, options: {}) => Promise<void>;
}

interface CommentsOwnProps {
    item: Product;
}