function Item({ item, deleteItem, editItem, alternarCompletado }) {
  return (
    <li className="list-item">
      {/* Si item.completado es true, se le pone la clase "completed" para que se tache */}
      <span className={item.completado ? "completed" : ""}>
        {item.value}
      </span>
      
      <div className="item-actions">
        {/* Botón simple para tachar */}
        <button className="btn-action btn-complete" onClick={() => alternarCompletado(item.id)}>
          {item.completado ? 'Deshacer' : 'Listo'}
        </button>
        <button className="btn-action btn-edit" onClick={() => editItem(item)}>
          Editar
        </button>
        <button className="btn-action btn-delete" onClick={() => deleteItem(item.id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default Item;