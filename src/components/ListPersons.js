import React, { useEffect, useState } from 'react'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { db } from './../firebase-config'

const ListPersons = ({editId, setEditId, name, setName}) => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        getPersons()
    }, [])

    useEffect(() => {

    }, [persons, name])

    const getPersons = () => {
        const personsCollectionRef = collection(db, "persons");

        getDocs(personsCollectionRef)
            .then(response => {
                const personsFromDb = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id
                }))
                setPersons(personsFromDb)
             })
             .catch(error => console.log(error.message))
    }

    const handleEdit = (personId) => {
        const personData = persons.find((i) => i.id === personId);
        setName(personData.data.name);
        setEditId(personId)
    }

    const handleDelete = async (personId) => {
        const personsDoc = doc(db, "persons", personId)
        await deleteDoc(personsDoc);
    }

  return (
    <div>
        <button className='refresh' onClick={() => getPersons()}>🔄</button>
        <ul className="personsList">
          {persons.map((person) => (
            <li className="singlePerson" key={person.id}>
            <span className="personName">{person.data.name}</span>
            <button className='editBtn' onClick={() => handleEdit(person.id)}>✏️</button>
            <button className='deleteBtn' onClick={() => handleDelete(person.id)}>🚫</button>
            </li>
          ))}
    </ul>
    </div>
  )
}

export default ListPersons