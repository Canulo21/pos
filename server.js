const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react_pos",
});

//** For Users  **//

// Login API endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const query =
    "SELECT * FROM users WHERE username = ? AND status = 'accepted'";
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = results[0];
    try {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Update isActive to true
      const updateQuery = "UPDATE users SET isActive = true WHERE id = ?";
      db.query(updateQuery, [user.id], (updateErr, updateResults) => {
        if (updateErr) {
          console.error("Error updating isActive:", updateErr);
          return res.status(500).json({ error: "Internal server error" });
        }
        // Check if the user is an admin
        const isAdmin = user.role === "Admin";
        const getUserId = user.id;

        res.json({
          message: "Login successful",
          user: {
            id: getUserId,
            username: user.username,
            fname: user.fname,
            lname: user.lname,
            role: user.role,
            isAdmin: isAdmin,
          },
        });
      });
    } catch (error) {
      console.error("Error comparing passwords:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
});

// Logout API endpoint
app.post("/logout", (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const updateQuery = "UPDATE users SET isActive = false WHERE id = ?";
  db.query(updateQuery, [userId], (err, result) => {
    if (err) {
      console.error("Error updating isActive status:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.json({ message: "Logged out successfully" });
  });
});

// Users Regitration
app.post("/register", async (req, res) => {
  const { fname, mname, lname, role, status, isActive, username, password } =
    req.body;

  if (!fname || !role || !lname || !username || !password) {
    return res.status(400).json({
      error: "Bad Request",
      details: "All fields are required",
    });
  }

  try {
    // Check if the username already exists in the database
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ Message: "Error" });
        }

        if (results.length > 0) {
          // If username already exists, return an error
          return res.status(400).json({ error: "Username already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

        const query =
          "INSERT INTO users (fname, mname, lname, role, status, isActive, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        db.query(
          query,
          [
            fname,
            mname,
            lname,
            role,
            status,
            isActive,
            username,
            hashedPassword,
          ],
          (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ Message: "Error" });
            }
            return res.status(200).json({ Status: "Success" });
          }
        );
      }
    );
  } catch (error) {
    console.error("Error hashing password:", error);
    return res.status(500).json({ Message: "Error" });
  }
});

// get users
app.get("/viewUsers", (req, res) => {
  const query = "SELECT * FROM users WHERE status = 'accepted' ORDER BY lname";
  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({ Message: "Error" });
    }
    return res.json(data);
  });
});

// get users that are pendeing
app.get("/pendingUsers", (req, res) => {
  const query = "SELECT * FROM users WHERE STATUS = 'pending'";
  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({ Message: "Error" });
    }
    return res.json(data);
  });
});

//accept pending user
app.put("/acceptUser/:id", (req, res) => {
  const userId = req.params.id;
  const { status } = req.body;

  const query = "UPDATE users SET status = ? WHERE id = ?";

  db.query(query, ["accepted", userId], (err, result) => {
    if (err) {
      console.error("Error updating user status:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ updated: true, result });
  });
});

// remove user
app.delete("/deleteUser/:id", (req, res) => {
  const userId = req.params.id;

  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: err.message });
    } else {
      res.status(200).json({ message: "Data deleted successfully" });
    }
  });
});

// get users that are Active
app.get("/activeUsers", (req, res) => {
  const query = "SELECT * FROM users WHERE isActive = True";
  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({ Message: "Error" });
    }
    return res.json(data);
  });
});

//** End For Users  **//

// -----------------------------------------------------------

//** For Products  **//
app.get("/category", (req, res) => {
  const query = "SELECT * FROM product_category ORDER BY category_name";
  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({ Message: "Error" });
    }
    return res.json(data);
  });
});

app.post("/addCategory", (req, res) => {
  const { category_name } = req.body;

  if (!category_name) {
    return res.status(400).json({
      error: "Bad Request",
      details: "All fields are required",
    });
  }

  const queryMaxCategoryId =
    "SELECT MAX(category_id) AS max_category_id FROM product_category";
  db.query(queryMaxCategoryId, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ Message: "Error" });
    }
    let newCategoryId = 100; // Default start value
    if (result && result[0] && result[0].max_category_id !== null) {
      newCategoryId = parseInt(result[0].max_category_id) + 1;
    }

    const queryInsertCategory =
      "INSERT INTO product_category(category_id, category_name) VALUES (?, ?)";
    db.query(
      queryInsertCategory,
      [newCategoryId, category_name],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ Message: "Error" });
        }
        return res.status(200).json({ Status: "Success" });
      }
    );
  });
});

// remove category

app.delete("/deleteCategory/:id", (req, res) => {
  const cat_id = req.params.id;

  const query = "DELETE FROM product_category WHERE category_id = ?";
  db.query(query, [cat_id], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: err.message });
    } else {
      res.status(200).json({ message: "Data deleted successfully" });
    }
  });
});

// table for my all Products
app.get("/allProducts", (req, res) => {
  const query =
    "SELECT products.prod_id, products.prod_name, products.prod_price, product_category.category_name, product_quantity.quantity FROM products INNER JOIN product_category ON products.category_id = product_category.category_id INNER JOIN product_quantity ON products.prod_id = product_quantity.prod_id ORDER BY products.prod_name";
  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({ Message: "Error" });
    }
    return res.json(data);
  });
});

// add Products
app.post("/addProduct", (req, res) => {
  const { prod_name, category_name, prod_price, quantity } = req.body;

  // Check if any field is empty
  if (!prod_name || !category_name || !prod_price || !quantity) {
    return res.status(400).send("All fields are required");
  }

  // Check if prod_name already exists
  db.query(
    "SELECT * FROM products WHERE prod_name = ?",
    [prod_name],
    (error, results) => {
      if (error) {
        console.error("Error checking existing product:", error);
        return res.status(500).send("Internal server error");
      }

      if (results.length > 0) {
        // Product with the same name already exists
        console.log("Product already exists:", prod_name);
        return res
          .status(400)
          .send("Product with the same name already exists");
      }

      // If prod_name doesn't exist and all fields are filled, proceed with adding the product
      db.query(
        "SELECT category_id FROM product_category WHERE category_name = ?",
        [category_name],
        (error, results) => {
          if (error) {
            console.error("Error retrieving category ID:", error);
            return res.status(500).send("Internal server error");
          }

          if (results.length === 0) {
            console.log("Category not found:", category_name);
            return res.status(404).send("Category not found");
          }

          const category_id = results[0].category_id;

          // Insert data into products table
          db.query(
            "INSERT INTO products (prod_name, category_id, prod_price) VALUES (?, ?, ?)",
            [prod_name, category_id, prod_price],
            (error, results) => {
              if (error) {
                console.error("Error inserting into products table:", error);
                return res.status(500).send("Internal server error");
              }

              const prod_id = results.insertId;

              // Insert data into product_quantity table
              db.query(
                "INSERT INTO product_quantity (prod_id, quantity) VALUES (?, ?)",
                [prod_id, quantity],
                (error, results) => {
                  if (error) {
                    console.error(
                      "Error inserting into product_quantity table:",
                      error
                    );
                    return res.status(500).send("Internal server error");
                  }

                  console.log("Data inserted successfully.");
                  res.status(200).send("Product added successfully");
                }
              );
            }
          );
        }
      );
    }
  );
});

//** End For Products  **//

// Start server
app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
