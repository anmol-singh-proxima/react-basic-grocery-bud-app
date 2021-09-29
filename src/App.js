import React, {useState, useEffect} from "react";
import Alert from "./components/Alert";
import List from "./components/List";
import './App.css';

// Function to get the local storage value
const getLocalStorage = () => {
  const list = localStorage.getItem("list");
  if(list) {
    return JSON.parse(list);
  }
  return [];
}

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  // Method to handle the outcomes of submitting the form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Alert for empty input
    if(!name) {
      showAlert(true, "danger", "please input item")
    }
    // Handle Edit functionality
    else if(name && isEditing) {
      setList(
        list.map(item => {
          if(item.id === editId) {
            return {...item, title: name}
          }
          return item;
        })
      )
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "item edited successfully");
    }
    // Add item to the list
    else {
      showAlert(true, "success", "item added successfully")
      const item = {
        id: new Date().getTime().toString(),
        title: name,
      }
      setList([...list, item]);
      setName("");
    }
  }

  // Method to show Alert
  const showAlert = (show=false, type="", message="") => {
    setAlert({show, type, message});
  }

  // Method to Delete an item
  const deleteItem = (id) => {
    showAlert(true, "danger", "item deleted");
    setList(list.filter(item => item.id !== id));
  }

  // Method to Edit an item
  const editItem = (id) => {
    const selectedItem = list.find(item => item.id === id);
    setIsEditing(true);
    setEditId(selectedItem.id);
    setName(selectedItem.title);
  }

  // Method to Clear all items from the list
  const clearList = () => {
    showAlert(true, "danger", "all items cleared from the list");
    setList([]);
  }

  // Add the list to the local storage of the browser
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      {alert.show ? <Alert {...alert} removeAlert={showAlert} list={list} />: null}
      <form className="grocery-form" onSubmit={handleSubmit}>
        <h3>grocery bud</h3>
        <div className="form-control">
          <input 
            type="text"
            className="grocery"
            placeholder="e.g. milk"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 ? (
        <div className="">
          <List list={list} editItem={editItem} deleteItem={deleteItem} />
          <button className="clear-btn" onClick={clearList}>clear items</button>
        </div>
      ) : null}
    </section>
  );
}

export default App;