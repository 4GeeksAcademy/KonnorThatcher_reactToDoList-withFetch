import React, {useState, useEffect} from 'react'

const ToDoList = () => {
    const [listItems, setListItems] = useState([]);
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {getList()}, [])
    useEffect(() => {console.log(listItems)}, [listItems])

    const url = 'https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/KonnorThatcher'

    const getList = () => {
        fetch(url, {
            method: 'GET'
        })
        .then((result) => result.json())
        .then((item) => {setListItems(item)})
    }

    const putList = (arr) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(arr),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) getList()
        })
    }

    const addItem = (event) => {
        if (event.key === 'Enter' && inputValue.length > 0) {
            let newObj = {label: inputValue, done: false}
            putList([...listItems, newObj])
            setInputValue('')
        }
    }

    const deleteItem = (idx) => {
        let smallerArr = listItems.toSpliced(idx, 1);
        putList(smallerArr);
    }

    return (
        <div className='accordion w-75 m-auto'>
            <div className='accordion-item p-1'>
                <input className='w-75' type='text' onChange={e => setInputValue(e.target.value)} onKeyDown={addItem} value={inputValue}/>
            </div>
            {listItems.filter(item => item.done === false).map((item, idx) => {
                return (
                    <div key={idx} className='accordion-item p-1 d-flex justify-content-between align-items-center px-2 py-1'>
                        <strong>{item.label}</strong>
                        <div>
                            <button className='btn btn-danger' onClick={() => deleteItem(idx + 1)}>
                                <i className="fa-regular fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                )
            })} 
        </div>
    )
}

export default ToDoList