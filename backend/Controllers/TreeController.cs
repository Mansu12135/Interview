using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace TreeApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TreeController : ControllerBase {
    private static readonly object _lock = new();
    private static TreeNode? _root;
    private static int _nextId;

    [HttpGet]
    public ActionResult<TreeNode> Get() {
        EnsureInitialized();
        return Ok(_root);
    }

    [HttpPost("extend")]
    public ActionResult<TreeNode> Extend([FromBody] ExtendTreeRequest request) {
        if (request == null || string.IsNullOrWhiteSpace(request.Title)) {
            return BadRequest("Title is required.");
        }
        if (!ModelState.IsValid) {
            return BadRequest("Value is required.");
        }

        lock (_lock) {
            EnsureInitialized();

            var parent = FindNodeById(_root!, request.ParentId);
            if (parent == null) {
                return NotFound($"Parent with id {request.ParentId} not found.");
            }

            parent.Children ??= new List<TreeNode>();
            var newNode = new TreeNode {
                Id = _nextId++,
                Title = request.Title,
                Value = request.Value
            };
            parent.Value = null;
            parent.Children.Add(newNode);

            return Ok(_root);
        }
    }

    private static void EnsureInitialized() {
        if (_root != null) return;
        lock (_lock) {
             if (_root != null) return;
            var tree = BuildInitialTree();
            _root = tree;
            _nextId = GetMaxId(tree) + 1;
        }
    }

    private static TreeNode? FindNodeById(TreeNode node, int id) {
        if (node.Id == id) return node;
        if (node.Children != null) {
            foreach (var child in node.Children) {
                var found = FindNodeById(child, id);
                if (found != null) return found;
            }
        }
        return null;
    }

    private static int GetMaxId(TreeNode node) {
        int max = node.Id;
        if (node.Children != null) {
            foreach (var child in node.Children) {
                int childMax = GetMaxId(child);
                if (childMax > max) max = childMax;
            }
        }
        return max;
    }

    private static TreeNode BuildInitialTree() {
        return new TreeNode {
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
    }

    public class ExtendTreeRequest {
        [Required]
        public int ParentId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public int Value { get; set; }
    }
}

public class TreeNode {
    public string Title { get; set; }

    public int Id { get; set; }

    public int? Value { get; set; }

    public List<TreeNode>? Children { get; set; }
}
