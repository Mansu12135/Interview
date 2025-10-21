using Microsoft.AspNetCore.Mvc;

namespace TreeApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TreeController : ControllerBase
{
    [HttpGet]
    public ActionResult<TreeNode> Get()
    {
        var tree = new TreeNode
        {
            Name = "Root",
            Children = new List<TreeNode>
            {
                new() { Name = "Branch A", Children = new List<TreeNode>{ new() { Name = "Leaf A1" }, new() { Name = "Leaf A2" } } },
                new() { Name = "Branch B", Children = new List<TreeNode>{ new() { Name = "Leaf B1" }, new() { Name = "Leaf B2" }, new() { Name = "Leaf B3" } } },
                new() { Name = "Branch C" }
            }
        };

        return Ok(tree);
    }
}

public class TreeNode
{
    public string Name { get; set; } = string.Empty;
    public List<TreeNode>? Children { get; set; }
}
