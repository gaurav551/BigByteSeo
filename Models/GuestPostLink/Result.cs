using System;
using Microsoft.AspNetCore.Http;

namespace BigByteSeo.Models
{
    public class GuestPostResult{
        public string Url { get; set; }
        public string Host { get; set; }
        public bool IsAvailable { get; set; }
        
    }
}