/*
 * File: app/view/Incubator.js
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

Ext.define('Incubator.view.Incubator', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.incubator',

	requires: [
		'Incubator.view.IncubatorViewModel',
		'Incubator.view.Eggs',
		'Incubator.view.EggForm',
		'Ext.panel.Panel'
	],

	viewModel: {
		type: 'incubator'
	},
	frame: true,
	minHeight: 500,
	minWidth: 500,
	title: 'Incubator',
	defaultListenerScope: true,

	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	items: [
		{
			xtype: 'eggs',
			itemId: 'eggGrid',
			resizable: true,
			width: 300,
			collapseDirection: 'left',
			collapsible: true,
			listeners: {
				eggselected: 'onPanelEggselected'
			}
		},
		{
			xtype: 'eggform',
			flex: 1,
			itemId: 'eggForm',
			listeners: {
				eggchanged: 'onPanelEggChangeD'
			}
		}
	],

	onPanelEggselected: function(eggId) {
		this.queryById('eggForm').readEgg(eggId);
	},

	onPanelEggChangeD: function(panel) {
		this.queryById('eggGrid').readEggs();
	}

});