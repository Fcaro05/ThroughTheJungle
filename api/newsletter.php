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
    case 'subscribe':
        handleNewsletterSubscription();
        break;
    case 'unsubscribe':
        handleNewsletterUnsubscription();
        break;
    case 'get_subscriptions':
        getSubscriptions();
        break;
    default:
        echo json_encode(['success' => false, 'message' => 'Azione non valida']);
        break;
}

function handleNewsletterSubscription() {
    $email = trim($_POST['email'] ?? '');
    $nome = trim($_POST['nome'] ?? '');
    $azienda = trim($_POST['azienda'] ?? '');
    $settore = $_POST['settore'] ?? '';
    $consenso_marketing = $_POST['consenso_marketing'] ?? false;

    // Validazioni
    if (empty($email)) {
        echo json_encode(['success' => false, 'message' => 'L\'email è obbligatoria']);
        return;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Email non valida']);
        return;
    }

    if (!$consenso_marketing) {
        echo json_encode(['success' => false, 'message' => 'Devi dare il consenso per ricevere comunicazioni marketing']);
        return;
    }

    // Carica database newsletter
    $newsletterFile = '../data/newsletter_subscriptions.json';
    $newsletterData = json_decode(file_get_contents($newsletterFile), true);

    // Controlla se l'email è già iscritta
    foreach ($newsletterData['newsletter_subscriptions'] as $subscription) {
        if ($subscription['email'] === $email && $subscription['status'] === 'active') {
            echo json_encode(['success' => false, 'message' => 'Questa email è già iscritta alla newsletter']);
            return;
        }
    }

    // Crea nuova iscrizione newsletter
    $newSubscription = [
        'id' => ++$newsletterData['lastId'],
        'email' => $email,
        'nome' => $nome,
        'azienda' => $azienda,
        'settore' => $settore,
        'status' => 'active',
        'subscribed_at' => date('Y-m-d H:i:s'),
        'consenso_marketing' => $consenso_marketing,
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
    ];

    $newsletterData['newsletter_subscriptions'][] = $newSubscription;

    // Salva nel database
    if (file_put_contents($newsletterFile, json_encode($newsletterData, JSON_PRETTY_PRINT))) {
        echo json_encode([
            'success' => true, 
            'message' => 'Iscrizione alla newsletter completata con successo!',
            'subscription_id' => $newSubscription['id']
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Errore nel salvataggio dell\'iscrizione']);
    }
}

function handleNewsletterUnsubscription() {
    $email = trim($_POST['email'] ?? '');

    if (empty($email)) {
        echo json_encode(['success' => false, 'message' => 'Email richiesta']);
        return;
    }

    // Carica database newsletter
    $newsletterFile = '../data/newsletter_subscriptions.json';
    $newsletterData = json_decode(file_get_contents($newsletterFile), true);

    // Cerca e disiscrive l'email
    $found = false;
    for ($i = 0; $i < count($newsletterData['newsletter_subscriptions']); $i++) {
        if ($newsletterData['newsletter_subscriptions'][$i]['email'] === $email) {
            $newsletterData['newsletter_subscriptions'][$i]['status'] = 'unsubscribed';
            $newsletterData['newsletter_subscriptions'][$i]['unsubscribed_at'] = date('Y-m-d H:i:s');
            $found = true;
            break;
        }
    }

    if (!$found) {
        echo json_encode(['success' => false, 'message' => 'Email non trovata nella newsletter']);
        return;
    }

    // Salva nel database
    if (file_put_contents($newsletterFile, json_encode($newsletterData, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true, 'message' => 'Disiscrizione dalla newsletter completata']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Errore nel salvataggio']);
    }
}

function getSubscriptions() {
    $newsletterFile = '../data/newsletter_subscriptions.json';
    
    if (!file_exists($newsletterFile)) {
        echo json_encode(['success' => false, 'message' => 'File newsletter non trovato']);
        return;
    }
    
    $newsletterData = json_decode(file_get_contents($newsletterFile), true);
    
    $activeSubscriptions = array_filter($newsletterData['newsletter_subscriptions'], function($sub) {
        return $sub['status'] === 'active';
    });
    
    echo json_encode([
        'success' => true,
        'total_active_subscriptions' => count($activeSubscriptions),
        'total_subscriptions' => count($newsletterData['newsletter_subscriptions']),
        'subscriptions' => $newsletterData['newsletter_subscriptions']
    ]);
}
?> 