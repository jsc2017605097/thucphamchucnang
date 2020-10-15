import React from "react";
import { UncontrolledCarousel } from "reactstrap";
import {useSelector} from 'react-redux'


const Example = () => {
    const items = useSelector(state=>state.data.slide)
    React.useEffect(() => {
        window.document.title="Thực phẩm chức năng"
    }, [])
 
    return <UncontrolledCarousel items={items} />
};

export default Example;
