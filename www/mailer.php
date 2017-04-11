<?php
  if (isset($_POST['user']) {
    //$response = @file_get_contents("./data/responses/".$id."_".$r_user.".json");

    $subject = "Betreff";
    // the message
    $msg = "First line of text\nSecond line of text";

    // use wordwrap() if lines are longer than 70 characters
    $msg = wordwrap($msg,70);

    $to = "mail@adress.com";
    $headers = "From: webmaster@example.com" . "\r\n" .
    "CC: somebodyelse@example.com";

    // send email
    mail($mto,$subject,$msg);
  }

?>
