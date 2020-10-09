import React from "react";
import StableList from "react-stablelist";

/*
    your component must accept a "className" prop which will be used by
    StableList for index-specific operations
*/
const SpecialComponent = ({ className, componentID }) => {
    return <div className="special-item" id={componentID}>...</div>
}

export default function List(){
    /**
      * @param {string} key a unique string that can be used as a component's "key" prop
      * @param {number} index the index of the element to be rendered relative to the dataset
      * @param {boolean} isFresh determines whether the component has just recently been rendered
      * @param {boolean} isFirstRender determines whether it is the component's first time being rendered
      * @param {any} propData the information that will be passed to the component as its props
     */
    const propProvider = (key, index, isFresh, isFirstRender, propData) => {
        return {
            key,
            content:propData.name
        }
    };

    const listData = [{
        name:"Danhmuc 1"
    }];

    return (
        <StableList
            data={listData}
            dataKey={Math.random()}
            itemCount={listData.length}
            maxItems={60}
            threshold={20}
            component={SpecialComponent}
            propProvider={propProvider}
        />
    );
}
