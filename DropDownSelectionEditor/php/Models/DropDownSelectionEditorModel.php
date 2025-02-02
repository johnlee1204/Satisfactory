<?php

namespace DropDownSelectionEditor\Models;

use AgileModel;
use AgileUserMessageException;

class DropDownSelectionEditorModel extends AgileModel {

	static function readSelections($selectionKey) {
		return self::$database->fetch_all_assoc("
			SELECT
				dropDownSelectionId,
				selectionKey,
				selection,
				displayOrder
			FROM DropDownSelection
			WHERE
				selectionKey = ?
			ORDER BY -displayOrder DESC, selection
		", [$selectionKey]);
	}

	static function readSelectionsForCombo($selectionKey) {
		return self::$database->fetch_all_assoc("
			SELECT
				selection
			FROM DropDownSelection
			WHERE
				selectionKey = ?
			ORDER BY -displayOrder DESC, selection
		", [$selectionKey]);
	}

	static function readSelection($dropDownSelectionId) {
		return self::$database->fetch_assoc("
			SELECT
				dropDownSelectionId,
				selectionKey,
				selection,
				displayOrder
			FROM DropDownSelection
			WHERE
				dropDownSelectionId = ?
		", [$dropDownSelectionId]);
	}

	static function createSelection($inputs) {

		if($inputs['displayOrder'] !== NULL) {
			self::updateDisplayOrders($inputs['selectionKey'], $inputs['displayOrder']);
		}

		self::$database->query("
			INSERT INTO DropDownSelection(selectionKey, selection, displayOrder)
			VALUES(?, ?, ?)
		", [$inputs['selectionKey'], $inputs['selection'], $inputs['displayOrder']]);

		return self::$database->getInserted();
	}

	static function updateSelection($inputs) {

		if($inputs['displayOrder'] !== NULL) {
			self::updateDisplayOrders($inputs['selectionKey'], $inputs['displayOrder']);
		}

		self::$database->query("
			UPDATE DropDownSelection
			SET
				selection = ?,
				displayOrder = ?
			WHERE
				dropDownSelectionId = ?
		", [$inputs['selection'], $inputs['displayOrder'], $inputs['dropDownSelectionId']]);
	}

	static function deleteSelection($dropDownSelectionId) {
		self::$database->query("
			DELETE FROM DropDownSelection
			WHERE
				dropDownSelectionId = ?
		", [$dropDownSelectionId]);
	}

	static function updateDisplayOrders($selectionKey, $displayOrder) {
		$selections = self::$database->fetch_all_assoc("
			SELECT
				dropDownSelectionId
			FROM DropDownSelection
			WHERE
				selectionKey = ?
			AND
				displayOrder >= ?
		", [$selectionKey, $displayOrder]);

		$displayOrder++;
		foreach($selections as $selection) {
			self::$database->query("
				UPDATE DropDownSelection
				SET
					displayOrder = ?
				WHERE
					dropDownSelectionId = ?
			", [$displayOrder, $selection['dropDownSelectionId']]);
			$displayOrder++;
		}
	}
}