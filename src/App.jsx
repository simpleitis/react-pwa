import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import About from './components/About';
import Contact from './components/Contact';

import Header from './components/Header';
import { db, messaging } from './firebase';
import { getToken } from 'firebase/messaging';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

function App() {
    const [refresh, setRefresh] = useState(false);

    async function requestPermission() {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            setRefresh(true);

            const token = await getToken(messaging, {
                vapidKey:
                    'BGzPgntblbNhPhDTJ8zoyTyJxt-SBpg6xOzWit3XYlwJLDsydb99yPSQZktLiTpp0ioo3d8OzM_3ODbvlBP-LYs',
            });
            console.log(token);
            await setDoc(doc(db, 'subscribers', 'sub-token'), {
                token: token,
            })
                .then((response) => {
                    console.log('Document added with id', response.id);
                })
                .catch((err) => console.log(err.message));
        } else if (permission === 'denied') {
            alert('You denied notification permission');
        }
    }

    useEffect(() => {
        requestPermission();
    }, [refresh]);

    return (
        <div className="App">
            <ToastContainer theme="colored" position="bottom-center" />
            <Header />
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route exact path="/about" element={<About />}></Route>
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
