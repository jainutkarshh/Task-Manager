import { useState } from 'react';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    status: task.status
  });

  const statusColors = {
    pending: '#f39c12',
    in_progress: '#3498db',
    completed: '#27ae60'
  };

  const handleSave = () => {
    onUpdate(task.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description || '',
      status: task.status
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div style={styles.card}>
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          style={styles.input}
          placeholder="Task title"
        />
        <textarea
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          style={styles.textarea}
          placeholder="Description (optional)"
        />
        <select
          value={editData.status}
          onChange={(e) => setEditData({ ...editData, status: e.target.value })}
          style={styles.select}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <div style={styles.buttonGroup}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
          <button onClick={handleCancel} style={styles.cancelBtn}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{task.title}</h3>
        <span style={{
          ...styles.status,
          backgroundColor: statusColors[task.status]
        }}>
          {task.status.replace('_', ' ')}
        </span>
      </div>
      {task.description && (
        <p style={styles.description}>{task.description}</p>
      )}
      <div style={styles.meta}>
        <span style={styles.date}>
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </span>
        {task.user && (
          <span style={styles.owner}>By: {task.user.name}</span>
        )}
      </div>
      <div style={styles.buttonGroup}>
        <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} style={styles.deleteBtn}>
          Delete
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.5rem'
  },
  title: {
    margin: 0,
    fontSize: '1.1rem',
    color: '#2c3e50'
  },
  status: {
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  description: {
    color: '#7f8c8d',
    fontSize: '0.9rem',
    marginBottom: '0.75rem'
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    color: '#95a5a6',
    marginBottom: '1rem'
  },
  date: {},
  owner: {},
  buttonGroup: {
    display: 'flex',
    gap: '0.5rem'
  },
  editBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  deleteBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  saveBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  cancelBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '0.9rem',
    minHeight: '60px',
    resize: 'vertical',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '0.9rem',
    boxSizing: 'border-box'
  }
};

export default TaskCard;
