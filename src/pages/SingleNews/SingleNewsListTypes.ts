import {NewsTitleType} from "../NewsList/NewsListTypes";

export type InitialStateType = {
    singleNews_loading: boolean
    singleNews_error: string | null
    singleNews: NewsType
}


export type NewsType = {
    by: string;
    descendants: number;
    id: number;
    score: number;
    time: number;
    title: string;
    type: NewsTitleType;
    url: string;
    kids: number[];
}