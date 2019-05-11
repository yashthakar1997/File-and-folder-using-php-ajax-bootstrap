<?php

$response = array();

if(isset($_POST['show_files'])){
    $response = scandir(getcwd());
}

if(isset($_POST['getContent'])){
    $fileTocheck = substr($_POST['getContent'],1);
    if(is_dir($fileTocheck)){
        $response = scandir($fileTocheck);
        $response['folder'] = 1;
    } else {
        $response = file_get_contents($fileTocheck);
    } 
};

if(isset($_POST['createNewFolder'])){
    if(!file_exists($_POST['createNewFolder'])) {
         if(mkdir($_POST['createNewFolder'])){
            $msg = 'Folder Created Successfully';
            $success = 1;
         }

    } else {
        $msg = 'Folder already exists';
        $success = 0;
    };
    $response = array('msg' => $msg, 'success' => $success);
}


if (isset($_FILES['image'])) {
    $numOfFiles = count($_FILES['image']['name']);
    if(!file_exists('uploads')) {
        mkdir('uploads');
    }

    if ($numOfFiles > 1) {
        for ($i=0; $i < $numOfFiles; $i++) { 
            $file[$i] = move_uploaded_file($_FILES['image']['tmp_name'][$i],
            'uploads/' . $_FILES['image']['name'][$i]);
            if($file[$i]){
                $response[$i] =  $_FILES['image']['name'][$i]." File successfully uplaoded ";
            }
        }
    }else {
        if(move_uploaded_file($_FILES['image']['tmp_name'][0] , 'uploads/' . $_FILES['image']['name'][0])){
            $response[0] = $_FILES['image']['name'][0] . ' File successfully uploaded  ';
        }
    }
}

if(isset($_POST['gitStatus'])){
    $command = 'git status'; 
    $response = shell_exec($command);
}

if(isset($_POST['gitadd'])){
    // $command = 'git add .'; 
    shell_exec('git add .');
    $response = shell_exec("git commit -m 'soem'");
    shell_exec('git push');
    // echo $response;
}

echo json_encode($response);