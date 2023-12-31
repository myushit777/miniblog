package mike.miniblog;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class BlogService {

    private List<BlogEntry> blogEntries = new ArrayList<>();

    public BlogService() {
        // Fügen einige Mock-Daten hinzu (3 Einträge)
        blogEntries.add(new BlogEntry("Mike", "Ich habe scharf gegessen",
                LocalDate.now(), "Mir hat der Po gebrannt"));
        blogEntries.add(new BlogEntry("Unbekannt", "Warum Nasenspray süchtig macht",
                LocalDate.now(), "Das ist nur ein Schnupfen"));
        blogEntries.add(new BlogEntry("Rudolf", "Warum Weihnachten geil ist",
                LocalDate.now(), "weils so ist"));
    }

    // Methode zum Abrufen aller Blog-Einträge
    public List<BlogEntry> getAllBlogEntries() {
        return blogEntries;
    }

    // Methode zum Erstellen eines neuen Blog-Eintrags
    public BlogEntry createBlogEntry(BlogEntry entry) {
        blogEntries.add(entry);
        return entry; // Gebe den erstellten Eintrag zurück
    }
}
