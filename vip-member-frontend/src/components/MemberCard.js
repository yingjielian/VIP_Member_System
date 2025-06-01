import React from 'react';

function MemberCard({ member, onClose }) {
    if (!member) return null;

    return (
        <div style={{ border: '1px solid #aaa', padding: 20, margin: 20, background: '#f9f9f9' }}>
            <h3>VIP Member Card</h3>
            <p><strong>Member ID:</strong> {member.memberId}</p>
            <p><strong>Name:</strong> {member.fullName}</p>
            <p><strong>Email:</strong> {member.email}</p>
            <p><strong>Phone:</strong> {member.phoneNumber}</p>
            <p><strong>Level:</strong> {member.membershipLevel}</p>
            <p><strong>Join Date:</strong> {member.joinDate}</p>
            <p><strong>Expiration Date:</strong> {member.expirationDate}</p>
            {member.profilePhotoUrl && <img src={member.profilePhotoUrl} alt="Profile" width={100} />}
            <p><strong>Notes:</strong> {member.notes}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

export default MemberCard;
