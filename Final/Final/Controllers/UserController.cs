using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace AngularApplication.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private SignInManager<ApplicationUser> signInManager;
        private UserManager<ApplicationUser> userManager;

        public UserController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody]LoginViewModel loginViewModel)
        {
            var result = signInManager.PasswordSignInAsync(loginViewModel.Email, loginViewModel.Password, true, false).GetAwaiter().GetResult();

            if (!result.Succeeded)
            {
                return StatusCode(401);
            }

            var user = await this.userManager.FindByEmailAsync(loginViewModel.Email);
            return Ok(CreateToken(user));
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel registerViewModel)
        {
            ApplicationUser newUser = new ApplicationUser()
            {
                Email = registerViewModel.Email,
                UserName = registerViewModel.Email
            };
            var result = await userManager.CreateAsync(newUser, registerViewModel.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await signInManager.SignInAsync(newUser, isPersistent: false);
            return Ok(CreateToken(newUser));
        }

        string CreateToken(IdentityUser user)
        {
            var claims = new Claim[]
{
                new Claim(JwtRegisteredClaimNames.Sub, user.Id)
};

            SymmetricSecurityKey signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secretcodeneedstobelonger"));
            SigningCredentials cred = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(signingCredentials: cred, claims: claims);
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            return encodedJwt;
        }
    }
}
