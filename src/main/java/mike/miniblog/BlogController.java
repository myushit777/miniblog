package mike.miniblog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class BlogController {

    private final BlogService blogService; // BlogService für Geschäftslogik :)

    @Autowired
    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    // HTTP GET-Endpunkt -> zum Abrufen von Blog-Einträgen
    @GetMapping
    public List<BlogEntry> getBlogEntries() {
        return blogService.getAllBlogEntries();
    }

    // HTTP POST-Endpunkt -> zum Erstellen eines neuen Blog-Eintrags
    @PostMapping
    public BlogEntry createBlogEntry(@RequestBody BlogEntry entry) {
        return blogService.createBlogEntry(entry);
    }
}
