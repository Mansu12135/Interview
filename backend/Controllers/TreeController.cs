using Microsoft.AspNetCore.Mvc;

namespace TreeApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TreeController : ControllerBase {
    [HttpGet]
    public ActionResult<TreeNode> Get() {
        var tree = new TreeNode {
            Id = 1, Title = "Budget",
            Children = [
                new TreeNode {
                    Id = 2, Title = "Groceries",
                    Children = [
                        new TreeNode { Id = 3, Title = "Supermarket", Value = 3800 },
                        new TreeNode { Id = 4, Title = "Bakery", Value = 600 },
                        new TreeNode {
                            Id = 5, Title = "Market",
                            Children = [
                                new TreeNode { Id = 6, Title = "Fruits", Value = 300 },
                                new TreeNode { Id = 7, Title = "Vegetables", Value = 300 }
                            ]
                        }
                    ]
                },
                new TreeNode {
                    Id = 8, Title = "Transport",
                    Children = [
                        new TreeNode {
                            Id = 9, Title = "Car",
                            Children = [
                                new TreeNode { Id = 10, Title = "Fuel", Value = 1000 },
                                new TreeNode { Id = 11, Title = "Parking", Value = 200 },
                                new TreeNode { Id = 12, Title = "Maintenance", Value = 400 }
                            ]
                        },
                        new TreeNode {
                            Id = 13, Title = "Public Transport",
                            Children = [
                                new TreeNode { Id = 14, Title = "Bus", Value = 150 },
                                new TreeNode { Id = 15, Title = "Metro", Value = 120 }
                            ]
                        }
                    ]
                },
                new TreeNode {
                    Id = 16, Title = "Entertainment",
                    Children = [
                        new TreeNode { Id = 17, Title = "Movies", Value = 400 },
                        new TreeNode { Id = 18, Title = "Cafes", Value = 700 },
                        new TreeNode {
                            Id = 19, Title = "Subscriptions",
                            Children = [
                                new TreeNode { Id = 20, Title = "Netflix", Value = 250 },
                                new TreeNode { Id = 21, Title = "Spotify", Value = 100 },
                                new TreeNode { Id = 22, Title = "YouTube Premium", Value = 60 }
                            ]
                        },
                        new TreeNode {
                            Id = 23, Title = "Hobbies",
                            Children = [
                                new TreeNode { Id = 24, Title = "Photography", Value = 500 },
                                new TreeNode { Id = 25, Title = "Books", Value = 300 }
                            ]
                        }
                    ]
                },
                new TreeNode {
                    Id = 26, Title = "Utilities",
                    Children = [
                        new TreeNode { Id = 27, Title = "Electricity", Value = 1200 },
                        new TreeNode { Id = 28, Title = "Water", Value = 400 },
                        new TreeNode { Id = 29, Title = "Internet", Value = 500 },
                        new TreeNode { Id = 30, Title = "Heating", Value = 600 },
                        new TreeNode { Id = 31, Title = "Garbage", Value = 100 }
                    ]
                },
                new TreeNode {
                    Id = 32, Title = "Health",
                    Children = [
                        new TreeNode { Id = 33, Title = "Insurance", Value = 800 },
                        new TreeNode { Id = 34, Title = "Medicine", Value = 300 },
                        new TreeNode { Id = 35, Title = "Gym", Value = 400 }
                    ]
                },
                new TreeNode {
                    Id = 36, Title = "Education",
                    Children = [
                        new TreeNode { Id = 37, Title = "Courses", Value = 1000 },
                        new TreeNode { Id = 38, Title = "Books", Value = 200 },
                        new TreeNode { Id = 39, Title = "Software Licenses", Value = 300 }
                    ]
                }
            ]
        };

        return Ok(tree);
    }
}

public class TreeNode {
    public string Title { get; set; }

    public int Id { get; set; }

    public int? Value { get; set; }

    public List<TreeNode>? Children { get; set; }
}
