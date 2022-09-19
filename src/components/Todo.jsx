import React from "react";
import { useState, useEffect } from "react";
import todo from "../images/list1.jpg";

// get the data from localStorage

const getLocalItem = () => {
  let localData = localStorage.getItem("todoList");
  console.log(localData);

  if (localData) {
    return JSON.parse(localStorage.getItem("todoList"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setinputData] = useState("");
  const [item, setItem] = useState(getLocalItem());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [iseditItem, setisEditItem] = useState(null);

  // add the Items
  const addItem = () => {
    const allInputData = {
      id: new Date().getTime().toString(),
      name: inputData,
    };

    if (!inputData) {
      alert("Please Enter value");
    } else if (inputData && !toggleSubmit) {
      setItem(
        item.map((elem) => {
          if (elem.id === iseditItem) {
            return { ...item, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setinputData("");
      setisEditItem(null);
    } else {
      setItem([...item, allInputData]);
      setinputData("");
    }
  };

  // Delete the Item
  const deleteItem = (index) => {
    let updateData = item.filter((elem) => {
      return index !== elem.id;
    });
    setItem(updateData);
  };

  // Remove the All Item
  const removeAll = () => {
    setItem([]);
  };

  // Edit the item
    const editItem = (ind) => {
    let newEditItem = item.find((elem) => {
      return ind === elem.id;
    });
    console.log(newEditItem);
    setToggleSubmit(false);
    setinputData(newEditItem.name);
    setisEditItem(ind);
  };

  // store the data from local storage
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(item));
  }, [item]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="todoapp" />
            <figcaption>Add your list here ✍️</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              value={inputData}
              onChange={(e) => setinputData(e.target.value)}
              placeholder="✍️ Add Item..."
            />
            {toggleSubmit ? (
              <i
                className="fa fa-plus add-btn"
                title="Add item"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="fas fa-edit add-btn"
                title="Update item"
                onClick={addItem}
              ></i>
            )}
          </div>

          {item.map((curval) => {
            return (
              <div className="showItems" key={curval.id}>
                <div className="eachItem">
                  <h3>{curval.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="fas fa-edit add-btn"
                      title="Edit item"
                      onClick={() => editItem(curval.id)}
                    ></i>

                    <i
                      className="fas fa-trash-alt add-btn"
                      title="Delete item"
                      onClick={() => deleteItem(curval.id)}
                    ></i>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
