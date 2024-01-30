/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState } from 'react';

const initialData = [
  {
    id: 1,
    name: 'Sam',
    todos: ['Go shopping', 'Eat cheese', 'Buy donuts'],
    image: 'https://i.pravatar.cc/48?u=933372/',
  },
  {
    id: 2,
    name: 'Jim',
    todos: ['Dance', 'Play Mario', 'Sleep', 'Shop', 'Learn JS'],
    image: 'https://i.pravatar.cc/48?u=908311',
  },
];

export default function App() {
  const [peopleData, setPeopleData] = useState(initialData);
  const [selectedPerson, setSelectedPerson] = useState(null);

  function handleAddPerson(person) {
    setPeopleData((people) => [...people, person]);
  }

  function handleRemovePerson(clickedPerson) {
    setPeopleData(peopleData.filter((person) => person !== clickedPerson));
    setSelectedPerson(null);
  }

  function handleTaskChecked(taskID) {
    console.log(taskID);
    const updatedPeopleData = peopleData.map((person) =>
      person === selectedPerson
        ? // ? { ...person, todos: []] }
          { ...person, todos: person.todos.filter((todo, i) => i !== taskID) }
        : person
    );
    setPeopleData(updatedPeopleData);
  }

  return (
    <>
      <h1>To-do app</h1>
      <br />
      <div className="app">
        <Sidebar
          data={peopleData}
          selectedPerson={selectedPerson}
          updatePeople={setPeopleData}
          onSelectPerson={setSelectedPerson}
          onAddPerson={handleAddPerson}
          onRemovePerson={handleRemovePerson}
        />
        {selectedPerson && (
          <ShowTodosForm
            person={selectedPerson}
            onTaskChecked={handleTaskChecked}
          />
        )}
      </div>
    </>
  );
}

function Sidebar({
  data,
  selectedPerson,
  updatePeople,
  onSelectPerson,
  onAddPerson,
  onRemovePerson,
}) {
  const [showAddPersonForm, setShowAddPersonForm] = useState(false);
  return (
    <div className="sidebar">
      <ul>
        {data.map((person) => (
          <Person
            person={person}
            key={person.id}
            selectedPerson={selectedPerson}
            onSelectPerson={onSelectPerson}
            onRemovePerson={onRemovePerson}
          />
        ))}
      </ul>
      {showAddPersonForm && <AddPersonForm onAddPerson={onAddPerson} />}
      <br />
      <Button
        onClick={() => {
          onSelectPerson(null);
          setShowAddPersonForm(!showAddPersonForm);
        }}
      >
        {showAddPersonForm ? 'Close' : 'Add person'}
      </Button>
    </div>
  );
}

function Person({ person, selectedPerson, onSelectPerson, onRemovePerson }) {
  return (
    <>
      <li
        onClick={() => onSelectPerson(person)}
        className={selectedPerson === person ? 'selected' : ''}
      >
        <img src={person.image}></img>
        <h3>{person.name}</h3>
        <p>{person.todos.length} tasks to do</p>
        <Button onClick={() => onRemovePerson(person)}>❌</Button>
      </li>
    </>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function AddPersonForm({ onAddPerson }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  function handleAddPerson(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const person = { id, name, image, todos: [] };
    onAddPerson(person);
  }

  return (
    <form className=".form-add-person">
      <label>📇 Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>🌅 Image</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <Button onClick={handleAddPerson}>Add</Button>
    </form>
  );
}

function ShowTodosForm({ person, onTaskChecked }) {
  return (
    <form className="form-show-todos">
      <h2>{person.name}s Todos</h2>
      <ul>
        {person.todos.map((todo, i) => (
          <Todo key={i} i={i} todo={todo} onTaskChecked={onTaskChecked} />
        ))}
      </ul>
    </form>
  );
}

function Todo({ i, todo, onTaskChecked }) {
  return (
    <li>
      <input type="checkbox" onClick={() => onTaskChecked(i)}></input>
      {todo}
    </li>
  );
}
