
"use client";
import Link from "next/link"
import styles from './activity.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ActivityPage() {
    const [data, setData] = useState([]);
    const [activityid, setActivityId] = useState('');
    const [date, setDate] = useState('');
    const [starttime, setStartTime] = useState('');
    const [endtime, setEndTime] = useState('');
    const [weather, setWeather] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data: res } = await axios.get('http://172.16.1.132:8000/activities/');
            setData(res);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addActivity = async () => {
        try {
            const response = await axios.post('http://172.16.1.132:8000/activities/', {
                activityid,
                date,
                starttime,
                endtime,
                weather,
                latitude,
                longitude,
                description
            });
            return response.data;
        } catch (error) {
            console.error('Error adding activity:', error);
            throw new Error('Failed to add activity: ' + error.message);
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addActivity();
            // Refresh data after adding activity
            fetchData();
            // Reset form fields
            setActivityId('');
            setDate('');
            setStartTime('');
            setEndTime('');
            setWeather('');
            setLatitude('');
            setLongitude('');
            setDescription('');
        } catch (error) {
            console.error('Error adding activity:', error);
        }
    };

    return (
        <>

            <p className={styles['page-title']}>Activity Page</p>
            <div className={styles['table-wrapper']}>
                <table className={styles['workgroup-table']}>
                    <thead>
                        <tr>
                            <th>Activity ID</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Weather</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th style={{ width: '200px' }}>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length !== 0 && data.map((ac, index) => (
                            <tr key={index} className={index % 2 === 0 ? styles.even : styles.odd}>
                                <td>{ac.activityid}</td>
                                <td>{ac.date}</td>
                                <td>{ac.starttime}</td>
                                <td>{ac.endtime}</td>
                                <td>{ac.weather}</td>
                                <td>{ac.latitude}</td>
                                <td>{ac.longitude}</td>
                                <td>{ac.description}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles['form-wrapper']}>
                <div className={styles.card}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <h2>Add New Activity</h2>
                        <input type="text" placeholder="Activity ID" value={activityid} onChange={(e) => setActivityId(e.target.value)} />
                        <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
                        <input type="time" placeholder="Start Time" value={starttime} onChange={(e) => setStartTime(e.target.value)} />
                        <input type="time" placeholder="End Time" value={endtime} onChange={(e) => setEndTime(e.target.value)} />
                        <input type="text" placeholder="Weather" value={weather} onChange={(e) => setWeather(e.target.value)} />
                        <input type="text" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                        <input type="text" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
            <nav className={styles['sidebar']}>
                <ul className={styles['sidebar-list']}>
                    <h2>Menu</h2><br />
                    <li className={styles['sidebar-item']}>
                        <Link href="/activity" scroll={false}>Activity</Link>
                    </li>
                    <li className={styles['sidebar-item']}>
                        <Link href="/workgroups" scroll={false}>Workgroup</Link>
                    </li>
                </ul>
            </nav>

        </>


    )
}
