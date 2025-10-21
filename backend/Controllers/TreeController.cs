using Microsoft.AspNetCore.Mvc;

namespace TreeApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TreeController : ControllerBase {
    [HttpGet]
    public ActionResult<TreeNode> Get() {
        var tree = new TreeNode {
            Name = "Root",
            Children = [
                new TreeNode { Name = "Branch A", Children = [new TreeNode { Name = "Leaf A1" }, new TreeNode { Name = "Leaf A2" }] },
                new TreeNode { Name = "Branch B", Children = [new TreeNode { Name = "Leaf B1" }, new TreeNode { Name = "Leaf B2" }, new TreeNode { Name = "Leaf B3" }] },
                new TreeNode { Name = "Branch C" }
            ]
        };

        return Ok(tree);
    }
}

public class TreeNode {
    public string Name { get; set; } = string.Empty;

    public List<TreeNode>? Children { get; set; }
}
