using System;
using Microsoft.AspNetCore.Http;

namespace BigByteSeo.Models
{
    public class InputModel{
        public string TextAreaInput { get; set; }
        public IFormFile FileInput { get; set; }
    }
}