package mike.miniblog;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class BlogController {

    private final BlogService blogService; // BlogService für Geschäftslogik :)

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    // HTTP GET-Endpunkt -> zum Abrufen von Blog-Einträgen
    @GetMapping("/")
    @ResponseBody
    public List<BlogEntry> getBlogEntries() {
        return blogService.getAllBlogEntries();
    }

    // HTTP POST-Endpunkt -> zum Erstellen eines neuen Blog-Eintrags
    @PostMapping("/")
    @ResponseBody
    public BlogEntry createBlogEntry(@RequestBody BlogEntry entry) {
        return blogService.createBlogEntry(entry);
    }
}
