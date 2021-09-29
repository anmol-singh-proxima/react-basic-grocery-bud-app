import React from 'react';
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";

function List({list, editItem, deleteItem}) {
    return (
        <section className="grocery-container">
            {list.map(item => {
                const {id, title} = item;
                return <article key={id} className="grocery-item">
                    <p className="title">{title}</p>
                    <div className="btn-container">
                        <button className="edit-btn" onClick={() => editItem(id)}>
                            <FiEdit />
                        </button>
                        <button className="delete-btn" onClick={() => deleteItem(id)}>
                            <FaTrashAlt />
                        </button>
                    </div>
                </article>
            })}
        </section>
    )
}

export default List;