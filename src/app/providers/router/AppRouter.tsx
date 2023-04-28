import {Route, Routes} from "react-router";
import {Path} from "../../../shared/constants/paths";
import {NewsList} from "../../../pages/NewsList/NewsList";
import {SingleNews} from "../../../pages/SingleNews/SingleNews";
import {PageNotFound} from "../../../pages/PageNotFound/PageNotFound";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path={Path.HOME} element={<NewsList />} />
            <Route path={Path.NEWS} element={<SingleNews />} />
            <Route path={Path.PAGE_NOT_FOUND} element={<PageNotFound />} />
        </Routes>
    )
}