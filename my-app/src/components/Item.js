import React, { useState } from 'react';

const Item = (props) => {
    const { name } = props.data;
    const [newName, setNewName] = useState(name);

    // const editState = () => {
    //     return (
    //         <form>
    //             <input type="text" value={name} name="name"/>
    //             <input type="text" value={workTime.descr} name="workTime"/>
    //         </form>
    //     );
    // }

    return (
        <div>
            <input type="text" onChange={(e) => setNewName(e.target.value)} value={newName}/>
        </div>
    );
}

export default Item;