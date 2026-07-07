import { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  
  // Guardamos el texto que escribe el usuario en el buscador
  const [buscar, setBuscar] = useState("");

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      setItems(
        items.map((item) =>
          item.id === itemToEdit.id ? { ...item, value } : item
        )
      );
      setItemToEdit(null);
    } else {
      setItems([
        ...items,
        { id: Date.now(), value, completado: false } // Agregamos "completado: false" por defecto
      ]);
    }
  };

  // Mantenemos tu confirmación exacta del Commit 2
  const deleteItem = (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este elemento?");
    if (confirmar) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const editItem = (item) => {
    setItemToEdit(item);
  };

  // Función simple para tachar o destachar con un mapa normal
  const alternarCompletado = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completado: !item.completado } : item
      )
    );
  };

  // Función simple para vaciar el arreglo
  const borrarTodo = () => {
    const confirmar = window.confirm("¿Seguro que quieres borrar TODO?");
    if (confirmar) {
      setItems([]);
    }
  };

  // Filtramos la lista antes de pasarla al componente List usando un filter básico
  const listaFiltrada = items.filter((item) =>
    item.value.toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <div className="App">
      <h1 className="app-title">CRUD con LocalStorage</h1>

      <Form addOrUpdateItem={addOrUpdateItem} itemToEdit={itemToEdit} />

      {/* INPUT DEL BUSCADOR */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar elemento..."
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
        />
      </div>

      {/* Mantenemos tu contador del Commit 2 */}
      <p className="items-counter">Total: {items.length}</p>

      {/* Le pasamos la lista filtrada en vez de la original */}
      <List
        items={listaFiltrada}
        deleteItem={deleteItem}
        editItem={editItem}
        alternarCompletado={alternarCompletado}
      />

      {/* BOTÓN PARA BORRAR TODO */}
      {items.length > 0 && (
        <button className="btn-clear-all" onClick={borrarTodo}>
          Borrar Todo
        </button>
      )}
    </div>
  );
}

export default App;