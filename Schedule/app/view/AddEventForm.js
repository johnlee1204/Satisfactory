/*
 * File: app/view/AddEventForm.js
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

Ext.define('Schedule.view.AddEventForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.addeventform',

	requires: [
		'Schedule.view.AddEventFormViewModel',
		'Ext.container.Container',
		'Ext.form.field.Tag',
		'Ext.form.field.Date',
		'Ext.form.field.Time',
		'Ext.form.field.Checkbox',
		'Ext.button.Button'
	],

	viewModel: {
		type: 'addeventform'
	},
	height: 385,
	width: 517,
	layout: 'vbox',
	bodyPadding: 10,
	bodyStyle: 'background:none',
	closeAction: 'hide',
	title: 'Add Shift',
	defaultListenerScope: true,

	items: [
		{
			xtype: 'container',
			margin: '0 0 5 0',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'tagfield',
					itemId: 'employee',
					width: 281,
					fieldLabel: 'Employee',
					displayField: 'name',
					forceSelection: false,
					queryMode: 'local',
					valueField: 'employeeId',
					bind: {
						store: '{EmployeeStore}'
					}
				},
				{
					xtype: 'combobox',
					itemId: 'type',
					margin: '0 0 0 5',
					width: 173,
					fieldLabel: 'Type',
					labelWidth: 40,
					displayField: 'display',
					forceSelection: true,
					queryMode: 'local',
					valueField: 'value',
					bind: {
						store: '{TypeStore}'
					},
					listeners: {
						select: 'onTypeSelect'
					}
				}
			]
		},
		{
			xtype: 'container',
			layout: 'hbox',
			items: [
				{
					xtype: 'datefield',
					itemId: 'startDate',
					width: 214,
					fieldLabel: 'Start Date',
					submitFormat: 'Y-m-d'
				},
				{
					xtype: 'timefield',
					itemId: 'startTime',
					margin: '0 0 0 15',
					width: 204,
					fieldLabel: 'Start Time',
					labelWidth: 70,
					submitFormat: 'H:i:s'
				}
			]
		},
		{
			xtype: 'container',
			margin: '5 0 0 0 ',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'datefield',
					itemId: 'endDate',
					width: 214,
					fieldLabel: 'End Date',
					submitFormat: 'Y-m-d'
				},
				{
					xtype: 'timefield',
					itemId: 'endTime',
					margin: '0 0 0 15',
					width: 204,
					fieldLabel: 'End Time',
					labelWidth: 60,
					submitFormat: 'H:i:s'
				}
			]
		},
		{
			xtype: 'container',
			margin: '5 0 0 0',
			layout: 'hbox',
			items: [
				{
					xtype: 'checkboxfield',
					itemId: 'allDay',
					margin: '0 0 0 103',
					boxLabel: 'All Day',
					inputValue: '1',
					uncheckedValue: '0',
					listeners: {
						change: 'onAllDayChange'
					}
				},
				{
					xtype: 'checkboxfield',
					itemId: 'private',
					margin: '0 0 0 103',
					boxLabel: 'Private',
					inputValue: '1',
					uncheckedValue: '0',
					listeners: {
						change: 'onAllDayChange1'
					}
				}
			]
		},
		{
			xtype: 'textfield',
			itemId: 'title',
			margin: '5 0 0 0',
			width: 433,
			fieldLabel: 'Title'
		},
		{
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'button',
					height: 49,
					margin: '30 0 0 100',
					width: 105,
					icon: '/inc/img/silk_icons/disk.png',
					text: 'Save',
					listeners: {
						click: 'onButtonClick'
					}
				},
				{
					xtype: 'button',
					height: 49,
					hidden: true,
					itemId: 'deleteButton',
					margin: '30 0 0 100',
					width: 105,
					icon: '/inc/img/silk_icons/delete.png',
					text: 'Delete',
					listeners: {
						click: 'onButtonClick1'
					}
				}
			]
		}
	],
	listeners: {
		afterrender: 'onWindowAfterRender',
		beforehide: 'onWindowBeforeHide'
	},

	onTypeSelect: function(combo, record, eOpts) {
		let title = this.queryById('title');
		title.reset();
		if(record.data.display === "Shift") {
			title.disable();
		} else {
			title.enable();
		}

		if(this.getTitle() !== "Edit") {
			this.setTitle("Add " + record.data.display);
		}
	},

	onAllDayChange: function(field, newValue, oldValue, eOpts) {
		let startTime = this.queryById('startTime');
		let endTime = this.queryById('endTime');
		if(newValue === true) {
			startTime.disable();
			endTime.disable();
		} else {
			startTime.enable();
			endTime.enable();
		}
	},

	onAllDayChange1: function(field, newValue, oldValue, eOpts) {
		let startTime = this.queryById('startTime');
		let endTime = this.queryById('endTime');
		if(newValue === true) {
			startTime.disable();
			endTime.disable();
		} else {
			startTime.enable();
			endTime.enable();
		}
	},

	onButtonClick: function(button, e, eOpts) {
		if(this.scheduleId) {
			AERP.Ajax.request({
				url:'/Schedule/updateShift',
				jsonData:{
					scheduleId:this.scheduleId,
					employeeId:this.queryById('employee').getValue(),
					startDate:this.queryById('startDate').getSubmitValue(),
					startTime:this.queryById('startTime').getSubmitValue(),
					endDate:this.queryById('endDate').getSubmitValue(),
					endTime:this.queryById('endTime').getSubmitValue(),
					type:this.queryById('type').getValue(),
					title:this.queryById('title').getValue(),
					allDay:this.queryById('allDay').getSubmitValue(),
					private:this.queryById('private').getSubmitValue()
				},
				success:function(reply) {
					this.resetFields();
					this.fireEvent('eventadded');
					this.close();
				},
				scope:this,
				mask:this
			});
		} else {
			AERP.Ajax.request({
				url:'/Schedule/createShift',
				jsonData:{
					employeeId:this.queryById('employee').getValue(),
					startDate:this.queryById('startDate').getSubmitValue(),
					startTime:this.queryById('startTime').getSubmitValue(),
					endDate:this.queryById('endDate').getSubmitValue(),
					endTime:this.queryById('endTime').getSubmitValue(),
					type:this.queryById('type').getValue(),
					title:this.queryById('title').getValue(),
					allDay:this.queryById('allDay').getSubmitValue(),
					private:this.queryById('private').getSubmitValue()
				},
				success:function(reply) {
					this.resetFields();
					this.fireEvent('eventadded');
					this.close();
				},
				scope:this,
				mask:this
			});
		}

	},

	onButtonClick1: function(button, e, eOpts) {
		AERP.Ajax.request({
			url:'/Schedule/deleteShift',
			jsonData:{
				scheduleId:this.scheduleId,
				employeeId:this.queryById('employee').getValue(),
				startDate:this.queryById('startDate').getSubmitValue(),
				startTime:this.queryById('startTime').getSubmitValue(),
				endDate:this.queryById('endDate').getSubmitValue(),
				endTime:this.queryById('endTime').getSubmitValue()
			},
			success:function(reply) {
				this.resetFields();
				this.fireEvent('eventadded');
				this.close();
			},
			scope:this,
			mask:this
		});
	},

	onWindowAfterRender: function(component, eOpts) {
		AERP.Ajax.request({
			url:'/Schedule/readAppInitData',
			success:function(reply) {
				this.getViewModel().getStore("EmployeeStore").loadData(reply.employees);
				if(this.employeeId) {
					this.queryById('employee').setValue(this.employeeId);
				}
			},
			scope:this,
			mask:this
		});
	},

	onWindowBeforeHide: function(component, eOpts) {
		this.resetFields();
	},

	setDates: function(data, type) {
		let startDate = data.startDate;
		let endDate = data.endDate;
		let title = this.queryById('title');
		title.reset();

		this.queryById('employee').enable();
		this.queryById('type').enable();

		if(data.calendarId) {
			this.queryById('type').setValue(data.calendarId);
			if(data.calendarId !== 1) {
				title.enable();
				title.setValue(data.title);
			} else {
				title.disable();
			}
		} else {
			this.queryById('type').setValue(1);
			title.disable();
		}

		if(type === "Update") {
			this.queryById('employee').setValue(data.employeeId);
			this.employeeId = data.employeeId;
			this.scheduleId = data.scheduleId;
			this.queryById('deleteButton').show();
			this.queryById('allDay').setValue(data.allDay);
			this.queryById('private').setValue(data.private);

			let startTime = new Date("Tue Jan 01 2008 " + (data.startDate.getHours() + "").padStart(2,"0") + ":" + (data.startDate.getMinutes() + "").padStart(2,"0") + ":00 GMT-0600");
			let endTime = new Date("Tue Jan 01 2008 " + (data.endDate.getHours() + "").padStart(2,"0") + ":" + (data.endDate.getMinutes() + "").padStart(2,"0") + ":00 GMT-0600");

			this.queryById('startTime').setValue(startTime);
			this.queryById('endTime').setValue(endTime);

		} else {
			this.queryById('deleteButton').hide();
			startDate.setDate(startDate.getDate() + 1);
		}

		this.queryById('startDate').setValue(startDate);
		this.queryById('endDate').setValue(endDate);

		if(data.isScheduleAdmin === false) {
			title.disable();
			this.setTitle("Request Time Off");
			this.queryById('type').setValue(4);
			this.queryById('type').disable();
			this.queryById('allDay').setValue(true);
			this.queryById('employee').setValue(data.employeeId);
			this.employeeId = data.employeeId;
			this.queryById('employee').disable();
			let startTime = new Date("Tue Jan 01 2008 00:00:00 GMT-0600");
			let endTime = new Date("Tue Jan 01 2008 23:59:59 GMT-0600");

			this.queryById('startTime').setValue(startTime);
			this.queryById('endTime').setValue(endTime);
		}
	},

	resetFields: function() {
		this.scheduleId = null;
		this.queryById('employee').reset();
		this.queryById('startDate').reset();
		this.queryById('startTime').reset();
		this.queryById('endDate').reset();
		this.queryById('endTime').reset();
		this.queryById('type').reset();
		this.queryById('title').reset();
		this.queryById('allDay').reset();
		this.queryById('private').reset();
	}

});