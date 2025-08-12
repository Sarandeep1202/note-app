// Array to store all notes
let notes = [];

// Function to add a new note
function addNote() {
    // Get input values
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();
    
    // Check if both title and content are provided
    if (title === '' || content === '') {
        alert('Please fill in both title and content!');
        return;
    }

    // Create new note object
    const newNote = {
        id: Date.now(), // Simple ID using timestamp
        title: title,
        content: content,
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    };

    // Add note to array
    notes.push(newNote);
    
    // Clear the form
    clearForm();
    
    // Update the display
    displayNotes();
    
    // Save to localStorage
    saveNotes();
}

// Function to delete a note
function deleteNote(id) {
    if (confirm('Are you sure you want to delete this note?')) {
        // Remove note from array
        notes = notes.filter(note => note.id !== id);
        
        // Update display
        displayNotes();
        
        // Save changes
        saveNotes();
    }
}

// Function to clear the form
function clearForm() {
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    document.getElementById('noteTitle').focus();
}

// Function to display all notes
function displayNotes() {
    const notesList = document.getElementById('notesList');
    
    // If no notes, show empty message
    if (notes.length === 0) {
        notesList.innerHTML = '<div class="empty-message">No notes yet. Add your first note above!</div>';
        return;
    }

    // Build HTML for all notes
    let html = '';
    notes.forEach(note => {
        html += `
            <div class="note-item">
                <div class="note-title">${note.title}</div>
                <div class="note-content">${note.content.replace(/\n/g, '<br>')}</div>
                <div class="note-date">Created: ${note.date}</div>
                <button onclick="deleteNote(${note.id})" class="btn delete">Delete</button>
            </div>
        `;
    });
    
    notesList.innerHTML = html;
}

// Function to save notes to localStorage
function saveNotes() {
    localStorage.setItem('simpleNotes', JSON.stringify(notes));
}

// Function to load notes from localStorage
function loadNotes() {
    const saved = localStorage.getItem('simpleNotes');
    if (saved) {
        notes = JSON.parse(saved);
        displayNotes();
    }
}

// Load notes when page loads
window.onload = function() {
    loadNotes();
    document.getElementById('noteTitle').focus();
};

// Allow Enter key to submit (optional enhancement)
document.getElementById('noteTitle').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('noteContent').focus();
    }
});
