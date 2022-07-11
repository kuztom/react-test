import React, { useEffect, useState } from 'react'
import { collection, doc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db } from './../firebase-config'

const RealtimeList = ({setEditId, setName, setEmail}) => {
    const [persons, setPersons] = useState([]);
    const personsCollectionRef = collection(db, "persons");

    useEffect(() => {
      const unsubscribe = onSnapshot(personsCollectionRef, snapshot => {
        setPersons(snapshot.docs.map(doc => ({
            data: doc.data(),
            id: doc.id
            })
        ))
      })
    
      return () => {
        unsubscribe()
      }
    }, [])

    const handleEdit = (personId) => {
        const personData = persons.find((i) => i.id === personId);
        setName(personData.data.name);
        setEmail(personData.data.email);
        setEditId(personId)
    }

    const handleDelete = async (personId) => {
        const personsDoc = doc(db, "persons", personId)
        await deleteDoc(personsDoc);
    }

  return (
    <div>
        {/* <button className='refresh' onClick={() => getPersons()}>🔄</button> */}
        <ul className="personsList">
          {persons.map((person) => (
            <li className="singlePerson" key={person.id}>
            <span className="personName">{person.data.name} 
                <span className='personInfo'>
                    <br />Email: {person.data.email} 
                    <br />Age: {person.data.age}  &nbsp;|&nbsp; Gender: {person.data.gender} &nbsp;|&nbsp; Height: {person.data.height}cm 
                    <br />Skills: {person.data.skills}
                    <br />
                </span>
            </span>
            <button className='editBtn' onClick={() => handleEdit(person.id)}>✏️</button>
            <button className='deleteBtn' onClick={() => handleDelete(person.id)}>🚫</button>
            </li>
          ))}
    </ul>
    </div>
  )
}

export default RealtimeList