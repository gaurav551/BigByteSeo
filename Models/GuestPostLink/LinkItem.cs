using System;
using BigByteSeo.Services;

namespace BigByteSeo.Models
{
 public class LinkItem
    {
        private string url;
        public LinkItem(string url)
        {
             this.url = url;
             //System.Console.WriteLine(url);
        }
        private string href;
        private string FormattedHref()
        {
            try{
            if(!href.StartsWith("http"))
            {
                  return url+href;
            }
            else
            {
                return href;
            }
            }
            catch(Exception)
            {
                return "Something Went Wrong";
            }
        }
        
        public string Href {get {
            return FormattedHref();
            } 
            set{href=value;} }
        public string Text {get;set;}

        private bool Check()
        {
           CheckLinksForGuestPosting c = new();
          return c.CheckLinks(Text,Href);  
        }
        public bool IsGuestPostAvailble {get {return Check();}} 
        public string Url { get {return url;} set{url = value;} }

        
    }
}