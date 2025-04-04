using System.Collections.Generic;
using System.Linq;
using BigByteSeo.Models;

namespace BigByteSeo.Services
{
    public class CheckLinksForGuestPosting
    {
        public bool CheckLinks(string text, string href)
        {


        var gPostLinks = new List<string>(){
        "Submit Post",
        "Guest Post",
"Submit an Article",
"Want to Write for",
"Submit News",
"Submit Tutorial",
"Suggest a Post",
"Become an Author",
"Become a Contributor",
"Be a Contributor",
"Become Contributor",
"Publish Your News",
"Guest Contributor",
"Add Article",
"Submit Article",
"Write for Us",
"Guest Article",
"Community News",
"Submit Blog Post",
"Contribute to our Site",
"Guest Writer",
"Guest Author",
"Become Contributor",
"Sponsored Post",
"Sponsored Article",
"contributed post",
"contributed article",
"guest blog",
"offer your link",
"contributing writer",
"guest column",
"submit post",
"submit content",
"submit your content",
"contributor guidelines"
            };



            if (href != null && gPostLinks.Any(x => href.ToLower().Replace("-", " ").Contains(x.ToLower()) || text != null
               && gPostLinks.Any(x => text.ToLower().Contains(x.ToLower()))))
            {
                return true;
            }



            return false;
        }
    }

}