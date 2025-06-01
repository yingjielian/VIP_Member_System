import React, { useState, useEffect } from 'react';

function MemberForm({ member, onSave, onCancel }) {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        membershipLevel: '',
        joinDate: '',
        expirationDate: '',
        profilePhotoUrl: '',
        notes: ''
    });

    useEffect(() => {
        if (member) setForm(member);
    }, [member]);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSave(form);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>{member ? 'Edit Member' : 'Add Member'}</h3>
            <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required /><br />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required /><br />
            <input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} /><br />
            <input name="membershipLevel" placeholder="Membership Level" value={form.membershipLevel} onChange={handleChange} /><br />
            <input name="joinDate" type="date" placeholder="Join Date" value={form.joinDate} onChange={handleChange} /><br />
            <input name="expirationDate" type="date" placeholder="Expiration Date" value={form.expirationDate} onChange={handleChange} /><br />
            <input name="profilePhotoUrl" placeholder="Profile Photo URL" value={form.profilePhotoUrl} onChange={handleChange} /><br />
            <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} /><br />
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel} style={{marginLeft: '10px'}}>Cancel</button>
        </form>
    );
}

export default MemberForm;
