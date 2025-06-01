import React, { useState } from 'react';
import MemberList from './components/MemberList';
import MemberForm from './components/MemberForm';
import MemberCard from './components/MemberCard';
import api from './api';

function App() {
  const [editingMember, setEditingMember] = useState(null);
  const [viewingMember, setViewingMember] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // Handler to add a new member
  function handleAdd() {
    setEditingMember(null);
    setShowForm(true);
  }

  // Handler to edit an existing member
  function handleEdit(member) {
    setEditingMember(member);
    setShowForm(true);
  }

  // Handler to view a member's details/card
  function handleView(member) {
    setViewingMember(member);
  }

  // Handler to delete a member
  function handleDelete(memberId) {
    if (window.confirm('Are you sure you want to delete this member?')) {
      api.delete(`/members/${memberId}`)
          .then(() => setRefresh(r => !r))
          .catch(err => alert('Delete failed: ' + err));
    }
  }

  // Handler to save a member (add or update)
  function handleSave(member) {
    if (editingMember) {
      // Update
      api.put(`/members/${editingMember.memberId}`, member).then(() => {
        setShowForm(false);
        setRefresh(r => !r);
      });
    } else {
      // Create
      api.post('/members', member).then((res) => {
        setShowForm(false);
        setRefresh(r => !r);
        // Optionally: setViewingMember(res.data); // to view the new member including memberId
      });
    }
  }


  // Handler to cancel form
  function handleCancel() {
    setShowForm(false);
  }

  // Handler to close member card view
  function handleCloseCard() {
    setViewingMember(null);
  }

  return (
      <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
        <h1>VIP Members System</h1>
        {/* Show Add button and list if not editing or viewing */}
        {!showForm && !viewingMember && (
            <>
              <button onClick={handleAdd} style={{ marginBottom: 12 }}>Add Member</button>
              <MemberList
                  key={refresh} // Forces re-fetch when refresh changes
                  onEdit={handleEdit}
                  onView={handleView}
                  onDelete={handleDelete}
              />
            </>
        )}
        {/* Show form for add/edit */}
        {showForm && (
            <MemberForm
                member={editingMember}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        )}
        {/* Show member card */}
        {viewingMember && (
            <MemberCard
                member={viewingMember}
                onClose={handleCloseCard}
            />
        )}
      </div>
  );
}

export default App;
