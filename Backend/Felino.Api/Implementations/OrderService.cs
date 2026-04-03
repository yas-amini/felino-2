using Felino.Api.Data;
using Felino.Api.Domain.Entities;
using Felino.Api.Domain.Enums;
using Felino.Api.DTOs.Orders;
using Felino.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Felino.Api.Implementations
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;

        public OrderService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<OrderDto> CreateOrderAsync(CreateOrderDto dto)
        {
            var order = new Order
            {
                CustomerName = dto.CustomerName,
                CustomerAddress = dto.CustomerAddress,
                CustomerPhone = dto.CustomerPhone,
                CustomerEmail = dto.CustomerEmail,
                Comment = dto.Comment,
                Status = OrderStatus.New,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            decimal total = 0;
            foreach (var item in dto.Items)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                if (product == null) throw new ArgumentException($"Product {item.ProductId} not found.");

                var orderItem = new OrderItem
                {
                    ProductId = product.Id,
                    ProductName = product.Name,
                    Price = product.Price,
                    Quantity = item.Quantity,
                    Extras = item.Extras
                };
                order.OrderItems.Add(orderItem);
                total += (product.Price * item.Quantity);
            }

            order.Total = total;
            order.Subtotal = total; // Simplified for this example

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return MapToDto(order);
        }

        public async Task<OrderDto?> GetOrderByIdAsync(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == id);

            return order == null ? null : MapToDto(order);
        }

        public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync()
        {
            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                .ToListAsync();

            return orders.Select(MapToDto);
        }

        public async Task<bool> UpdateOrderStatusAsync(int id, string status)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return false;

            if (Enum.TryParse<OrderStatus>(status, true, out var orderStatus))
            {
                order.Status = orderStatus;
                order.UpdatedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> DeleteOrderAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return false;

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return true;
        }

        private static OrderDto MapToDto(Order order)
        {
            return new OrderDto
            {
                Id = order.Id,
                CustomerName = order.CustomerName,
                CustomerAddress = order.CustomerAddress,
                CustomerPhone = order.CustomerPhone,
                CustomerEmail = order.CustomerEmail,
                Comment = order.Comment,
                Total = order.Total,
                Status = order.Status,
                CreatedAt = order.CreatedAt,
                Items = order.OrderItems.Select(oi => new OrderItemDto
                {
                    ProductId = oi.ProductId ?? 0,
                    ProductName = oi.ProductName,
                    Price = oi.Price,
                    Quantity = oi.Quantity,
                    Extras = oi.Extras
                }).ToList()
            };
        }
    }
}
