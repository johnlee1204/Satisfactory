/*
 * File: app/view/Facilities.js
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

Ext.define('AgileInventory.view.Facilities', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.facilities',

	requires: [
		'AgileInventory.view.FacilitiesViewModel',
		'AgileInventory.view.FacilityForm',
		'Ext.grid.Panel',
		'Ext.grid.column.Column',
		'Ext.view.Table'
	],

	viewModel: {
		type: 'facilities'
	},
	bodyStyle: 'background:none',
	title: 'Facilities',
	defaultListenerScope: true,

	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	items: [
		{
			xtype: 'gridpanel',
			flex: 1,
			bind: {
				store: '{FacilityStore}'
			},
			columns: [
				{
					xtype: 'gridcolumn',
					width: 137,
					dataIndex: 'facilityName',
					text: 'Name'
				},
				{
					xtype: 'gridcolumn',
					width: 187,
					dataIndex: 'facilityDescription',
					text: 'Description'
				},
				{
					xtype: 'gridcolumn',
					renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
						if(value.trim() === ", ,") {
							return "";
						}

						return value;
					},
					width: 372,
					dataIndex: 'address',
					text: 'Address'
				}
			],
			viewConfig: {
				enableTextSelection: true
			},
			listeners: {
				selectionchange: 'onGridpanelSelectionChange'
			}
		},
		{
			xtype: 'facilityform',
			itemId: 'facilityForm',
			listeners: {
				facilitychanged: 'onPanelFacilityChangeD'
			}
		}
	],
	listeners: {
		afterrender: 'onPanelAfterRender'
	},

	onGridpanelSelectionChange: function(model, selected, eOpts) {
		if(!selected || selected.length !== 1) {
			return;
		}

		selected = selected[0];

		this.queryById('facilityForm').readFacility(selected.data.facilityId);
	},

	onPanelAfterRender: function(component, eOpts) {
		this.readFacilities();
	},

	onPanelFacilityChangeD: function(panel) {
		this.readFacilities();
	},

	readFacilities: function() {
		AERP.Ajax.request({
			url:"/AgileInventory/readFacilities",
			success:function(reply) {
				this.getViewModel().getStore("FacilityStore").loadData(reply.data);
			},
			scope:this,
			mask:this
		});
	}

});