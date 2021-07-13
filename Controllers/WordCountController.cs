using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using BigByteSeo.Services;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;

namespace BigByteSeo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WordCountController : Controller
    {
        [HttpGet]
        public async Task<IActionResult> Count(string url)
        {
            string content;
          
            using(HttpClient httpClient = new HttpClient())
            {
                var response = await httpClient.GetAsync(url);
                 content = await response.Content.ReadAsStringAsync();
            }
            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(content);
            var xpath = "//*[self::h1 or self::h2 or self::h3 or self::h4 or self::p or self::span or self::a]";

           var da = htmlDoc.DocumentNode.SelectNodes(xpath).Select(x=> StringExtensions.StripHTML(x.InnerHtml));
           var result = string.Join("",da);
            System.Console.WriteLine(StringExtensions.CountWords(result));
            return Json(result);
        }
        
    }
}