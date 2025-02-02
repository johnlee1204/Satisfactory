<?php


use Employee\Models\EmployeeModel;
//use inc\php\classes\Email;

class Employee extends AgileBaseController {

	static $AgilePermissions = [
		'index' => 'read',
		'readAppInitData' => 'read',
		'readEmployees' => 'read',
		'readEmployee' => 'read',
		'createEmployee' => 'create',
		'updateEmployee' => 'update',
		'deleteEmployee' => 'delete',
        'terminateEmployee' => 'update'
	];

	function readAppInitData() {
		$groupModel = $this->loadModel('AgileGroupModel');
		$groupsAssoc = $groupModel->getAllGroupsArray();
		$groups = [];
		foreach($groupsAssoc as $group) {
			$groups[] = array_values($group);
		}

		$this->outputSuccess([
			'groups' => $groups
		]);
	}

	function readEmployees() {
		$this->outputSuccessData(EmployeeModel::readEmployees());
	}

	function readEmployee() {
		$input = Validation::validateJsonInput([
			'employeeId' => 'numeric'
		]);

		$this->outputSuccessData(EmployeeModel::readEmployee($input['employeeId']));
	}

	function createEmployee() {
		$inputs = Validation::validateJsonInput([
			'employeeNumber' => 'notBlank',
			'userName' => 'notBlank',
			'password' => 'notBlank',
			'firstName' => 'notBlank',
			'lastName' => 'notBlank',
			'email',
			'hireDate',
			'terminationDate',
			'payRate' => 'numericOrNull',
			'position',
			'permissions'
		]);

		$this->outputSuccessData(EmployeeModel::createEmployee($inputs));
	}

	function updateEmployee() {
		$inputs = Validation::validateJsonInput([
			'employeeId' => 'numeric',
			'employeeNumber' => 'notBlank',
			'userName' => 'notBlank',
			'firstName' => 'notBlank',
			'lastName' => 'notBlank',
			'email',
			'hireDate',
			'terminationDate',
			'payRate' => 'numericOrNull',
			'position',
			'permissions'
		]);

		EmployeeModel::updateEmployee($inputs);

		$this->outputSuccess();
	}

	function deleteEmployee() {
		$input = Validation::validateJsonInput([
			'employeeId' => 'numeric'
		]);

		EmployeeModel::deleteEmployee($input['employeeId']);

		$this->outputSuccess();
	}

	function terminateEmployee(){
        $inputs = Validation::validateJsonInput([
            'employeeId' => 'numeric'
        ]);

        $this->database->update(
            'Employee',
            ['terminationDate' => date('Y-m-d') ],
            ['employeeId' => $inputs['employeeId']]
        );
        $this->outputSuccess();

    }

	function createSchedule() {
		$inputs = Validation::validateJsonInput([
			'employeeId' => 'notBlank',
			'startTime' => 'notBlank',
			'endTime' => 'notBlank'
		]);
	}
}