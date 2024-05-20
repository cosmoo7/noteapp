
window.addEventListener('scroll', function () {
    let body = this.document.querySelector('body')
    if (this.window.scrollY > 70) {
        body.classList.add('scrolled')
    }
    else {
        body.classList.remove('scrolled')
    }
})
let notes = JSON.parse(localStorage.getItem('notes')) || [];

function renderNotes() {
    const notesHTML = notes.map((note, index) => {
        return `
            <div class="note" ondblclick="editNote(${index})">
                <div class="buttons">
                    <button class="delete" onclick="deleteNote(${index})">Delete</button>
                    <button class="edit" onclick="editNote(${index})">Edit</button>
                    </div>
                    <figure class="tag-wrapper"></figure>
                <div class="note-wrapper">
                    <h2 class="title">${note.title}</h2>
                    <pre class="content">${note.content}</pre>
                </div>
            </div>
        `;
    }).join('');
    document.getElementById("notes").innerHTML = notesHTML;
}
function addNote() {
    const modal = document.getElementById('note-modal');
    modal.showModal();
    document.getElementById('save-note-button').onclick = () => {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        if (title !== '' && content !== '') {
            notes.push({ title, content });
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes();
            modal.close();
        }
    };
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}
function editNote(index) {
    const modal = document.getElementById('note-modal');
    modal.showModal();
    document.getElementById('title').value = notes[index].title;
    document.getElementById('content').value = notes[index].content;
    document.getElementById('save-note-button').onclick = () => {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        if (title !== '' && content !== '') {
            notes[index].title = title;
            notes[index].content = content;
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes();
            title = "";
            content = "";
            modal.close();
        }
    };
}
renderNotes();
function DeleteAllNotes() {
    localStorage.removeItem('notes');
    location.reload();
}
