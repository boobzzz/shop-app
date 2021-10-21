import { ChangeEvent, FC } from "react";
import { Avatar, Button, Comment, Form, Input  } from "antd";

const { TextArea } = Input;

export const CommentEditor: FC<CommentEditorOwnProps> = (props) => {
    const { onChange, onSubmit, submitting, value } = props;

    return (
        <Comment
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={
                <>
                    <Form.Item>
                        <TextArea
                            rows={4}
                            onChange={(e) => onChange(e)}
                            value={value}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            loading={submitting}
                            onClick={onSubmit}
                            type="primary"
                        >
                            Add Comment
                        </Button>
                    </Form.Item>
                </>
            }
        />
    );
}


interface CommentEditorOwnProps {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    submitting: boolean;
    value: string;
}