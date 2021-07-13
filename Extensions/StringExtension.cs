using System;
using System.Text.RegularExpressions;

namespace BigByteSeo.Services
{
    public static class StringExtensions
    {
        public static string GetHost(this string str)
        {
           // string prot = "http";
            if(!str.StartsWith("http"))
            {
                str = "http://"+str;
            }
            Uri myUri = new Uri(str);   
            string host = myUri.Host;
            return "http://"+ host;

            
        }
        public static string StripHTML(string input)
{
   return Regex.Replace(input, "<.*?>", String.Empty);
}
public static int CountWords(string test)
{
    int count = 0;
    bool wasInWord = false;
    bool inWord = false;

    for (int i = 0; i < test.Length; i++)
    {
        if (inWord)
        {
            wasInWord = true;
        }

        if (Char.IsWhiteSpace(test[i]))
        {
            if (wasInWord)
            {
                count++;
                wasInWord = false;
            }
            inWord = false;
        }
        else
        {
            inWord = true;
        }
    }

    // Check to see if we got out with seeing a word
    if (wasInWord)
    {
        count++;
    }

    return count;
}
        
    }
}