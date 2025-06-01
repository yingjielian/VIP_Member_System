import React, { useEffect, useState } from 'react';
import api from '../api';

function MemberList({ onEdit, onView, onDelete }) {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        api.get('/members')
            .then(res => setMembers(res.data))
            .catch(err => alert('Error fetching members: ' + err));
    }, []);

    return (
        <div>
            <h2>VIP Members</h2>
            <table border="1" cellPadding="8">
                <thead>
                <tr>
                    <th>Member ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Level</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {members.map(m => (
                    <tr key={m.memberId}>
                        <td>{m.memberId}</td>
                        <td>{m.fullName}</td>
                        <td>{m.email}</td>
                        <td>{m.membershipLevel}</td>
                        <td>
                            <button onClick={() => onView(m)}>View</button>
                            <button onClick={() => onEdit(m)}>Edit</button>
                            <button onClick={() => onDelete(m.memberId)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default MemberList;
