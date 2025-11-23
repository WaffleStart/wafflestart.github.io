<?php
  require 'register_login/config.php'; // Include database connection
  require_once 'auth-check.php';
  // Check if user is logged in
  if (!isset($_SESSION['user_id'])) {
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PPokémon Database - Login</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
    <link rel="manifest" href="favicon/site.webmanifest">
</head>
<body>
    <div class="auth-container">
        <h1>Welcome to PPokémon Database</h1>
        <a href="register_login/login.php" class="auth-button">Login</a>
        <a href="register_login/register.php" class="auth-button">Register</a>
    </div>
</body>
</html>
<?php
    exit();
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokémon Database</title>
    <link rel="stylesheet" href="css/styles.css">
    <script defer src="js/script.js"></script>
    <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
    <link rel="manifest" href="favicon/site.webmanifest">
</head>
<body>
    <header>
        <h1><a href="index.php">PPokémon Database</a></h1>
        <nav>
            <ul>
                <li><a href="pokedex.php">Pokédex</a></li>
                <li><a href="emulator.php">Emulator</a></li>
                <li><a href="type-chart.php">Type Chart</a></li>
                <li><a href="weakness-analyzer.php">Weakness Analyzer</a></li>
                <li><a href="team-builder.php">Team Builder</a></li>

                <li class="logout"><a href="logout.php">Logout</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section class="welcome">
            <h2>Welcome to the Pokémon Database</h2>
            <p>Explore Pokémon stats, moves, abilities, and more!</p>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 Pokémon Fan Database</p>
    </footer>

</body>
</html>