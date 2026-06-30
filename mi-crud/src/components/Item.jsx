function Item({ item, deleteItem, editItem }) {
  return (
    <li className="list-item">
      <span>{item.value}</span>
      <div className="item-actions">
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