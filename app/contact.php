<?php
if (isset ($_POST['contactFF'])) {
  $to = "info@eurojob.site";
  /* $from = "support@tpverstak.ru"; */
  $subject = "New CV from site ".$_SERVER['HTTP_REFERER'];
  $message = "Candidate name: ".$_POST['nameFF']."\nCondidate E-mail: ".$_POST['contactFF']."\nCandidate Phone: ".$_POST['telFF']."\nCondidate native language: ".$_POST['langFF']."\nMessage: ".$_POST['projectFF']."\n\nFrom site: ".$_SERVER['HTTP_REFERER'];
 
  $boundary = md5(date('r', time()));
  $filesize = '';
  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "From: " . $from . "\r\n";
  $headers .= "Reply-To: " . $from . "\r\n";
  $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
  $message="
Content-Type: multipart/mixed; boundary=\"$boundary\"
 
--$boundary
Content-Type: text/plain; charset=\"utf-8\"
Content-Transfer-Encoding: 7bit
 
$message";
     if(is_uploaded_file($_FILES['fileFF']['tmp_name'])) {
         $attachment = chunk_split(base64_encode(file_get_contents($_FILES['fileFF']['tmp_name'])));
         $filename = $_FILES['fileFF']['name'];
         $filetype = $_FILES['fileFF']['type'];
         $filesize = $_FILES['fileFF']['size'];
         $message.="
 
--$boundary
Content-Type: \"$filetype\"; name=\"$filename\"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename=\"$filename\"
 
$attachment";
     }
   $message.="
--$boundary--";
 
  if ($filesize < 10000000) { // проверка на общий размер всех файлов. Многие почтовые сервисы не принимают вложения больше 10 МБ
    mail($to, $subject, $message, $headers);
    echo $_POST['nameFF'].', Your message has been send! Thank you.';
  } else {
    echo 'Sorry, the message has not been send. Total message size is more than 10 MB.';
  }
}
?>
