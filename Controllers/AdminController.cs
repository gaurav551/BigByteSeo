using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BigByteSeo.Controllers
{
    public class AdminController:Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}