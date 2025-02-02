/*
 * File: app/view/Bins.js
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

Ext.define('AgileInventory.view.Bins', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.bins',

	requires: [
		'AgileInventory.view.LocationsViewModel1',
		'AgileInventory.view.BinForm',
		'Ext.grid.Panel',
		'Ext.grid.column.Column',
		'Ext.view.Table'
	],

	viewModel: {
		type: 'bins'
	},
	bodyStyle: 'background:none',
	title: 'Bins',
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
				store: '{BinStore}'
			},
			columns: [
				{
					xtype: 'gridcolumn',
					dataIndex: 'location',
					text: 'Location'
				},
				{
					xtype: 'gridcolumn',
					dataIndex: 'binName',
					text: 'Bin'
				},
				{
					xtype: 'gridcolumn',
					width: 117,
					dataIndex: 'binDescription',
					text: 'Description'
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
			xtype: 'binform',
			itemId: 'binForm',
			listeners: {
				binchanged: 'onPanelBinChangeD'
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

		this.queryById('binForm').readBin(selected.data.binId);
	},

	onPanelBinChangeD: function(panel) {
		this.readBins();
	},

	onPanelAfterRender: function(component, eOpts) {
		this.readBins();
	},

	readBins: function() {
		AERP.Ajax.request({
			url:'/AgileInventory/readBins',
			success:function(reply) {
				this.getViewModel().getStore('BinStore').loadData(reply.data);
			},
			scope:this,
			mask:this
		});
	}

});