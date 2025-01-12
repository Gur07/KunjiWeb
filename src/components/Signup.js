import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import '../styles/Auth.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [state, setState] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [gender, setGender] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const categories = ['General', 'SC', 'ST', 'OBC'];
  const states = [ "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Prradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"
];
  const maritalStatuses = ['Single', 'Married', 'Widowed'];
  const genders = ['Male', 'Female', 'Other'];

  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (phone.length !== 10) {
      alert('Phone number must be 10 digits');
      return;
    }
  
    try {
      // First create the user authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Then create the user document
      try {
        await setDoc(doc(db, 'users', user.uid), {
          name,
          email,
          age,
          phone,
          category,
          state,
          maritalStatus,
          gender,
          annualIncome,
          createdAt: new Date().toISOString(),
        });
  
        navigate('/quiz');
      } catch (firestoreError) {
        // If Firestore creation fails, delete the authentication user
        await user.delete();
        console.error('Firestore Error:', firestoreError);
        alert('Error creating user profile. Please try again.');
      }
    } catch (authError) {
      if (authError.code === 'auth/email-already-in-use') {
        alert('Email already exists. Redirecting to login...');
        navigate('/login');
      } else {
        console.error('Auth Error:', authError);
        alert(authError.message);
      }
    }
  };
  
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Enter your 10-digit phone number"
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            placeholder="Enter your age"
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Marital Status</label>
          <select
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            {maritalStatuses.map((status, index) => (
              <option key={index} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            {genders.map((gen, index) => (
              <option key={index} value={gen}>{gen}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Annual Income</label>
          <input
            type="number"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(e.target.value)}
            required
            placeholder="Enter your annual income"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <button type="submit" className="auth-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
