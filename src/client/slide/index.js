import React from "react";
import { UncontrolledCarousel } from "reactstrap";
import axios from 'axios'


const Example = () => {
    const [items, setItem] = React.useState([])

    React.useEffect(() => {
        axios({
            method: "get",
            url: "https://jsc2017605097.github.io/thucphamchucnang/data.json",
        }).then(res => {
            setItem(res.data.slide)
        })
    }, [])
    
    return <UncontrolledCarousel items={items} />
};

export default Example;
