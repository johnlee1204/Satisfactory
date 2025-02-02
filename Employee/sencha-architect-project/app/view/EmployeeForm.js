/*
 * File: app/view/EmployeeForm.js
 *
 * This file was generated by Sencha Architect
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 7.3.x Classic library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 7.3.x Classic. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Employee.view.EmployeeForm', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.employeeform',

	mixins: [
		'DocForm'
	],
	requires: [
		'Employee.view.EmployeeFormViewModel',
		'Ext.toolbar.Toolbar',
		'Ext.form.field.Date',
		'Ext.form.field.Tag'
	],

	viewModel: {
		type: 'employeeform'
	},
	width: 450,
	layout: 'vbox',
	bodyPadding: 10,
	bodyStyle: 'background:none',
	defaultListenerScope: true,

	dockedItems: [
		{
			xtype: 'toolbar',
			flex: 1,
			dock: 'top',
			itemId: 'employeeFormToolbar'
		}
	],
	items: [
		{
			xtype: 'textfield',
			itemId: 'employeeNumber',
			fieldLabel: 'Employee No'
		},
		{
			xtype: 'textfield',
			itemId: 'userName',
			fieldLabel: 'User Name'
		},
		{
			xtype: 'textfield',
			itemId: 'password',
			fieldLabel: 'Password'
		},
		{
			xtype: 'textfield',
			itemId: 'firstName',
			fieldLabel: 'First Name'
		},
		{
			xtype: 'textfield',
			itemId: 'lastName',
			fieldLabel: 'Last Name'
		},
		{
			xtype: 'textfield',
			itemId: 'email',
			fieldLabel: 'Email'
		},
		{
			xtype: 'datefield',
			itemId: 'hireDate',
			fieldLabel: 'Hire Date',
			submitFormat: 'Y-m-d'
		},
		{
			xtype: 'datefield',
			itemId: 'terminationDate',
			fieldLabel: 'Termination Date',
			submitFormat: 'Y-m-d'
		},
		{
			xtype: 'textfield',
			itemId: 'payRate',
			fieldLabel: 'Pay Rate'
		},
		{
			xtype: 'combobox',
			itemId: 'position',
			width: 324,
			fieldLabel: 'Position',
			matchFieldWidth: false,
			displayField: 'position',
			forceSelection: true,
			queryMode: 'local',
			valueField: 'position',
			bind: {
				store: '{PositionStore}'
			},
			listeners: {
				afterrender: 'onPositionAfterRender'
			}
		},
		{
			xtype: 'tagfield',
			itemId: 'permissions',
			width: 256,
			fieldLabel: 'Permissions',
			displayField: 'groupName',
			queryMode: 'local',
			valueField: 'groupId',
			bind: {
				store: '{PermissionStore}'
			}
		},
		{
			xtype: 'container',
			hidden: true,
			html: '<img class = \'fireButton\' src=\'/Employee/project-files/fire.png\'>',
			itemId: 'fireButton',
			style: 'object-fit:contain;border-radius: 50%;',
			width: 450,
			listeners: {
				afterrender: 'onContainerAfterRender'
			}
		}
	],
	listeners: {
		afterrender: 'onPanelAfterRender',
		docFormStateChanged: 'onPanelDocFormStateChangeD'
	},

	onPositionAfterRender: function(component, eOpts) {
		AppWindowManager.appOn('dropDownSelectionEditor', {
			scope:this,
			selectionchanged:function() {
				this.readPositions();
			}
		});

		component.el.on({
		    contextmenu: function(event) {
		        event.stopEvent();
		        AppWindowManager.appLink('dropDownSelectionEditor', {dataKey:'position'});
		    },
		    scope:this
		});

	},

	onContainerAfterRender: function(component, eOpts) {
		component.el.on('click', function(event, target) {
			if(target.className === "fireButton") {
				this.terminateEmployee();
			}
		}, this);
	},

	onPanelAfterRender: function(component, eOpts) {
		this.docFormInit({
			toolbarId:'employeeFormToolbar',
			addFn:'createEmployee',
			saveFn:'updateEmployee',
			deleteFn:'deleteEmployee'
		});


		AERP.Ajax.request({
			url:'/Employee/readAppInitData',
			success:function(reply) {
				this.getViewModel().getStore("PermissionStore").loadData(reply.groups);
			},
			scope:this,
			mask:this
		});

		this.readPositions();
	},

	onPanelDocFormStateChangeD: function(panel) {

	},

	readPositions: function() {
		AERP.Ajax.request({
			url:'/DropDownSelectionEditor/readSelectionsForCombo',
			jsonData:{selectionKey:'position'},
			success:function(reply) {
				this.getViewModel().getStore('PositionStore').loadData(reply.data);
			},
			scope:this,
			mask:this
		});
	},

	readEmployee: function(employeeId) {
		AERP.Ajax.request({
			url:'/Employee/readEmployee',
			jsonData:{employeeId:employeeId},
			success:function(reply) {
				this.employeeId = employeeId;
				let fireButton = this.queryById('fireButton');
				if(reply.data.position !== "Owner" && reply.data.position !== "Senior Software Developer") {
					fireButton.show();
				} else {
					fireButton.hide();
				}
				this.docFormLoadFormData(reply);
			},
			scope:this,
			mask:this
		});
	},

	createEmployee: function() {
		let jsonData = this.docFormGetAllFieldValues();
		jsonData.permissions = JSON.stringify(jsonData.permissions);

		AERP.Ajax.request({
			url:'/Employee/createEmployee',
			jsonData:jsonData,
			success:function(reply) {
				this.readEmployee(reply.data);
				this.fireEvent('employeechanged');
			},
			scope:this,
			mask:this
		});
	},

	updateEmployee: function() {
		let jsonData = this.docFormGetAllFieldValues();
		jsonData.employeeId = this.employeeId;
		jsonData.permissions = JSON.stringify(jsonData.permissions);

		AERP.Ajax.request({
			url:'/Employee/updateEmployee',
			jsonData:jsonData,
			success:function(reply) {
				this.readEmployee(this.employeeId);
				this.fireEvent('employeechanged');
			},
			scope:this,
			mask:this
		});
	},

	deleteEmployee: function() {
		AERP.Ajax.request({
			url:'/Employee/deleteEmployee',
			jsonData:{employeeId:this.employeeId},
			success:function(reply) {
				this.employeeId = null;
				this.docFormReset();
				this.fireEvent('employeechanged');
			},
			scope:this,
			mask:this
		});
	},

	terminateEmployee: function() {
		this.audio = new Audio('/Employee/resources/firealarm.mp3');
		this.audio.play();

		Ext.Msg.confirm("Are you sure?", "Are you sure?", function(button) {
			this.audio.pause();
			if(button === "yes") {
				var msg = new SpeechSynthesisUtterance();
				msg.text = this.queryById("firstName").getValue() + " " + this.queryById("lastName").getValue() + " has been fired";
				window.speechSynthesis.speak(msg);



				AERP.Ajax.request({
					url:'/Employee/terminateEmployee',
					jsonData:{employeeId:this.employeeId},
					success:function(reply) {
						this.readEmployee(this.employeeId);
						this.fireEvent('employeechanged');
					},
					scope:this,
					mask:this
				});




			}
		}, this);
	}

});