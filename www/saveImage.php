<?php

function saveFileAs($content,$target) {
//	$enContent = json_encode($content);
  $enContent = $content;
  //mkdir($target);
//	touch($target);
//	chmod($target, 0777);
  $fp = fopen($target, 'w');
  fwrite($fp, $enContent);
  fclose($fp);
  return true;
  //echo $target.' saved';
};

if ( isset($_POST['img']) && isset($_POST['id']) ) {
    $id = $_POST['id'];
    $img = $_POST['img'];

    $data = explode(',', $img);
    $datax = str_replace(' ', '+', $data[1]);
    $content = base64_decode($datax);

    saveFileAs($content, 'shared/'.$id.'.png');

      echo 'file saved';
}

?>
