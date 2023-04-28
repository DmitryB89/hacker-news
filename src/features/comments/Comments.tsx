import React, {FC, memo, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/providers/store/store";
import {fetchComments} from "./comments_slice";

type CommentsPropsType = {
    kids: number[]
}

export const Comments: FC<CommentsPropsType> = memo(({kids}) => {
    const dispatch = useAppDispatch();
    const comments = useAppSelector(state => state.comments.comments);


    const createMarkup = (html: string) => ({ __html: html });


    useEffect(() => {
        dispatch(fetchComments(kids));
    }, [dispatch, kids]);
    return (

        <>
            Comments
            {comments.map((comment) => {
                const {id, text} = comment
                return <div dangerouslySetInnerHTML={createMarkup(text)}/>
            })}
        </>
    );
});