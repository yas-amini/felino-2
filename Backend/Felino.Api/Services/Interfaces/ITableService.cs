using Felino.Api.DTOs.Tables;
namespace Felino.Api.Services.Interfaces;

public interface ITableService
{
    Task<List<TableDto>> GetAllTablesAsync();
    Task<TableDto> CreateTableAsync(CreateTableDto dto);

}
