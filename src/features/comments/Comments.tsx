import React, {FC, memo, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/providers/store/store";
import {fetchChildrenComments, fetchComments} from "./comments_slice";
import {CommentsType} from "./CommentsTypes";
import {createMarkup} from "../../shared/utils/createMarkup";

type CommentsPropsType = {
    kids: number[]
}
export const Comments: FC<CommentsPropsType> = memo(({kids}) => {
    const dispatch = useAppDispatch();
    const comments = useAppSelector(state => state.comments.comments);
    const childrenComments = useAppSelector(state => state.comments.childrenComments);
    const {descendants} = useAppSelector(state => state.singleNews.singleNews)

    const getComments = (kids: number[]) => {
        dispatch(fetchChildrenComments(kids))
    }
    useEffect(() => {
        dispatch(fetchComments(kids));
    }, [dispatch, kids]);
    return (
        <div>
            <b>Comments: </b> ({descendants})
            <ul>
                {comments.map(({text, id, kids}: CommentsType) => {
                    const count = kids ? kids.length : ''

                    return (
                        <li key={id}>
                            <div dangerouslySetInnerHTML={createMarkup(text)}/>
                            {/*<div>{count}</div>*/}
                            {count && <button onClick={() => getComments(kids)}>show more comments</button>}
                            {childrenComments && (
                                <ol>
                                    {childrenComments.map((comment: CommentsType) => {
                                        return (
                                            comment.parent === id &&
                                            <li key={comment.id}>
                                                <div dangerouslySetInnerHTML={createMarkup(text)}/>
                                            </li>
                                        )
                                    })}
                                </ol>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
})