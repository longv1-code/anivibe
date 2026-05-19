import { useState } from 'react'
import supabase from '../supabase'
import { Button, FormControl, TextField, Select, MenuItem, InputLabel } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { createProfile } from '../services/profile'
import Navbar from '../components/Navbar'

const Auth = ( { mode } ) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("") // saves user's email
    const [password, setPassword] = useState("") // saves user's password
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [error, setError] = useState(null) // saves error object
    const [success, setSuccess] = useState(false)

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
                    username: username,
                    age: parseInt(age),
                    gender: gender
                })
                setSuccess(true)
            } else {
                navigate('/')
            }
            
        }
    }
    return (
        <div className="min-h-screen bg-bg-primary">
            <Navbar minimal={true} />
            <div className='flex items-center justify-center pt-16'>
                {success ? (
                    <div className="text-center">
                        <p className="text-4xl mb-4">📧</p>
                        <h2 className="font-display text-2xl font-bold text-text-primary mb-3">
                            Check your email
                        </h2>
                        <p className="text-text-muted mb-6">
                            We sent a verification link to <span className="text-accent-blue">{email}</span>. 
                            Please verify your email before signing in.
                        </p>
                        <Button 
                            variant="outlined" 
                            onClick={() => navigate('/signin')}
                        >
                            Go to Sign In
                        </Button>
                    </div>
                ) : (
                    <div className="bg-bg-card border border-border-subtle rounded-2xl p-10 w-full max-w-md">
                        <h1 className="font-display text-4xl font-bold text-text-primary mb-2">
                            {isSignUp ? "Sign Up" : "Sign In"}
                        </h1>

                        <p className="text-text-muted mb-8">
                            {isSignUp ? "Create your account to continue" : "Welcome back"}
                        </p>

                        {isSignUp && (
                            <>
                                {/* First + Last name side by side */}
                                <div className="flex gap-3">
                                    <TextField fullWidth required label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    <TextField fullWidth required label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} /> 
                                </div>

                                {/* Age + Gender side by side */}
                                <div className="flex gap-3">
                                    <TextField fullWidth required type="number" inputProps={{ min: 1, max: 120 }} label="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                                    <FormControl fullWidth required>
                                        <InputLabel>Gender</InputLabel>
                                        <Select
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            label="Gender"
                                        >   
                                            <MenuItem value={"Male"}>Male</MenuItem>
                                            <MenuItem value={"Female"}>Female</MenuItem>
                                            <MenuItem value={"Nonbinary"}>Nonbinary</MenuItem>
                                            <MenuItem value={"Preferred not to say"}>Preferred not to say</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <TextField fullWidth required label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </>
                        )}
                        <TextField fullWidth required label="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                        <TextField fullWidth required label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password"/>

                        <Button 
                            onClick={handleSubmit}
                            fullWidth
                            variant='contained'
                            size='large'
                        >
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
                )}
            </div>
        </div>
    )
}

export default Auth
