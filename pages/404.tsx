import {withLayout} from "../layout/Layout";
import {Htag} from "../components";


export function Error404(): JSX.Element {

    return (
        <>
            <Htag tag='h1'>Ошибка 404</Htag>
        </>
    );
}

export default withLayout(Error404);
