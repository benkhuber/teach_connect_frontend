import { useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { API_URL } from "../config";

interface SignUpFormState {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

function SignUp() {
    console.log(API_URL)

    const [formData, setFormData] = useState<SignUpFormState> ({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    })
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: value}))
        console.log(formData);
    }
    
    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/users/signup`, formData,
                { headers: {
                    'Content-Type': 'application/json'
            }
        });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <NavBar />
            <h1>Sign Up Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstname">First Name:</label>
                <input type="text" name="firstname" id="fname" onChange={handleChange} value={formData.firstname} required maxLength={20} />
                <br />

                <label htmlFor="lastname">Last Name:</label>
                <input type="text" name="lastname" id="lname" onChange={handleChange} value={formData.lastname} required maxLength={20} />
                <br />

                <label htmlFor="email">Email:</label>
                <input type="text" name="email" id="email" onChange={handleChange} value={formData.email} required maxLength={40} />
                <br />

                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="pass" onChange={handleChange} value={formData.password} required maxLength={15} />
                <br />

                <button>Sign Up</button>
            </form>
        </>
    )
}

export default SignUp