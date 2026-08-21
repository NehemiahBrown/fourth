import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase.js"
import { useState } from "react"
import { useNavigate } from "react-router"

export default function SignUp(){
    const [errorMessage, setErrorMessage ] = useState("")
    const navigate = useNavigate();

 async function createNewUser(e){
     e.preventDefault();
     setErrorMessage("")

     let email = e.target.newEmail.value;
     let password = e.target.newPassword.value;
     let fullname = e.target.newName.value;
     let username = e.target.newUsername.value;


     try {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        }).then(() => {
            navigate("/app")
        })
        .catch((error) => {
          console.log(error.message)
        });
     } catch(err){
        console.log(err.message)
     }

  }

    return (
        <>
        <h1 className="text-4xl">Sign Up</h1>
        <form onSubmit={createNewUser} action="">
            <div>
                <label htmlFor="newName">Full Name</label>
                <input type="text" id="newName" name="newName" className="border border-[var(--accent)]"/>
            </div>
            <div>
                <label htmlFor="newUsername">nUsername</label>
                <input type="text" id="newUsername" name="newUsername" className="border border-[var(--accent)]"/>
            </div>
            <div>
                <label htmlFor="newEmail">Email</label>
                <input type="email" id="newEmail" name="newEmail" className="border border-[var(--accent)]" />
            </div>
            <div>
                <label htmlFor="newPassword">Password</label>
                <input type="password" id="newPassword" name="newPassword" className="border border-[var(--accent)]" />
            </div>
            <button type="submit" className="bg-[var(--surface)]">Log In</button>
        </form>
        </>
    )
}