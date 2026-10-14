import { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);

  // ADD ITEM
  const addItem = () => {
    if (id === '' || name === '' || price === '') {
      alert('Enter all details');
      return;
    }

    if (items.some((item) => item.id === id)) {
      alert('ID already exists');
      return;
    }

    setItems([...items, { id, name, price }]);

    setId('');
    setName('');
    setPrice('');
  };

  // EDIT ITEM: FILL INPUTS
  const editItem = (item) => {
    setId(item.id);
    setName(item.name);
    setPrice(item.price);
    setEditId(item.id);
  };

  // UPDATE ITEM BY ID
  const updateItem = () => {
    if (editId === null) {
      alert('Click Edit first');
      return;
    }

    if (name === '' || price === '') {
      alert('Enter new name and price');
      return;
    }

    const updatedItems = items.map((item) =>
      item.id === editId
        ? { ...item, name: name, price: price }
        : item
    );

    setItems(updatedItems);

    setId('');
    setName('');
    setPrice('');
    setEditId(null);
  };

  // DELETE ITEM BY ID
  const deleteItem = (deleteId) => {
    setItems(items.filter((item) => item.id !== deleteId));

    if (editId === deleteId) {
      setId('');
      setName('');
      setPrice('');
      setEditId(null);
    }
  };

  return (
    <div>
      <h1>Item Management System</h1>

      <label>ID: </label>
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        disabled={editId !== null}
      />

      <br /><br />

      <label>Name: </label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <label>Price: </label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        min="0"
      />

      <br /><br />

      <button onClick={addItem}>Add Item</button>

      <button onClick={updateItem}>Update Item</button>

      <button onClick={() => {
        setId('');
        setName('');
        setPrice('');
        setEditId(null);
      }}>
        Cancel
      </button>

      <h2>Display Items</h2>

      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
        items.map((item) => (
          <div key={item.id}>
            <p>ID: {item.id}</p>
            <p>Name: {item.name}</p>
            <p>Price: ₹{item.price}</p>

            <button onClick={() => editItem(item)}>
              Edit
            </button>

            <button onClick={() => deleteItem(item.id)}>
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default App;
