import Item from './Item';

function List({ items, deleteItem, editItem, alternarCompletado }) {
  return (
    <ul className="items-list">
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          deleteItem={deleteItem}
          editItem={editItem}
          alternarCompletado={alternarCompletado}
        />
      ))}
    </ul>
  );
}

export default List;