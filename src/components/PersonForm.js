import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from './../firebase-config'

const PersonForm = ({editId, setEditId, name, setName, email, setEmail}) => {
    const personsCollectionRef = collection(db, "persons")

    const handleSubmit = (e) => {
        e.preventDefault();

        if(name === '') {
            return
        }

        if(editId){
            const docRef = doc(db, 'persons', editId)

            updateDoc(docRef, {name:name})
                .then(response => {
            }).catch(error => {
                console.log(error.message)
            })
            setName("")
            setEmail("")
            setEditId(0)
            return
        }

        addDoc(personsCollectionRef, {
            name: name,
            email: email
        })
            .then(response => {
                console.log(response.id)
        }).catch(error => {
            console.log(error.message)
        })
        setName("")
        setEmail("")
    }

    const cancelEdit = () => {
        setName("")
        setEmail("")
        setEditId(0)
    }

  return (
    <form className="registerForm" onSubmit={handleSubmit}>
        <button className="formBtn" type="submit"> {editId ? "✏️" : "💾"}</button>
        {editId ? <button className="formBtn"onClick={cancelEdit} >❌</button> : ""}
        <input 
            type='text' 
            value={name}
            placeholder = "Name"
            onChange={(e) => setName(e.target.value)}/> 
        <input 
            type='text' 
            value={email}
            placeholder = "email@email.com"
            onChange={(e) => setEmail(e.target.value)}/> 
        <input 
            type='number'
            // value={age}
            placeholder = "Age"
            // onChange={(e) => setEmail(e.target.value)}/> 
            /> 
        <select name="genderSelect" id="genderSelect">
            <option value="" selected disabled hidden>Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select>
        <br/>
        <label>Skills:</label>
        <textarea rows="4" cols="30"></textarea>
    </form>
  )
}

export default PersonForm