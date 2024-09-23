
<!-- //if ($_SERVER["REQUEST_METHOD"] == "POST") {
//	$name = $_POST['name'];
//	$email = $_POST['email'];
//	$subject = $_POST['subject'];
//	$budget = $_POST['budget'];
//	$message = $_POST['message'];

	// Sender Email and Name 
//	$from = stripslashes($_POST['name']) . "<" . stripslashes($_POST['email']) . ">";

	// Recipient Email Address 
//	$to = 'marveltheme@gmail.com';

	// Email Subject 
//	$emailSubject = 'New Message from BentoFolio Contact Form';

	// Email Header 
//	$headers  = 'MIME-Version: 1.0' . "\r\n"
//	.'Content-type: text/html; charset=utf-8' . "\r\n"
//	.'From: ' . $from . "\r\n";

	// Message Body 
//	$body = "Name: $name\nEmail: $email\nSubject: $subject\nBudget: $budget\nMessage:\n$message";

	// Check that data was sent to the mailer.
//	if (empty($name) or empty($message) or empty($subject) or empty($budget) or !filter_var($email, FILTER_VALIDATE_EMAIL)) {
//		echo 'Please fill all the fields and try again.';
//		exit;
//	}

	// If there are no errors, send the email
//	if (mail($to, $emailSubject, $body, $from)) {
//		echo 'Thank You! We will be in touch with you very soon.';
//	} else {
//		echo 'Sorry there was an error sending your message. Please try again';
//	}
//} -->



<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and sanitize form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Sender Email and Name 
    $from = $email;  // Use the user's email address as the sender
    $fromName = stripslashes($name);

    // Recipient Email Address 
    $to = 'abdullahkhan84328@gmail.com';  // Your email

    // Email Subject 
    $emailSubject = 'New Message from Contact Form';

    // Email Header 
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    $headers .= 'From: ' . $fromName . ' <' . $from . '>' . "\r\n";
    $headers .= 'Reply-To: ' . $email . "\r\n";  // Adding reply-to

    // HTML message body
    $body = "
    <html>
    <head>
      <title>$emailSubject</title>
    </head>
    <body>
      <p><strong>Name:</strong> {$name}</p>
      <p><strong>Email:</strong> {$email}</p>
      <p><strong>Phone:</strong> {$phone}</p>
      <p><strong>Message:</strong><br>{$message}</p>
    </body>
    </html>";

    // Validate the input fields
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo 'Please fill all the fields correctly and try again.';
        exit;
    }

    // Send email
    if (mail($to, $emailSubject, $body, $headers)) {
        echo 'Thank You! We will be in touch with you very soon.';
    } else {
        echo 'Sorry, there was an error sending your message. Please try again later.';
    }
}
?>



