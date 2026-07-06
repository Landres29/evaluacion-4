import { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    const storedItems =
      JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      setItems(
        items.map((item) =>
          item.id === itemToEdit.id
            ? { ...item, value }
            : item
        )
      );
      setItemToEdit(null);
    } else {
      setItems([
        ...items,
        { id: Date.now(), value }
      ]);
    }
  };

  // REQUISITO: Confirmación nativa antes de eliminar un elemento
  const deleteItem = (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este elemento?");
    if (confirmar) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const editItem = (item) => {
    setItemToEdit(item);
  };

  return (
    <div className="App">
      <h1 className="app-title">CRUD con LocalStorage</h1>

      <Form
        addOrUpdateItem={addOrUpdateItem}
        itemToEdit={itemToEdit}
      />

      {/* REQUISITO: Contador dinámico con la cantidad total de elementos */}
      <p className="items-counter">Total: {items.length}</p>

      <List
        items={items}
        deleteItem={deleteItem}
        editItem={editItem}
      />
    </div>
  );
}

export default App;