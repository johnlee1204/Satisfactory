/*
 * File: app/view/AddEventFormViewModel.js
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

Ext.define('Schedule.view.AddEventFormViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.addeventform',

	requires: [
		'Ext.data.Store',
		'Ext.data.field.Field'
	],

	stores: {
		EmployeeStore: {
			fields: [
				{
					name: 'employeeId'
				},
				{
					name: 'name'
				}
			]
		},
		TypeStore: {
			data: [
				{
					value: 1,
					display: 'Shift'
				},
				{
					value: 2,
					display: 'Event'
				},
				{
					value: 3,
					display: 'Meeting'
				},
				{
					value: 4,
					display: 'Time Off'
				}
			],
			fields: [
				{
					name: 'value'
				},
				{
					name: 'display'
				}
			]
		}
	}

});