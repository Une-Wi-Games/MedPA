//=============================================================================
// LastUsedItem.js
//=============================================================================

/*:
 * @plugindesc Stores the ID of the skill or item which is used last.
 * @author Yoji Ojima
 *
 * @param Variable ID 1
 * @desc The ID of the variable for storing the skill or item ID.
 * @default 0
 *
 * @param Variable ID 2
 * @desc The ID of the variable for distinguishing between skills and items.
 *       Stored value 0: item, 1: skill
 * @default 0
 *
 * @help This plugin does not provide plugin commands.
 */

/*:ja
 * @plugindesc 最後に使用されたスキルかアイテムのIDを変数に格納します。
 * @author Yoji Ojima
 *
 * @param Variable ID 1
 * @desc スキルかアイテムのIDを格納する変数のIDです。
 * @default 0
 *
 * @param Variable ID 2
 * @desc スキルかアイテムの判別情報を格納する変数のIDです。
 *       代入された値 0: アイテム、1: スキル
 * @default 0
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */
 
 /*:ru
 * @plugindesc Храним номер навыка или предмета, который был использован последним в битве.
 * @author Yoji Ojima
 *
 * @param Variable ID 1
 * @desc Номер переменной, куда будет сохранён номер (ID) предмета или навыка.
 * @default 0
 *
 * @param Variable ID 2
 * @desc Номер переменной, куда будет сохранён тип действия.
 *       Если значение в переменной будет равно 0: предмет, 1: навык
 * @default 0
 *
 * @help Этот плагин не содержит никаких команд.
 */

(function() {

    var parameters = PluginManager.parameters('LastUsedItem');
    var variableId1 = Number(parameters['Variable ID 1'] || 0);
    var variableId2 = Number(parameters['Variable ID 2'] || 0);

    var _Game_Battler_useItem = Game_Battler.prototype.useItem;
    Game_Battler.prototype.useItem = function(item) {
        _Game_Battler_useItem.call(this, item);
        $gameVariables.setValue(variableId1, item.id);
        if (DataManager.isSkill(item)) {
            $gameVariables.setValue(variableId2, 1);
        } else {
            $gameVariables.setValue(variableId2, 0);
        }
    };

})();
