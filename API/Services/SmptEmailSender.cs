using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using API.Interfaces;
namespace API.Services;

public class SmtpEmailSender : IEmailSender
{
    private readonly IConfiguration _config;

    public SmtpEmailSender(IConfiguration config)
    {
        _config = config;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        var smtpClient = new SmtpClient(_config["Email:SmtpHost"])
        {
            Port = int.Parse(_config["Email:SmtpPort"]),
            Credentials = new NetworkCredential(
                _config["Email:Username"],
                _config["Email:Password"]),
            EnableSsl = true
        };

        var mail = new MailMessage
        {
            From = new MailAddress(_config["Email:From"]),
            Subject = subject,
            Body = body,
            IsBodyHtml = true
        };
        mail.To.Add(toEmail);

        await smtpClient.SendMailAsync(mail);
    }
}
