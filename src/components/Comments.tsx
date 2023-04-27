import React, {FC, memo, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../store/store";
import {useSelector} from "react-redux";
import {stat} from "fs";
import {fetchComments} from "../features/comments/comments_slice";

type CommentsPropsType = {
    kids:number[]
}

export const Comments: FC<CommentsPropsType> = memo(({ kids }) => {
    const dispatch=        useAppDispatch();
    const comments = useAppSelector(state => state.comments.comments);
    useEffect(() => {
        dispatch(fetchComments(kids));
    }, [dispatch, kids]);
    return (
        <ul>
            Comments
            {comments.map((comment) => {
                const {id, text} = comment
                return <li key={id}>{text}</li>;
            })}
        </ul>
    );
});