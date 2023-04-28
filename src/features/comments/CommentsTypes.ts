export type InitialStateType = {
  comments_loading: boolean
  comments_error: string | null
  comments: CommentsType[]
  childrenComments: CommentsType[]
}

export type CommentsType = {
  by: string
  id: number
  parent: number
  time: number
  text: string
  type: string
  kids: number[]
}
