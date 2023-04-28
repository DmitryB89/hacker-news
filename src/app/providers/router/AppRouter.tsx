import { Route, Routes } from 'react-router'

import { NewsList } from '../../../pages/NewsList/NewsList'
import { PageNotFound } from '../../../pages/PageNotFound/PageNotFound'
import { SingleNews } from '../../../pages/SingleNews/SingleNews'
import { Path } from '../../../shared/constants/paths'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={Path.HOME} element={<NewsList />} />
      <Route path={Path.NEWS} element={<SingleNews />} />
      <Route path={Path.PAGE_NOT_FOUND} element={<PageNotFound />} />
    </Routes>
  )
}
