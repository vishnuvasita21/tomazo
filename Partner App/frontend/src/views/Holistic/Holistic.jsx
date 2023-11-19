import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../src/Reservation.css'; 

const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [filterType, setFilterType] = useState('day'); 
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        setIsLoading(true); 
        axios.post('https://23oh8dzdta.execute-api.us-east-1.amazonaws.com/prod/holisticView', { restId: "1" }, {
            headers: {
                'Content-Type': 'application/json',
               
            }
        }).then(response => {
            setReservations(fetchedReservations(response.data, filterType));
        }).catch(error => {
            console.error('Error fetching data:', error);
        }).finally(() => {
            setIsLoading(false); 
        });
    }, [filterType]); 

    const fetchedReservations = (reservations, type) => {
        const counts = reservations.reduce((acc, { resDate, status }) => {
            let key;
            const date = new Date(resDate);

            if (type === 'day') {
                key = date.toLocaleDateString();
            } else if (type === 'month') {
                key = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
            } else { 
                key = date.getFullYear().toString();
            }

            if (!acc[key]) {
                acc[key] = { total: 0, approved: 0 };
            }

            acc[key].total += 1;
            if (status === 'approved') {
                acc[key].approved += 1;
            }

            return acc;
        }, {});

        return Object.entries(counts).map(([key, { total, approved }]) => ({ key, total, approved }));
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="reservations-container">
            <h1>Reservations details</h1>

            <div className="filter-container">
                <label htmlFor="filterType">Filter by: </label>
                <select id="filterType" value={filterType} onChange={e => setFilterType(e.target.value)}>
                    <option value="day">Day</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                </select>
            </div>

            <table className="reservation-table">
                <thead>
                    <tr>
                        <th>{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</th>
                        <th>Total Tables Booked</th>
                        <th>Approved Bookings</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(({ key, total, approved }, index) => (
                        <tr key={index}>
                            <td>{key}</td>
                            <td>{total}</td>
                            <td>{approved}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reservations;
