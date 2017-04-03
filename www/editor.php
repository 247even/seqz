<?php

function get_ip() {
		//Just get the headers if we can or else use the SERVER global
		if ( function_exists( 'apache_request_headers' ) ) {
			$headers = apache_request_headers();
		} else {
			$headers = $_SERVER;
		}
		//Get the forwarded IP if it exists
		if ( array_key_exists( 'X-Forwarded-For', $headers ) && filter_var( $headers['X-Forwarded-For'], FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 ) ) {
			$the_ip = $headers['X-Forwarded-For'];
		} elseif ( array_key_exists( 'HTTP_X_FORWARDED_FOR', $headers ) && filter_var( $headers['HTTP_X_FORWARDED_FOR'], FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 )
		) {
			$the_ip = $headers['HTTP_X_FORWARDED_FOR'];
		} else {
			$the_ip = filter_var( $_SERVER['REMOTE_ADDR'], FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 );
		}
		return $the_ip;
};

function saveFileAs($content, $target) {
//	$enContent = json_encode($content);
	$enContent = $content;
	//mkdir($target);
	//$target = '../'.$target;
//	touch($target);
//	chmod($target, 0777);
	$fp = fopen($target, 'w');
	fwrite($fp, $enContent);
	fclose($fp);
	//echo $target.' saved';
};

if(isset($_POST['id']) && isset($_POST['seqz'])) {
	$t = $t = time();
	$ip = get_ip();
  $id = $_POST['id'];
  $data = $_POST['seqz'];
  saveFileAs($data, "./data/seqz/".$id."_seqz.json");
	saveFileAs($data, "./data/seqz/bu/".$id."_seqz_".$ip."_".$t.".json");
  echo $id;
}

if(!isset($_POST['seqz'])) {
  echo "no seqz";
}

?>
