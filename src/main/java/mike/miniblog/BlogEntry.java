package mike.miniblog;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BlogEntry {
    private String author;
    private String title;
    private LocalDate date;
    private String content;

    // Konstruktor
    public BlogEntry(String author, String title,LocalDate date,String content) {
        this.author = author;
        this.title = title;
        this.date = date;
        this.content = content;
    }
}
