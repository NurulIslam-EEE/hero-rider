import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
const Register = () => {
    const { registerUser } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [licence, setLicence] = useState(null);
    const [area, setArea] = useState('');
    const [nid, setNid] = useState(null);
    const [profile, setProfile] = useState(null);
    const [carName, setCarName] = useState('');
    const [model, setModel] = useState('');
    const [plate, setPlate] = useState('');
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [type, setType] = useState('');
    // console.log(licence, profile, nid)
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (pass1 === pass2) {
            registerUser(email, pass1, name, navigate)

            formData.append('name', name);
            formData.append('email', email);
            formData.append('age', age);
            formData.append('address', address);
            formData.append('phone', phone);


            formData.append('nid', nid);
            formData.append('profile', profile);

            formData.append('pass1', pass1);
            formData.append('pass2', pass2);
            formData.append('type', type);
            formData.append('role', 'learner');

            fetch('https://pacific-shelf-98657.herokuapp.com/learner', {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        console.log(data)
                        alert('added successfully')

                    }
                })


            console.log(type)
        } else {
            alert('your password didnt match')
        }
    }
    return (
        <div>
            <h3>Join as a learner</h3>
            <form onSubmit={handleSubmit}>
                <input onChange={e => setName(e.target.value)} placeholder='Full Name' type="text" /> <br />
                <input onChange={e => setEmail(e.target.value)} placeholder='email' type="email" /> <br />
                <input onChange={e => setAge(e.target.value)} placeholder='age' type="number" /> <br />
                <input onChange={e => setAddress(e.target.value)} placeholder='Address' type="text" /> <br />
                <input onChange={e => setPhone(e.target.value)} placeholder='phone' type="number" name="" id="" /> <br />


                <label htmlFor="nid">nid picture</label> <br />

                <input onChange={e => setNid(e.target.files[0])} id='nid' accept="image/*" type="file" /> <br />
                <label htmlFor="profile">Profile picture</label> <br />
                <input onChange={e => setProfile(e.target.files[0])} id='profile' accept="image/* " type="file" /> <br />

                <input onChange={e => setPass1(e.target.value)} placeholder='Password' type="password" name="" id="" /> <br />
                <input onChange={e => setPass2(e.target.value)} placeholder='Retype password' type="password" name="" id="" />
                <br />
                <label htmlFor="vType"> Vehicle Type</label>
                <select onChange={e => setType(e.target.value)} name="vType" id="">
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                </select> <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Register;