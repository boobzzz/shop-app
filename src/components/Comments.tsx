import { ChangeEvent, FC, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { CommentItem } from "./CommentItem";
import { CommentEditor } from "./CommentEditor";
import { Comment, Product } from "../types/BaseItem";
import { ActionTypes, AsyncActionType } from "../types/ActionTypes";
import { AppDispatch, AppState } from "../store/store";
import { getIsLoading } from "../store/selectors";
import { fetchApi } from "../store/middleware";
import { BASE_EP } from "../constants/endpoints";
import { idGenerator } from "../utils/idGenerator";
import classes from "../styles/Comments.module.css";

const Comments: FC<CommentsStateToProps & CommentsDispatchToProps & CommentsOwnProps> =
({ isLoading, item, updateItem }) => {
    const [value, setValue] = useState<string>("");

    const { id, comments } = item;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }

    const updateProduct = (item: Product) => {
        const options = {
            method: "PUT",
            body: item,
        }

        updateItem(ActionTypes.UPDATE_PRODUCT, `${BASE_EP}/${id}`, options);
    }

    const addNewComment = () => {
        const itemCopy = JSON.parse(JSON.stringify(item));
        const initComment: Comment = {
            id: idGenerator(),
            productId: id,
            description: value,
            date: moment().format("HH:mm DD.MM.YYYY")
        };

        if (!itemCopy.comments) itemCopy.comments = [];

        itemCopy.comments.push(initComment);

        updateProduct(itemCopy);
    }

    const removeComment = (commentId: string) => {
        const itemCopy = JSON.parse(JSON.stringify(item));
        const newComments = (itemCopy as Product).comments!.filter(c => c.id !== commentId);

        itemCopy["comments"] = newComments;
        
        updateProduct(itemCopy);
    }

    return (
        <div className={classes.Container}>
            <h3>Comments:</h3>
            <ul>
                {comments?.map(c =>
                    <li key={c.id}>
                        <CommentItem comment={c} removeComment={removeComment} />
                    </li>
                )}
            </ul>
            <CommentEditor
                onChange={handleChange}
                onSubmit={addNewComment}
                submitting={isLoading}
                value={value}
            />
        </div>
    );
}

const mapStateToProps = (state: AppState) => {
    return {
        isLoading: getIsLoading(state),
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        updateItem: (type: AsyncActionType, url: string, options: {}) =>
            dispatch(fetchApi(type, url, options)
        ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);


interface CommentsStateToProps {
    isLoading: boolean;
}

interface CommentsDispatchToProps {
    updateItem: (type: AsyncActionType, url: string, options: {}) => Promise<void>;
}

interface CommentsOwnProps {
    item: Product;
}