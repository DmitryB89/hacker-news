

export type InitialStateType = {
    news_loading: boolean
    news_error: string | null
    news: NewsType[]
}

export type NewsTitleType = "job" | "story" | "comment" | "poll" | "pollopt"

export type NewsType = {
    id: number
    deleted: boolean
    type: NewsTitleType
    by: string
    time: string
    text: string
    dead: boolean
    parent: string
    poll: string
    kids: string
    url: string
    score: number
    title: string
    parts: string
    descendants: number
}

export type NewsResponseType = NewsType[]
