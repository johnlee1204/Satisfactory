/*
 * File: app/view/BreedingForm.js
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

Ext.define('PetMaster.view.BreedingForm', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.breedingform',

	mixins: [
		'DocForm'
	],
	requires: [
		'PetMaster.view.BreedingFormViewModel',
		'Ext.toolbar.Toolbar',
		'Ext.form.field.TextArea'
	],

	viewModel: {
		type: 'breedingform'
	},
	bodyPadding: 10,
	bodyStyle: 'background:none',
	defaultListenerScope: true,

	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	dockedItems: [
		{
			xtype: 'toolbar',
			flex: 1,
			dock: 'top',
			itemId: 'breedingToolbar'
		}
	],
	items: [
		{
			xtype: 'textareafield',
			flex: 1,
			height: 219,
			itemId: 'notes',
			fieldLabel: 'Notes',
			labelAlign: 'right'
		}
	],
	listeners: {
		afterrender: 'onPanelAfterRender'
	},

	onPanelAfterRender: function(component, eOpts) {
		this.docFormInit({
			toolbarId:'breedingToolbar',
			saveFn:'updateBreedingPair'
		});
	},

	readBreedingPair: function(breedingId) {
		AERP.Ajax.request({
			url:"/PetMaster/readBreedingPair",
			jsonData:{breedingId:breedingId},
			success:function(reply) {
				this.breedingId = breedingId;
				this.docFormLoadFormData(reply);
			},
			scope:this,
			mask:this
		});
	},

	updateBreedingPair: function() {
		AERP.Ajax.request({
			url:"/PetMaster/updateBreedingPair",
			jsonData:{
				breedingId:this.breedingId,
				notes:this.queryById('notes').getValue()
			},
			success:function(reply) {
				this.readBreedingPair(this.breedingId);
			},
			scope:this,
			mask:this
		});
	}

});