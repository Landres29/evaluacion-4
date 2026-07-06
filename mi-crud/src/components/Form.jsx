import { useState, useEffect } from 'react';

function Form({ addOrUpdateItem, itemToEdit }) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (itemToEdit) {
      setInputValue(itemToEdit.value);
    } else {
      setInputValue("");
    }
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // REQUISITO: Validación de campos vacíos o con solo espacios
    if (inputValue.trim() === "") {
      alert("Por favor, ingresa un texto válido. El campo no puede estar vacío.");
      return;
    }

    addOrUpdateItem(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <input
        type="text"
        className="form-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button type="submit" className="btn-submit">
        {itemToEdit ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
}

export default Form;