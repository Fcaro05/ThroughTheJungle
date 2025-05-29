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
        handleEventRegistration();
        break;
    case 'get_registrations':
        getRegistrations();
        break;
    default:
        echo json_encode(['success' => false, 'message' => 'Azione non valida']);
        break;
}

function handleEventRegistration() {
    // Dati personali
    $nome = trim($_POST['nome'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $azienda = trim($_POST['azienda'] ?? '');
    $ruolo = trim($_POST['ruolo'] ?? '');
    $telefono = trim($_POST['telefono'] ?? '');
    
    // Dati questionario
    $settore = $_POST['settore'] ?? '';
    $dimensione = $_POST['dimensione'] ?? '';
    $esperienza_energia = $_POST['esperienza_energia'] ?? '';
    $priorita = $_POST['priorita'] ?? '';
    $analisi_personalizzata = $_POST['analisi_personalizzata'] ?? '';

    // Validazioni
    if (empty($nome) || empty($email) || empty($azienda) || empty($ruolo)) {
        echo json_encode(['success' => false, 'message' => 'Nome, email, azienda e ruolo sono obbligatori']);
        return;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Email non valida']);
        return;
    }

    if (empty($settore) || empty($dimensione) || empty($esperienza_energia) || empty($priorita) || empty($analisi_personalizzata)) {
        echo json_encode(['success' => false, 'message' => 'Per favore completa tutte le domande del questionario']);
        return;
    }

    // Carica database registrazioni eventi  
    $eventFile = '../data/event_registrations.json';
    $eventData = json_decode(file_get_contents($eventFile), true);

    // Controlla se l'email è già registrata per questo evento
    foreach ($eventData['event_registrations'] as $registration) {
        if ($registration['email'] === $email) {
            echo json_encode(['success' => false, 'message' => 'Questa email è già registrata all\'evento']);
            return;
        }
    }

    // Crea nuova registrazione evento
    $newRegistration = [
        'id' => 'reg_' . uniqid() . '.' . mt_rand(10000000, 99999999),
        'timestamp' => date('Y-m-d H:i:s'),
        'nome' => $nome,
        'email' => $email,
        'azienda' => $azienda,
        'ruolo' => $ruolo,
        'telefono' => $telefono,
        'settore' => $settore,
        'dimensione' => $dimensione,
        'esperienza_energia' => $esperienza_energia,
        'priorita' => $priorita,
        'analisi_personalizzata' => $analisi_personalizzata,
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
    ];

    $eventData['event_registrations'][] = $newRegistration;
    $eventData['lastId']++;

    // Salva nel database
    if (file_put_contents($eventFile, json_encode($eventData, JSON_PRETTY_PRINT))) {
        echo json_encode([
            'success' => true, 
            'message' => 'Registrazione all\'evento completata con successo!',
            'registration_id' => $newRegistration['id']
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Errore nel salvataggio della registrazione']);
    }
}

function getRegistrations() {
    $eventFile = '../data/event_registrations.json';
    
    if (!file_exists($eventFile)) {
        echo json_encode(['success' => false, 'message' => 'File registrazioni non trovato']);
        return;
    }
    
    $eventData = json_decode(file_get_contents($eventFile), true);
    
    echo json_encode([
        'success' => true,
        'total_registrations' => count($eventData['event_registrations']),
        'registrations' => $eventData['event_registrations']
    ]);
}
?> 