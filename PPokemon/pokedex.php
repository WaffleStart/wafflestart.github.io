<?php
  // pokedex.php - Displays all Pokémon sorted by National Dex number
  require_once 'auth-check.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokédex</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/pokedex.css">
    <script defer src="js/pokedex.js"></script>
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
        <section id="pokedex">
            <h2>All Pokémon</h2>
            <input type="text" id="search" placeholder="Search Pokémon..." onkeyup="filterPokemon()">
            <table>
                <thead>
                    <tr>
                        <th onclick="sortTable(0, this)">#</th>
                        <th>Sprite</th>
                        <th onclick="sortTable(2, this)">Name</th>
                        <th onclick="sortTable(3, this)">Type</th>
                        <th onclick="sortTable(4, this)">Abilities</th>
                    </tr>
                </thead>
                <tbody id="pokemon-list">
                    <!-- Pokémon will be loaded here dynamically -->
                </tbody>
            </table>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 Pokémon Fan Database</p>
    </footer>
</body>
</html>
