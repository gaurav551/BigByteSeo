using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using BigByteSeo.Models;
using BigByteSeo.Services;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;

namespace BigByteSeo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HrefController : Controller
    {
        private readonly HrefService hrefService;
        public HrefController(HrefService hrefService)
        {
            this.hrefService = hrefService;

        }
        [Route("getlinks")]

        [HttpPost]
        public async Task<IActionResult> Get([FromForm] InputModel m)
        {

            List<GuestPostResult> res = new();

            //System.Console.WriteLine(m.TextAreaInput);
            string[] urls = m.TextAreaInput.Split('\n').Take(20).ToArray();
            foreach (var x in urls)
            {
               
                if (!string.IsNullOrEmpty(x))
                {
                     try{
                       var uriWithHost = x.GetHost();
                        var result = await hrefService.GetLinks(uriWithHost);
                        var guestPost = result.FirstOrDefault(x => x.IsGuestPostAvailble);
                        if (guestPost != null)
                        {
                            System.Console.WriteLine("Yes on " + guestPost.Href);
                            res.Add(new GuestPostResult() { Url = guestPost.Href, Host = uriWithHost, IsAvailable = true });
                        }
                        else
                        {
                            res.Add(new GuestPostResult() { Url = x, Host = uriWithHost, IsAvailable = false });

                        }
                
                }
                catch(Exception )
                {
                  res.Add(new GuestPostResult() { Url = x, Host = "ERROR", IsAvailable = false });

                }
                }
            }
             return Json(res);
        }

    
    [Route("findimagelink")]
    public async Task<IActionResult> FindImageLine(string word)
    {
        var dynamic = new List<dynamic>();
        string url = "https://www.bing.com/images/search?q=" + word;

        HtmlDocument doc = new HtmlDocument();
        var response = await GetResponse(url);

        System.Console.WriteLine(response.Substring(0, 100));
        doc.LoadHtml(response);
        //var linkTags = doc.DocumentNode.Descendants("link");
        var linkedPages = doc.DocumentNode.Descendants("a");
        // .Select(a => a.GetAttributeValue("href", null))

        foreach (var x in linkedPages)
        {
            //System.Console.WriteLine(x.Name);


            var href = x.GetAttributeValue("href", null);
            var title = x.GetAttributeValue("title", null);
            if (title != null && href != null && href.StartsWith("http"))
            {
                dynamic.Add(new { title = title, href = href });

            }
        }
        return dynamic;
    }
    private static async Task<string> GetResponse(string url)
    {
        var _HttpClient = new HttpClient();
        var res = await _HttpClient.GetStringAsync(url);
        return res;
    }

}
}