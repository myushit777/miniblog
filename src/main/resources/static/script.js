// Warten, bis der DOM-Inhalt vollständig geladen ist, bevor das Skript ausgeführt wird
document.addEventListener("DOMContentLoaded", function () {
    // Funktion zum Abrufen von Blog-Einträgen vom Server
    function fetchBlogEntries() {
        // Einen GET-Request an den Server-Endpunkt '/' senden
        fetch('/')
            .then(response => response.json())
            .then(entries => {
                // Das Container-Element für die Anzeige von Blog-Einträgen abrufen
                const blogEntriesContainer = document.getElementById('blog-entries');
                // Den vorhandenen Inhalt im Container löschen
                blogEntriesContainer.innerHTML = '';

                // Durch jeden Blog-Eintrag iterieren und HTML-Elemente erstellen, um sie anzuzeigen
                entries.forEach(entry => {
                    const entryElement = document.createElement('div');
                    entryElement.className = 'blog-entry';
                    entryElement.innerHTML = `
                        <h3>${entry.title}</h3>
                        <p>Autor: ${entry.author}</p>
                        <p>Datum: ${new Date(entry.date).toDateString()}</p>
                        <p>${entry.content}</p>
                    `;
                    // Das erstellte Eintrags-Element dem Container hinzufügen
                    blogEntriesContainer.appendChild(entryElement);
                });
            })
            .catch(error => console.error("Fehler beim Laden der Blog-Einträge: " + error));
    }

    // Das Formular zum Erstellen neuer Blog-Einträge abrufen
    const createEntryForm = document.getElementById('create-entry-form');
    // Einen Event-Listener für das Absenden des Formulars hinzufügen
    createEntryForm.addEventListener('submit', function (event) {
        // Das standardmäßige Formular-Absende-Verhalten verhindern
        event.preventDefault();

        // Eingabewerte aus dem Formular sammeln
        const author = document.getElementById('author').value;
        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const content = document.getElementById('content').value;

        // Einen POST-Request an den Server senden, um einen neuen Blog-Eintrag zu erstellen
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Die Eingabedaten in JSON konvertieren und sie im Anfrage-Body einschließen
            body: JSON.stringify({
                author: author,
                title: title,
                date: date,
                content: content
            })
        })
        .then(response => {
            // Wenn die Anfrage erfolgreich ist, aktualisiere und zeige die aktualisierten Blog-Einträge an
            if (response.ok) {
                fetchBlogEntries();
            } else {
                // Wenn ein Fehler auftritt, protokolliere eine Fehlermeldung
                console.error("Fehler beim Erstellen des Blog-Eintrags: " + response.statusText);
            }
        })
        .catch(error => console.error("Fehler beim Erstellen des Blog-Eintrags: " + error));
    });

    // Blog-Einträge abrufen und anzeigen, wenn die Seite geladen wird
    fetchBlogEntries();
});
