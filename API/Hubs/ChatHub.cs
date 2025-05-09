using API.Data;
using API.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.Hubs;

public class ChatHub : Hub
{
    private readonly ApplicationDBContext _db;

    public ChatHub(ApplicationDBContext dBContext)
    {
        _db = dBContext;
    }

    public async Task JoinChat(UserConnection userConnection)
    {
        await Clients.All.SendAsync("ReceivedMessage", $"{userConnection.EventName} chat has started", "Welcome!");
    }

    public async Task LeaveChat(UserConnection userConnection)
    {
        try
        {
            UserConnection existingConnections = await _db.UserConnections.FirstOrDefaultAsync(u => u.EventName == userConnection.EventName && u.UserName == userConnection.UserName);
            await Clients.Group(userConnection.EventName).SendAsync("ReceivedMessage", "admin", $"{userConnection.UserName} has left the chat");
            if (existingConnections != null)
            {
                _db.Remove(existingConnections);
                await _db.SaveChangesAsync();
            }
            Console.WriteLine("User was not in this chat group");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }

    public async Task JoinSpecificEventChat(UserConnection userConnection)
    {
        try
        {
            Console.WriteLine($"Attempting to join chat for user: {userConnection.UserName}, Event: {userConnection.EventName}");

            var existingConnection = await _db.UserConnections
                .FirstOrDefaultAsync(uc => uc.EventName == userConnection.EventName && uc.UserName == userConnection.UserName);

            if (existingConnection == null)
            {
                userConnection.ConnectionId = Context.ConnectionId;
                await _db.UserConnections.AddAsync(userConnection);
                await _db.SaveChangesAsync();
                Console.WriteLine("User connection added to shared DB");
            }
            else
            {
                Console.WriteLine("User connection already exists in DB");
                existingConnection.ConnectionId = Context.ConnectionId;
                await _db.SaveChangesAsync();
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.EventName);
            Console.WriteLine($"User added to SignalR group: {userConnection.EventName}");

            await Clients.Group(userConnection.EventName).SendAsync("ReceivedMessage", "admin", $"{userConnection.UserName} has joined {userConnection.EventName}");
            Console.WriteLine("Join message sent to group");
        }
        catch (DbUpdateException dbEx)
        {
            Console.Error.WriteLine($"Database error in JoinSpecificEventChat: {dbEx.Message}");
            await Clients.Caller.SendAsync("ErrorMessage", "An error occurred while updating the database");
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error in JoinSpecificEventChat: {ex.Message}");
            await Clients.Caller.SendAsync("ErrorMessage", "An error occurred while joining the event chat");
        }
    }

    public async Task SendMessage(UserConnection userConnection, string message)
    {
        try
        {
            var existingConnection = await _db.UserConnections
                .FirstOrDefaultAsync(u => u.EventName == userConnection.EventName && u.UserName == userConnection.UserName);

            if (existingConnection != null)
            {
                if (existingConnection.ConnectionId != Context.ConnectionId)
                {
                    
                    existingConnection.ConnectionId = Context.ConnectionId;
                    await _db.SaveChangesAsync();
                }

                await Clients.Group(userConnection.EventName).SendAsync("ReceivedMessage", userConnection.UserName, message);
                Console.WriteLine($"Message sent in event chat {userConnection.EventName} by user {userConnection.UserName}");
            }
            else
            {
                Console.WriteLine($"User {userConnection.UserName} not found in event chat {userConnection.EventName}. Attempting to rejoin.");
                await JoinSpecificEventChat(userConnection);
                await Clients.Group(userConnection.EventName).SendAsync("ReceivedMessage", userConnection.UserName, message);
            }
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error in SendMessage: {ex.Message}");
            await Clients.Caller.SendAsync("ErrorMessage", "An error occurred while sending the message. Please try rejoining the chat.");
        }
    }
}
