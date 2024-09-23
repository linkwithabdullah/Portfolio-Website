
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
    // Retrieve form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit;
    }

    // Email details
    $to = "abdullahkhan84328@gmail.com";  // Your email address
    $subject = "New Contact Form Submission";
    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "Content-Type: text/html; charset=UTF-8\r\n";

    // Email body
    $body = "
    <html>
    <head>
      <title>Contact Form Submission</title>
    </head>
    <body>
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> {$name}</p>
      <p><strong>Email:</strong> {$email}</p>
      <p><strong>Phone:</strong> {$phone}</p>
      <p><strong>Message:</strong> {$message}</p>
    </body>
    </html>";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message. Please try again later.";
    }
}
?>



