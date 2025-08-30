import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { AuthContext } from '../context/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEdit, faSave, faTimes, faBriefcase, faTrophy, faCheckCircle, faClock
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

const Profile = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    if (isLoggedIn) fetchProfile();
  }, [isLoggedIn]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/profiles/');
      setProfile(response.data);
      setEditForm(response.data);
    } catch {
      showToast('Failed to load profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const formData = new FormData();

      // All editable fields from serializer
      const editableFields = [
        "email", "username", "role", "school", "specialization",
        "batch_year", "bio", "profile_image",
        "linkedin_url", "github_url", "portfolio_url"
      ];

      editableFields.forEach(key => {
        const value = editForm[key];
        if (value !== undefined && value !== null) {
          if (key === 'profile_image' && value instanceof File) {
            formData.append(key, value);
          } else if (key !== 'profile_image') {
            formData.append(key, value);
          }
        }
      });

      const response = await axiosInstance.patch('/api/profiles/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setProfile(response.data);
      setEditing(false);
      showToast('Profile updated successfully!', 'success');

    } catch (err) {
      console.error('PATCH error:', err.response?.data || err.message);
      showToast('Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => setEditForm(prev => ({ ...prev, [field]: value }));
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) handleInputChange('profile_image', e.target.files[0]);
  };

  const showToast = (message, type='success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString() : 'N/A';

  const memberSince = (dateStr) => {
    if (!dateStr) return 'N/A';
    const joinedDate = new Date(dateStr);
    const now = new Date();
    const diffMs = now - joinedDate;
    const diffYears = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));
    const diffMonths = Math.floor((diffMs % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    return diffYears > 0 ? `${diffYears} year${diffYears > 1 ? 's' : ''} ${diffMonths} month${diffMonths > 1 ? 's' : ''}` : `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
  };

  const styles = {
    wrapper: { minHeight:'100vh', padding:'50px 20px', fontFamily:'Arial, sans-serif', background:'#f0f2f5' },
    container: { maxWidth:'1100px', margin:'35px auto' },
    header: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'30px' },
    title: { fontSize:'30px', fontWeight:'bold', color:'#1E40AF' },
    button: { padding:'10px 20px', borderRadius:'8px', border:'none', fontWeight:'600', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', transition:'all 0.2s ease' },
    editButton: { background:'#1E40AF', color:'#fff', boxShadow:'0 4px 6px rgba(0,0,0,0.1)' },
    saveButton: { background:'#10B981', color:'#fff', boxShadow:'0 4px 6px rgba(0,0,0,0.1)' },
    cancelButton: { background:'#6B7280', color:'#fff', boxShadow:'0 4px 6px rgba(0,0,0,0.1)' },
    grid: { display:'flex', flexWrap:'wrap', gap:'20px' },
    sidebar: { flex:'1 1 250px', background:'#fff', padding:'25px 20px', borderRadius:'16px', boxShadow:'0 10px 20px rgba(0,0,0,0.08)', textAlign:'center', transition:'all 0.3s ease' },
    main: { flex:'2 1 600px', background:'#fff', padding:'30px', borderRadius:'16px', boxShadow:'0 10px 20px rgba(0,0,0,0.08)' },
    avatar: { width:'130px', height:'130px', borderRadius:'50%', margin:'0 auto 15px', objectFit:'cover', border:'4px solid #1E40AF' },
    name: { fontSize:'24px', fontWeight:'bold', color:'#111827', marginBottom:'5px' },
    role: { color:'#10B981', fontWeight:'600', marginBottom:'10px' },
    badges: { display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'8px', marginTop:'15px' },
    badge: { background:'#F59E0B', color:'#111827', padding:'4px 10px', borderRadius:'999px', fontSize:'12px', fontWeight:'600', boxShadow:'0 2px 4px rgba(0,0,0,0.1)' },
    section: { marginBottom:'30px' },
    sectionTitle: { fontSize:'20px', fontWeight:'700', marginBottom:'15px', display:'flex', alignItems:'center', gap:'8px', color:'#1E40AF' },
    field: { marginBottom:'15px', fontSize:'16px', color:'#374151' },
    input: { width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #d1d5db', marginBottom:'12px', fontSize:'16px', transition:'all 0.2s ease', outline:'none' },
    textarea: { width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #d1d5db', minHeight:'100px', resize:'vertical', fontSize:'16px', marginBottom:'12px', transition:'all 0.2s ease', outline:'none' },
    socialLinks: { display:'flex', justifyContent:'center', gap:'10px', marginTop:'15px' },
    socialButton: { width:'38px', height:'38px', borderRadius:'50%', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none', boxShadow:'0 2px 6px rgba(0,0,0,0.15)', transition:'all 0.2s ease' },
    toast: { position:'fixed', top:'20px', right:'20px', padding:'12px 20px', borderRadius:'8px', fontWeight:'600', color:'#fff', zIndex:1000 },
    status: { display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', fontWeight:'600', marginTop:'12px', fontSize:'15px', color:'#374151' },
    memberSince: { marginTop:'10px', fontWeight:'500', fontSize:'15px', color:'#1F2937' },
    linkButtons: { display:'flex', gap:'10px', marginTop:'15px', flexWrap:'wrap' },
    linkButton: { padding:'10px 15px', borderRadius:'8px', color:'#fff', fontWeight:'600', textDecoration:'none', display:'flex', alignItems:'center', gap:'6px', transition:'all 0.2s ease', boxShadow:'0 2px 6px rgba(0,0,0,0.15)' }
  };

  if (!isLoggedIn) return <div style={styles.wrapper}>Please login to view your profile.</div>;
  if (loading) return <div style={styles.wrapper}>Loading profile...</div>;

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>My Profile</h1>
          {editing ? (
            <div style={{ display:'flex', gap:'10px' }}>
              <button style={{ ...styles.button, ...styles.cancelButton }} onClick={() => setEditing(false)}>
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </button>
              <button style={{ ...styles.button, ...styles.saveButton }} onClick={handleSave} disabled={saving}>
                <FontAwesomeIcon icon={faSave} /> {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          ) : (
            <button style={{ ...styles.button, ...styles.editButton }} onClick={() => setEditing(true)}>
              <FontAwesomeIcon icon={faEdit} /> Edit Profile
            </button>
          )}
        </div>

        {/* Grid */}
        <div style={styles.grid}>
          {/* Sidebar */}
          <div style={styles.sidebar}>
          {profile.profile_image ? 
  <img 
    src={
      editing && editForm.profile_image instanceof File 
        ? URL.createObjectURL(editForm.profile_image) 
        : `${import.meta.env.VITE_BACKEND_URL}${profile.profile_image}`
    } 
    alt={profile.username} 
    style={styles.avatar} 
  /> : 
  <div style={{...styles.avatar, background:'#1D4ED8', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'36px'}}>
    {profile.username.charAt(0)}
  </div>
}

            {editing && <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop:'10px', width:'100%' }} />}
            <div style={styles.name}>{profile.username}</div>
            <div style={styles.role}>{profile.role}</div>
            <div style={styles.status}>
              {profile.is_approved ? 
                <><FontAwesomeIcon icon={faCheckCircle} style={{color:'#10B981'}} /> Approved by Admin</> : 
                <><FontAwesomeIcon icon={faClock} style={{color:'#F59E0B'}} /> Pending Approval</>
              }
            </div>
            <div style={styles.status}>Profile Completed: {profile.profile_completed ? '✅' : '❌'}</div>
            <div style={styles.badges}>
              {profile.badges?.map((b, idx) => <span key={idx} style={styles.badge}><FontAwesomeIcon icon={faTrophy} /> {b}</span>)}
            </div>
          </div>

          {/* Main */}
          <div style={styles.main}>
            <div style={styles.section}>
              <div style={styles.sectionTitle}><FontAwesomeIcon icon={faUser} /> Personal Info</div>
              {editing ? (
                <>
                  {["email","username","school","specialization","batch_year","bio","linkedin_url","github_url","portfolio_url","role"].map(f => (
                    <input
                      key={f}
                      style={styles.input}
                      value={editForm[f] || ''}
                      onChange={e => handleInputChange(f, e.target.value)}
                      placeholder={f.charAt(0).toUpperCase() + f.slice(1).replace('_',' ')}
                    />
                  ))}
                </>
              ) : (
                <>
                <div style={styles.field}><strong>Full Name: </strong>{profile.first_name} {profile.last_name}</div>
                {/* <div style={styles.field}><strong>Last Name: </strong>{profile.last_name}</div>
                <div style={styles.field}><strong>Email: </strong>{profile.email}</div> */}

                  <div style={styles.field}><strong>Email: </strong>{profile.email}</div>
                  <div style={styles.field}><strong>School: </strong>{profile.school} - {profile.specialization}</div>
                  <div style={styles.field}><strong>Batch Year: </strong>{profile.batch_year}</div>
                  <div style={styles.field}><strong>Bio: </strong>{profile.bio}</div>
                  <div style={styles.field}><strong>Joined: </strong>{formatDate(profile.date_joined)}</div>
                  <div style={styles.memberSince}><strong>Member Since: </strong>{memberSince(profile.date_joined)}</div>
                  <div style={styles.linkButtons}>
                    {profile.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noreferrer" style={{...styles.linkButton, background:'#0A66C2'}}><FontAwesomeIcon icon={faLinkedinIn} /> LinkedIn</a>}
                    {profile.github_url && <a href={profile.github_url} target="_blank" rel="noreferrer" style={{...styles.linkButton, background:'#171515'}}><FontAwesomeIcon icon={faGithub} /> GitHub</a>}
                    {profile.portfolio_url && <a href={profile.portfolio_url} target="_blank" rel="noreferrer" style={{...styles.linkButton, background:'#6B21A8'}}><FontAwesomeIcon icon={faUser} /> Portfolio</a>}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {toast.show && <motion.div initial={{ opacity:0, x:50 }} animate={{ opacity:1, x:0 }} style={{...styles.toast, background: toast.type==='success' ? '#10B981' : '#EF4444'}}>{toast.message}</motion.div>}
    </div>
  );
};

export default Profile;
