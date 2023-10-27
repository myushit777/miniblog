document.addEventListener("DOMContentLoaded", function () {
    // Funktion zum Abrufen von Blog-Einträgen mit GET-Anfrage
    function fetchBlogEntries() {
        fetch('/') // Endpoint
            .then(response => response.json())
            .then(entries => {
                const blogEntriesContainer = document.getElementById('blog-entries');

                // Container leeren :)
                blogEntriesContainer.innerHTML = '';

                //durchlaufen der Blog-Einträge und füge Container ein
                entries.forEach(entry => {
                    const entryElement = document.createElement('div');
                    entryElement.className = 'blog-entry';
                    entryElement.innerHTML = `
                        <h3>${entry.title}</h3>
                        <p>Autor: ${entry.author}</p>
                        <p>Datum: ${new Date(entry.date).toDateString()}</p>
                        <p>${entry.content}</p>
                    `;
                    blogEntriesContainer.appendChild(entryElement);
                });
            })
            .catch(error => console.error("Fehler beim Laden der Blog-Einträge: " + error));
    }

    // Event-Handler für das Formular zum Erstellen eines neuen Blog-Eintrags ;)
    const createEntryForm = document.getElementById('create-entry-form');
    createEntryForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Daten aus dem Formular sammeln
        const author = document.getElementById('author').value;
        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const content = document.getElementById('content').value;

        // AJAX POST-Anfrage an den Server, um einen neuen Blog-Eintrag zu erstellen
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: author,
                title: title,
                date: date,
                content: content
            })
        })
        .then(response => {
            if (response.ok) {
                // Eintrag erfolgreich erstellt, also aktualisieren Sie die Liste der Einträge
                fetchBlogEntries();
            } else {
                console.error("Fehler beim Erstellen des Blog-Eintrags: " + response.statusText);
            }
        })
        .catch(error => console.error("Fehler beim Erstellen des Blog-Eintrags: " + error));
    });

    // Rufen Sie die Blog-Einträge auf, wenn die Seite geladen wird
    fetchBlogEntries();
});
