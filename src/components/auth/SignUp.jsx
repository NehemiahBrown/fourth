import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase.js"
import { useState } from "react"

export default function SignUp(){
    const [email, setEmail] = useState("");
    const [password, setPassword ] = useState("");
    const [error, setError ] = useState("");



createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

 async function signUserUp(e){
     e.preventDefault();
     setError("")

     try {
        await createUserWithEmailAndPassword(auth, email, password)
     } catch(err){
        console.log(err.message)
     }

  }

    return (
        <>
        <h1 className="text-4xl">Sign Up</h1>
        <form onClick={signUserUp} action="">
            <div>
                <label htmlFor="fname">Full Name</label>
                <input type="text" name="fname" className="border border-[var(--accent)]"/>
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" className="border border-[var(--accent)]"/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" className="border border-[var(--accent)]" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="text" className="border border-[var(--accent)]" />

            </div>
            <button type="submit" className="bg-[var(--surface)]">Log In</button>
        </form>
        </>
    )
}