using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BigByteSeo.Controllers
{
    public class UserController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ILogger<UserController> _logger;
        [BindProperty]
        public InputModel Input { get; set; }

        public UserController(SignInManager<IdentityUser> signInManager,
            UserManager<IdentityUser> userManager,
            ILogger<UserController> logger)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _logger = logger;
        }
        public class InputModel
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            [DataType(DataType.Password)]
            public string Password { get; set; }

            [Display(Name = "Remember me?")]
            public bool RememberMe { get; set; }
        }
        [HttpGet]
        public IActionResult Login()
        {
            if (_signInManager.IsSignedIn(User))
            {
                return RedirectToAction("Index", "Admin");
            }
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Login(InputModel model)
        {
            try
            {
                var findUser = await _userManager.FindByEmailAsync("dipendragiri2001@gmail.com");
                if (findUser == null)
                {
                    var user = new IdentityUser { UserName = "dipendragiri2001", Email = "dipendragiri2001@gmail.com" };
                    var result = await _userManager.CreateAsync(user, "p@$$w0Rd");
                }

                if (ModelState.IsValid)
                {
                    // This doesn't count login failures towards account lockout
                    // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                    var user = _userManager.FindByEmailAsync(model.Email).Result;
                    user.EmailConfirmed = true;
                    var result = await _signInManager.PasswordSignInAsync(user.UserName, model.Password, model.RememberMe, false);
                    if (result.Succeeded)
                    {
                        _logger.LogInformation("User logged in.");
                        return RedirectToAction("Index", "Admin");
                    }

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return NotFound();
        }
    }
}