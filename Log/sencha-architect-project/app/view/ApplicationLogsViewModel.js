/*
 * File: app/view/ApplicationLogsViewModel.js
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

Ext.define('Log.view.ApplicationLogsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.applicationlogs',

    requires: [
        'Ext.data.Store',
        'Ext.data.field.Field'
    ],

    stores: {
        AppStore: {
            fields: [
                {
                    name: 'app'
                }
            ]
        },
        OperationStore: {
            data: [
                {
                    comparison: 'Greater Than (>)',
                    value: '>'
                },
                {
                    comparison: 'Less Than (<)',
                    value: '<'
                },
                {
                    comparison: 'Equal To (=)',
                    value: '='
                },
                {
                    comparison: 'Like (%%)',
                    value: 'like'
                },
                {
                    comparison: 'Not Equal To (≠)',
                    value: '<>'
                },
                {
                    comparison: 'Greater Than or Equal To (>=)',
                    value: '>='
                },
                {
                    comparison: 'Less Than or Equal To (<=)',
                    value: '<='
                }
            ],
            fields: [
                {
                    name: 'comparison'
                },
                {
                    name: 'value'
                }
            ]
        }
    }

});