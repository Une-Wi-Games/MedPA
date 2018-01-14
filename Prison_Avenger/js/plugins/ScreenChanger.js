/*=============================================================================
 * ScreenChanger.js
 * Version: 1.1
 *=============================================================================*/

/*:
 * =============================================================================
 * @plugindesc v1.1 Изменение разрешения через скриптовый вызов в ивенте.
 * @author Dirge
 *
 * @param Screen Width
 * @desc Ширина по-умолчанию после первого запуска.
 * Default: 816
 * @default 816
 *
 * @param Screen Height
 * @desc Высота по-умолчанию после первого запуска.
 * Default: 624
 * @default 624
 *
 * @help
 * Вызов скрипта в ивентах для изменения разрешения:
 * sChange_Resolution(w, h);
 * Где w - ширина.
 * Где h - высота.
 * Так же могут пригодиться такие скриптовые команды:
 * SceneManager._screenWidth - текущая ширина игрового экрана
 * SceneManager._screenHeight - текущая высота игрового экрана
 * =============================================================================*/


var _Screen_Changer_Parameters = PluginManager.parameters('ScreenChanger');

/*=============================================================================
 * Config Manager
 *=============================================================================*/
ConfigManager.screenWidth    = Number(ConfigManager.screenWidth || _Screen_Changer_Parameters['Screen Width']);
ConfigManager.screenHeight   = Number(ConfigManager.screenHeight || _Screen_Changer_Parameters['Screen Height']);
ConfigManager.boxWidth       = Number(ConfigManager.boxWidth || _Screen_Changer_Parameters['Screen Width']);
ConfigManager.boxHeight      = Number(ConfigManager.boxHeight || _Screen_Changer_Parameters['Screen Height']);


/* Alias */
var _Screen_Changer_ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
	var config = _Screen_Changer_ConfigManager_makeData.call(this);
	config.screenWidth = this.screenWidth;
	config.screenHeight = this.screenHeight;
	config.boxWidth   = this.boxWidth;
	config.boxHeight  = this.boxHeight;
	return config;
};

/* Alias */
var _Screen_Changer_ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
	this.screenWidth = this.readValue(config, 'screenWidth');
	this.screenHeight = this.readValue(config, 'screenHeight');
	this.boxWidth = this.readValue(config, 'boxWidth');
	this.boxHeight = this.readValue(config, 'boxHeight');
	_Screen_Changer_ConfigManager_applyData.call(this, config);
};

/* NEW */	
ConfigManager.readValue = function(config, name) {
	var value = config[name];
        if (value !== undefined) {
          return Number(value);
        };
};

/* NEW */
sGameBoxResize = function() {
	var resizeWidth = SceneManager._screenWidth - window.innerWidth;
	var resizeHeight = SceneManager._screenHeight - window.innerHeight;
	window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);
	window.resizeBy(resizeWidth, resizeHeight);
};

/* Alias */	
_Screen_Changer_SceneManager_run = SceneManager.run;
SceneManager.run = function(sceneClass) {
	ConfigManager.load();
	SceneManager._screenWidth  = ConfigManager.screenWidth || Number(_Screen_Changer_Parameters['Screen Width']);
	SceneManager._screenHeight = ConfigManager.screenHeight || Number(_Screen_Changer_Parameters['Screen Height']);
	SceneManager._boxWidth     = ConfigManager.boxWidth || Number(_Screen_Changer_Parameters['Screen Width']);
	SceneManager._boxHeight    = ConfigManager.boxHeight || Number(_Screen_Changer_Parameters['Screen Height']); 	
	_Screen_Changer_SceneManager_run.call(this, sceneClass);
	sGameBoxResize();
};

var fullScreen_Resize_Switch = false
/* NEW */
sChange_Resolution = function(width, height){
	
	ConfigManager.screenWidth    = width;
	ConfigManager.screenHeight   = height;
	ConfigManager.boxWidth       = width;
	ConfigManager.boxHeight      = height;
	ConfigManager.save();
	
	SceneManager._screenWidth    = width;
        SceneManager._screenHeight   = height;
        SceneManager._boxWidth       = width;
        SceneManager._boxHeight      = height;

	Graphics.width               = width;
	Graphics.height              = height;

        Graphics.boxWidth            = width;
        Graphics.boxHeight           = height;
	
	if (!Graphics._isFullScreen()) {
	        fullScreen_Resize_Switch = true;
	} else {
		sGameBoxResize();
	};
	
    $gameMap._needsRefresh = true;
    SceneManager.goto(Scene_Map);
};

/* Alias */	
_Screen_Changer_Graphics_onWindowResize = Graphics._onWindowResize;
Graphics._onWindowResize = function() {
	_Screen_Changer_Graphics_onWindowResize.call(this);
	if (fullScreen_Resize_Switch) {
		sGameBoxResize();
		fullScreen_Resize_Switch = false;
	};
};