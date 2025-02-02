/*
 * File: app/view/Workcenter.js
 *
 * This file was generated by Sencha Architect
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.6.x Classic library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.6.x Classic. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Workcenter.view.Workcenter', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.workcenter',

	requires: [
		'Workcenter.view.WorkcenterViewModel',
		'Workcenter.view.WorkcenterForm',
		'Ext.grid.Panel',
		'Ext.grid.column.Column',
		'Ext.view.Table'
	],

	viewModel: {
		type: 'workcenter'
	},
	frame: true,
	minHeight: 500,
	minWidth: 500,
	title: 'Work Center',
	defaultListenerScope: true,

	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [
		{
			xtype: 'container',
			flex: 1,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'gridpanel',
					width: 473,
					bind: {
						store: '{WorkcenterStore}'
					},
					columns: [
						{
							xtype: 'gridcolumn',
							width: 119,
							dataIndex: 'workcenterName',
							text: 'Work Center'
						},
						{
							xtype: 'gridcolumn',
							width: 314,
							dataIndex: 'workcenterDescription',
							text: 'Work Center Description'
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
					xtype: 'workcenterform',
					itemId: 'workcenterForm',
					flex: 1,
					listeners: {
						workcenterchanged: 'onPanelWorkcenterChangeD'
					}
				}
			]
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

		this.queryById('workcenterForm').readWorkcenter(selected.data.workcenterId);
	},

	onPanelWorkcenterChangeD: function(panel) {
		this.readWorkcenters();
	},

	onPanelAfterRender: function(component, eOpts) {
		this.readWorkcenters();
	},

	readWorkcenters: function() {
		AERP.Ajax.request({
			url:'/Workcenter/readWorkcenters',
			success:function(reply) {
				this.getViewModel().getStore('WorkcenterStore').loadData(reply.data);
			},
			scope:this,
			mask:this
		});
	}

});