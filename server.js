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
  const query = "SELECT * FROM users ORDER BY lname";
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

// Start server
app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
