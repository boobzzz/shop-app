import { List, Card } from "antd";
import { EditOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import classes from "../styles/List.module.css";

const data = [
    {
        "id": 1,
        "imageUrl": "https://images.unsplash.com/photo-1597043851759-3b383a6d1c14?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
        "name": "Red wine",
        "count": 4,
        "size": {
            "width": 200,
            "height": 200
        },
        "weight": "1000g",
        "comments": ["CommentModel", "CommentModel"]
    },
    {
        "id": 2,
        "imageUrl": "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2073&q=80",
        "name": "Cheese",
        "count": 3,
        "size": {
        "width": 200,
        "height": 200
        },
        "weight": "1000g",
        "comments": ["CommentModel", "CommentModel"]
    },
    {
        "id": 3,
        "imageUrl": "https://images.unsplash.com/photo-1586765501019-cbe3973ef8fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2068&q=80",
        "name": "Bread",
        "count": 1,
        "size": {
            "width": 200,
            "height": 200
        },
        "weight": "1000g",
        "comments": ["CommentModel", "CommentModel"]
    },
    {
        "id": 4,
        "imageUrl": "https://images.unsplash.com/photo-1596793393770-82081fca1471?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
        "name": "Milk",
        "count": 1,
        "size": {
            "width": 200,
            "height": 200
        },
        "weight": "1000g",
        "comments": ["CommentModel", "CommentModel"]
    },
];

const { Meta } = Card;

export const CardList: React.FC = () => {

    return (
        <div className={classes.Container}>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Card
                            cover={
                                <img
                                    alt="example"
                                    src={item.imageUrl}
                                />
                            }
                            actions={[
                                <EllipsisOutlined key="ellipsis" />,
                                <EditOutlined key="edit" />,
                                <DeleteOutlined key="delete" />,
                            ]}
                            hoverable
                        >
                            <Meta title={item.name} />
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
}