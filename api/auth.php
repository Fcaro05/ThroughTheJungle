<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    case 'register':
        handleRegister();
        break;
    case 'login':
        handleLogin();
        break;
    case 'logout':
        handleLogout();
        break;
    case 'check_session':
        handleCheckSession();
        break;
    default:
        echo json_encode(['success' => false, 'message' => 'Azione non valida']);
        break;
}

function handleRegister() {
    $nome = trim($_POST['nome'] ?? '');
    $cognome = trim($_POST['cognome'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $azienda = trim($_POST['azienda'] ?? '');
    $ruolo = trim($_POST['ruolo'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';

    // Validazioni
    if (empty($nome) || empty($cognome) || empty($email) || empty($azienda) || empty($ruolo) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Tutti i campi sono obbligatori']);
        return;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Email non valida']);
        return;
    }

    if ($password !== $confirmPassword) {
        echo json_encode(['success' => false, 'message' => 'Le password non coincidono']);
        return;
    }

    if (strlen($password) < 6) {
        echo json_encode(['success' => false, 'message' => 'La password deve essere di almeno 6 caratteri']);
        return;
    }

    // Carica database utenti
    $usersFile = '../data/users.json';
    $usersData = json_decode(file_get_contents($usersFile), true);

    // Controlla se l'email esiste già
    foreach ($usersData['users'] as $user) {
        if ($user['email'] === $email) {
            echo json_encode(['success' => false, 'message' => 'Email già registrata']);
            return;
        }
    }

    // Crea nuovo utente
    $newUser = [
        'id' => ++$usersData['lastId'],
        'nome' => $nome,
        'cognome' => $cognome,
        'email' => $email,
        'azienda' => $azienda,
        'ruolo' => $ruolo,
        'password' => password_hash($password, PASSWORD_DEFAULT),
        'created_at' => date('Y-m-d H:i:s'),
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
    ];

    $usersData['users'][] = $newUser;

    // Salva nel database
    if (file_put_contents($usersFile, json_encode($usersData, JSON_PRETTY_PRINT))) {
        // Avvia sessione
        session_start();
        $_SESSION['user_id'] = $newUser['id'];
        $_SESSION['user_email'] = $newUser['email'];
        $_SESSION['user_name'] = $newUser['nome'] . ' ' . $newUser['cognome'];
        
        echo json_encode([
            'success' => true, 
            'message' => 'Registrazione completata con successo',
            'user' => [
                'id' => $newUser['id'],
                'nome' => $newUser['nome'],
                'cognome' => $newUser['cognome'],
                'email' => $newUser['email'],
                'azienda' => $newUser['azienda'],
                'ruolo' => $newUser['ruolo']
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Errore nel salvataggio']);
    }
}

function handleLogin() {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Email e password sono obbligatori']);
        return;
    }

    // Carica database utenti
    $usersFile = '../data/users.json';
    $usersData = json_decode(file_get_contents($usersFile), true);

    // Cerca utente
    foreach ($usersData['users'] as $user) {
        if ($user['email'] === $email && password_verify($password, $user['password'])) {
            // Login riuscito
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_name'] = $user['nome'] . ' ' . $user['cognome'];
            
            echo json_encode([
                'success' => true, 
                'message' => 'Login effettuato con successo',
                'user' => [
                    'id' => $user['id'],
                    'nome' => $user['nome'],
                    'cognome' => $user['cognome'],
                    'email' => $user['email'],
                    'azienda' => $user['azienda'],
                    'ruolo' => $user['ruolo']
                ]
            ]);
            return;
        }
    }

    echo json_encode(['success' => false, 'message' => 'Credenziali non valide']);
}

function handleLogout() {
    session_start();
    session_destroy();
    echo json_encode(['success' => true, 'message' => 'Logout effettuato con successo']);
}

function handleCheckSession() {
    session_start();
    
    if (isset($_SESSION['user_id'])) {
        // Sessione valida
        echo json_encode([
            'success' => true,
            'authenticated' => true,
            'user' => [
                'id' => $_SESSION['user_id'],
                'email' => $_SESSION['user_email'] ?? '',
                'nome' => $_SESSION['user_name'] ?? ''
            ]
        ]);
    } else {
        // Sessione non valida
        echo json_encode([
            'success' => false,
            'authenticated' => false,
            'message' => 'Utente non autenticato'
        ]);
    }
}
?> 