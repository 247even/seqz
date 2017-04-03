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

///////////////////////////////////////////////////////////////////////////////

if(isset($_GET['del'])) {
	$u = 0;
	$id = $_GET['del'];
	if(unlink("./data/responses/".$id."_1.json")){
		$u++;
	}
	if(unlink("./data/responses/".$id."_2.json")){
		$u++;
	}
	echo $u;
	exit();
}

if(isset($_GET['id']) && isset($_GET['u'])) {
    $user = $_GET['u'];
    $id = $_GET['id'];
    $ip = get_ip();
    //$ips = strval($ip);
    $t = time();

    $ai = isset($_GET['ai']) ? $_GET['ai'] : "null";
		$ri = isset($_GET['ri']) ? $_GET['ri'] : "null";
    $a1 = isset($_GET['a1']) ? $_GET['a1'] : "null";
    $a2 = isset($_GET['a2']) ? $_GET['a2'] : "null";
		$ti = isset($_GET['a2']) ? $_GET['a2'] : "null";

    if(isset($id) && isset($user)) {
      $data = '{"ip":"'.$ip.'","id":"'.$id.'","u":'.$user.',"t":'.$t.',"ri":'.$ri.',"ai":'.$ai.',"a1":'.$a1.',"a2":'.$a2.',"ti":'.$ti.'}';
      saveFileAs($data, "./data/responses/".$id."_".$user.".json");
    } else {
      //echo "nope";
    }

		$r_user = 1;
    if ($user == 1){
      $r_user = 2;
    }

		$response = @file_get_contents("./data/responses/".$id."_".$r_user.".json");
		if($response){
			echo $response;
		} else {
			echo "false";
		}
}

?>
