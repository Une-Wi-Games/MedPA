//=============================================================================
// LastSubjectActor.js
//=============================================================================

/*:
 * @plugindesc Stores the ID of the actor who acted lastly to a variable.
 * @author Yoji Ojima
 *
 * @param Variable ID
 * @desc The ID of the variable for storing the actor ID.
 * @default 0
 *
 * @help This plugin does not provide plugin commands.
 */

/*:ja
 * @plugindesc 最後に行動したアクターのIDを変数に格納します。
 * @author Yoji Ojima
 *
 * @param Variable ID
 * @desc アクターIDを格納する変数のIDです。
 * @default 0
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */
 
 /*:ru
 * @plugindesc Храним номер персонажа, который последним выполнил действие в битве.
 * @author Yoji Ojima
 *
 * @param Variable ID
 * @desc Номер переменной, куда будет сохранён номер (ID) персонажа, который выполнил действие.
 * @default 0
 *
 * @help Этот плагин не содержит никаких команд.
 */

(function() {

    var parameters = PluginManager.parameters('LastSubjectActor');
    var variableId = Number(parameters['Variable ID'] || 0);

    var _BattleManager_processTurn = BattleManager.processTurn;
    BattleManager.processTurn = function() {
        var subject = this._subject;
        if (subject.isActor()) {
            $gameVariables.setValue(variableId, subject.actorId());
        }
        _BattleManager_processTurn.call(this);
    };

})();
