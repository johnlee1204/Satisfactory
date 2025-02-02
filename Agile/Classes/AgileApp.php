<?php
class AgileApp {
	//private static $instance;
	public $systemConfigs;
	public $AutoLoader;
	public $ErrorHandler;
	public $SessionManager;
	public $PermissionsManager;
	public $RequestRouter;
	public $databaseTables;
	public $database;
	public $jsonErrorOutput;

	function __construct($systemConfigs){
		$this->systemConfigs = $systemConfigs;
		$systemClassPath = $this->systemConfigs['systemCorePath']."Classes/";


		require_once($systemClassPath . 'AgileAutoloader.php');
		$this->AutoLoader = new AgileAutoloader($this);
		spl_autoload_register(array($this->AutoLoader, 'loadClass'));

		//Preload important classes
		require_once($systemClassPath . 'AgileModel.php');
		require_once($systemClassPath . 'AgileOutput.php');
		require_once($systemClassPath . 'AgileJson.php');
		require_once($systemClassPath . 'AgileUserMessageException.php');
		require_once($systemClassPath . 'AgileBaseController.php');
		require_once($this->systemConfigs['systemPath']."inc/php/Classes/Validation.php");
		require_once($this->systemConfigs['systemPath']."inc/php/Classes/SmartTruncate.php");

		require_once($systemClassPath . 'AgileLibrary.php');
		require_once($systemClassPath . 'AgileTableInterface.php');
		require_once($systemClassPath . 'AgileTable.php');
		require_once($systemClassPath . 'AgileLog.php');
		require_once($systemClassPath . 'Columns.php');

		require_once($systemClassPath . 'AgileErrorHandler.php');
		$this->ErrorHandler = new AgileErrorHandler($this);


		ini_set('display_errors', '1');
		ini_set('display_startup_errors', '1');
		error_reporting(E_ALL);

		//Shared Database Object
		$dbDriver = "mysql_helper";
		require_once($systemClassPath . $dbDriver . '.php');
		$this->systemDb = new $dbDriver();
		$this->systemDb->database = $systemConfigs["databases"]["LeeSheet"];
		$this->systemDb->databases = $systemConfigs["databases"];

		$this->database = new $dbDriver();
		$this->database->databases = $systemConfigs["databases"];

		//Initialize The Request
		//do this first because the error handler logs route info
		require_once($systemClassPath . 'AgileRequestRouter.php');
		$this->RequestRouter = new AgileRequestRouter($this);

//		Session Manager
		require_once($systemClassPath . 'AgileSession.php');
		$this->SessionManager = new AgileSession($this);
		$this->SessionManager->initSession();

		//Permissions
		require_once($systemClassPath . 'AgilePermissions.php');
		$this->PermissionsManager = new AgilePermissions($this);

		//Route the Request
		$this->RequestRouter->routeRequest();
	}

	/**
	 * Loads a system model
	 * @param $model
	 * @return mixed
	 */
	function loadModel($model){
		require_once($this->systemConfigs['systemCorePath']."Models/".$model.'.php');
		$modelObj = new $model();
		$modelObj->AgileApp = $this;
		$modelObj->database = $this->database;
		if(method_exists($modelObj,'init')){
			$modelObj->init();
		}
		return $modelObj;
	}

	function readStandardLogColumnValues(){
		if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			//if multiple proxies are involved, x-forwarded-for will be a comma separated list!
			$ip = substr($_SERVER['HTTP_X_FORWARDED_FOR'],-20);
		} elseif (isset($_SERVER['REMOTE_ADDR'])) {
			$ip = $_SERVER['REMOTE_ADDR'];
		} else {
			$ip = 'cmd line';
		}

		if (isset($_SERVER['HTTP_REFERER'])) {
			$referrer = $_SERVER['HTTP_REFERER'];
		} else {
			$referrer = '';
		}

		try{
			if(isset($this->SessionManager)){
				$loggedIn = intval($this->SessionManager->getAuthenticated());
			}else{
				$loggedIn = 0;
			}

			if ($loggedIn) {
				$session = $this->SessionManager->getUserDataFromSession();
				$userId = $session['employeeId'];
				$userName = $session['userName'];
			} else {
				$userId = NULL;
				$userName = '';
			}

		}catch (Exception $exception){
			$loggedIn = false;
			$userId = NULL;
			$userName = '';
		}

		if(isset($this->RequestRouter)){
			$class = $this->RequestRouter->routeClass;
			$method = $this->RequestRouter->routeMethod;
		}else{
			$class = "";
			$method = "";
		}

		$loggedPost = $_POST;

		$loggedJson = null;
		if(isset($_SERVER['CONTENT_TYPE']) && strtolower($_SERVER['CONTENT_TYPE']) == 'application/json'){
			$loggedJson = file_get_contents('php://input');
		}

		$lowerClass = strtolower($class);
		$lowerMethod = strtolower($method);
		if($lowerClass == 'login' && $lowerMethod == 'authenticate'){
			$loggedPost = "[POST REDACTED]";
		}

		$currentDate = date('Y-m-d H:i:s');
		return array(
			'date' => $currentDate,
			'ip' => $ip,
			'uri' => $_SERVER['REQUEST_URI'],
			'class' => $lowerClass,
			'method' => $lowerMethod,
			'referrer' => $referrer,
			'httpType' => $_SERVER['REQUEST_METHOD'],
			'query' => substr($_SERVER['QUERY_STRING'], 0, 1000),
			'loggedIn' => $loggedIn,
			'userId' => $userId,
			'userName' => $userName,
			'`get`' => substr(print_r($_GET, true), 0, 1000),
			'post' => substr(print_r($loggedPost, true), 0, 1000),
			'json' => substr($loggedJson, 0, 1000)
		);
	}
}