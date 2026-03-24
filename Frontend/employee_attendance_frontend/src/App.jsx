import { useState } from 'react'
import './index.css'

//  message box component
const MessageModal = ({ message, onClose, type = 'info' }) => {
    if (!message) return null;
    const isSuccess = type === 'success';
    const isError = type === 'error';
    
    return (
        <div style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', 
            backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', zIndex: 100, padding: '1rem'
        }}>
            <div style={{
                background: isSuccess ? 'linear-gradient(135deg, #065f46, #064e3b)' : isError ? 'linear-gradient(135deg, #991b1b, #7f1d1d)' : '#1e293b',
                padding: '2rem', borderRadius: '1.5rem', maxWidth: '400px', width: '100%',
                border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{isSuccess ? '✅' : isError ? '❌' : 'ℹ️'}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem', color: 'white' }}>
                    {isSuccess ? 'Success!' : isError ? 'Error Occurred' : 'Notification'}
                </h3>
                <p style={{ marginBottom: '2rem', color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>{message}</p>
                <button 
                    onClick={onClose} 
                    style={{
                        padding: '0.75rem 2rem', borderRadius: '1rem', border: 'none', 
                        background: 'white', color: 'black', fontWeight: 900, 
                        cursor: 'pointer', fontSize: '1rem', width: '100%'
                    }}
                >
                    GOT IT
                </button>
            </div>
        </div>
    );
};

function App() {
    const [employeeData, setEmployeeData] = useState({
        id: '',
        name: '',
        date: new Date().toISOString().slice(0, 10),
        arrivalTime: null,
        leaveTime: null,
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('info');

    const showMessage = (msg, type = 'info') => {
        setMessage(msg);
        setMessageType(type);
    };

    const handleChange = (e) => {
        setEmployeeData({
            ...employeeData,
            [e.target.name]: e.target.value,
        });
    };

    const getCurrentTime = () => {
        const now = new Date();
        return now.toTimeString().split(' ')[0]; 
    };

    const handlePunch = async (type) => {
        if (!employeeData.id || !employeeData.name) {
            showMessage('Please enter Employee ID and Name.', 'error');
            return;
        }

        
        if (type === 'OUT' && !employeeData.arrivalTime) {
            
             showMessage('You cannot Punch Out without a Punch In record for today.', 'error');
             return;
        }

        const currentTime = getCurrentTime();
        let payload = { ...employeeData };

        if (type === 'IN') {
            payload.arrivalTime = currentTime;
            payload.leaveTime = null;
        } else if (type === 'OUT') {
            payload.leaveTime = currentTime;
        }

        try {
            const response = await fetch('http://localhost:8080/attendance/punch', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                showMessage(`Successfully Punched ${type} at ${currentTime}!`, 'success');
                setEmployeeData(prev => ({
                    ...prev,
                    arrivalTime: type === 'IN' ? currentTime : prev.arrivalTime,
                    leaveTime: type === 'OUT' ? currentTime : null,
                }));
            } else {
                showMessage(`Server Error: ${response.status}`, 'error');
            }
        } catch (error) {
            showMessage('Network Error: Make sure backend is running.', 'error');
        }
    };

    return (
        <div className="app-container">
            <div className="kiosk-card">
                <h1 className="kiosk-title">Employee Attendance Kiosk</h1>
                
                <div className="form-grid">
                    <div className="input-group">
                        <label className="input-label">Employee ID</label>
                        <input
                            type="number"
                            name="id"
                            value={employeeData.id}
                            onChange={handleChange}
                            placeholder="0001"
                            className="kiosk-input"
                            required
                        />
                    </div>
                    
                    <div className="input-group">
                        <label className="input-label">Employee Name</label>
                        <input
                            type="text"
                            name="name"
                            value={employeeData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="kiosk-input"
                            required
                        />
                    </div>
                </div>
                
                <div className="date-badge">
                  <span className="input-label">Date:</span>
                  <strong>{employeeData.date}</strong>
                </div>

                <div className="button-grid">
                    <button onClick={() => handlePunch('IN')} className="punch-btn btn-in">
                        <span>⏰</span> <span>Punch In</span>
                    </button>
                    <button onClick={() => handlePunch('OUT')} className="punch-btn btn-out">
                        <span>🚪</span> <span>Punch Out</span>
                    </button>
                </div>
            </div>

            <MessageModal 
                message={message} 
                type={messageType} 
                onClose={() => setMessage('')} 
            />
        </div>
    );
}

export default App