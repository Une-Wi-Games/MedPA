//=============================================================================
// BattlebackScroll.js
//=============================================================================

/*:
 * @plugindesc Automatically scrolls a 'battlebacks1' image.
 * @author Yoji Ojima
 *
 * @param Scroll X Variable ID
 * @desc The ID of the variable for the horizontal scroll speed.
 * @default 0
 *
 * @param Scroll Y Variable ID
 * @desc The ID of the variable for the vertical scroll speed.
 * @default 0
 *
 * @help This plugin does not provide plugin commands.
 */

/*:ja
 * @plugindesc 戦闘背景（battlebacks1）を自動的にスクロールします。
 * @author Yoji Ojima
 *
 * @param Scroll X Variable ID
 * @desc 横スクロール速度を指定するための変数のIDです。
 * @default 0
 *
 * @param Scroll Y Variable ID
 * @desc 縦スクロール速度を指定するための変数のIDです。
 * @default 0
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */
 
 /*:ru
 * @plugindesc Автоматическое движение нижнего фона в битве.
 * @author Yoji Ojima
 *
 * @param Scroll X Variable ID
 * @desc Номер переменной, в которой хранится значение скорости движеня по X координате.
 * @default 0
 *
 * @param Scroll Y Variable ID
 * @desc Номер переменной, в которой хранится значение скорости движеня по Y координате.
 * @default 0
 *
 * @help Этот плагин не содержит никаких команд.
 * Переменные задаются в событии через команду "Управляющие переменные".
 * Если параметры Scroll X Variable ID и Scroll Y Variable ID равны 0, то ничего двигаться не будет. 
 * Если значение скорости = 0, то тоже ничего двигаться не будет.
 * Нижний фон - это картинка в первом списке. (Отряды - Изменить BG...).
 */

(function() {

    var parameters = PluginManager.parameters('BattlebackScroll');
    var scrollXVariableId = Number(parameters['Scroll X Variable ID'] || 0);
    var scrollYVariableId = Number(parameters['Scroll Y Variable ID'] || 0);

    var _Spriteset_Battle_updateBattleback =
            Spriteset_Battle.prototype.updateBattleback;
    Spriteset_Battle.prototype.updateBattleback = function() {
        _Spriteset_Battle_updateBattleback.call(this);
        var scrollX = $gameVariables.value(scrollXVariableId);
        var scrollY = $gameVariables.value(scrollYVariableId);
        if (scrollX) {
            this._back1Sprite.origin.x += scrollX / 8;
        }
        if (scrollY) {
            this._back1Sprite.origin.y += scrollY / 8;
        }
    };

})();
