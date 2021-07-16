using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using BigByteSeo.Models;

namespace BigByteSeo.Services
{
    public class HrefService
    {
        public async Task<List<LinkItem>> GetLinks(string url)
        {
            List<LinkItem> linkItems = new();
          
            HttpClient w = new HttpClient();
            string s = await w.GetStringAsync(url);
            return Find(s,url);
        }
        public static List<LinkItem> Find(string htmlContent, string url)
        {
            List<LinkItem> list = new List<LinkItem>();

            // 1.
            // Find all matches in file.
            MatchCollection m1 = Regex.Matches(htmlContent, @"(<a.*?>.*?</a>)",
                RegexOptions.Singleline);

            // 2.
            // Loop over each match.
            foreach (Match m in m1)
            {
                string value = m.Groups[1].Value;
                LinkItem i = new LinkItem(url);

                // 3.
                // Get href attribute.
                Match m2 = Regex.Match(value, @"href=\""(.*?)\""",
                    RegexOptions.Singleline);
                if (m2.Success)
                {
                    i.Href = m2.Groups[1].Value;
                }

                // 4.
                // Remove inner tags from text.
                string t = Regex.Replace(value, @"\s*<.*?>\s*", "",
                    RegexOptions.Singleline);
                i.Text = t;
                

                list.Add(i);
            }
            return list;
        }
    }
    



}
