import { useState } from 'react'
import supabase from '../supabase'
import { Button, FormControl, TextField, Select, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { createProfile } from '../services/profile'

const Auth = ( { mode } ) => {
    const [email, setEmail] = useState("") // saves user's email
    const [password, setPassword] = useState("") // saves user's password
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [error, setError] = useState(null) // saves error object

    const navigate = useNavigate()
    const isSignUp = mode === "signup"

    const handleSubmit = async () => { // wait for API call to finish before moving to the next line
        const { data, error } = isSignUp // {} to destructure error object
            ? await supabase.auth.signUp({ email, password })
            : await supabase.auth.signInWithPassword({ email, password })
        
        if (error) {
            setError(error.message)
        } else {
            if (isSignUp) {
                await createProfile(data.user.id, {
                    first_name: firstName,
                    last_name: lastName,
                    age: parseInt(age),
                    gender: gender
                })
            }
            navigate('/')
        }
    }
    return (
        <div className="min-h-screen bg-bg-primary flex items-center justify-center">
            <div className="bg-bg-card border border-border-subtle rounded-2xl p-10 w-full max-w-md">
                <h1 className="font-display text-4xl font-bold text-text-primary mb-2">
                    {isSignUp ? "Sign Up" : "Sign In"}
                </h1>

                <p className="text-text-muted mb-8">
                    {isSignUp ? "Create your account to continue" : "Welcome back"}
                </p>

                {isSignUp && (
                    <>
                        <TextField required label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <TextField required label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} /> 
                        <TextField required label="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                        <FormControl>
                            <Select
                                required
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                label="Gender"
                            >
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"Nonbinary"}>Nonbinary</MenuItem>
                                <MenuItem value={""}>Preferred not to say</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                <TextField required label="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                <TextField required label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password"/>

                <Button onClick={handleSubmit}>
                    {isSignUp 
                        ? "Sign Up"
                        : "Log In"
                    }
                </Button>

                {/* fields and button */}
                <p className="text-center text-text-muted text-sm mt-6">
                    {isSignUp 
                        ? <>Already have an account? <span className="text-accent-blue cursor-pointer" onClick={() => navigate('/signin')}>Sign In</span></>
                        : <>Don't have an account? <span className="text-accent-blue cursor-pointer" onClick={() => navigate('/signup')}>Sign Up</span></>
                    }
                </p>

                {error && <p>{error}</p>} {/* displays error msg if exist */}
            </div>
        </div>
    )
}

export default Auth
